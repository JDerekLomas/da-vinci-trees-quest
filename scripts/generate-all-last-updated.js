// This script fetches metadata about folders in an S3 bucket and their latest Git commit hashes,
// then saves this information to a JSON file named last-updated.json. Use this script to keep track of the last updated times and commit hashes for game data folders.
// Ensure you have the AWS SDK (as a dev dependancy) and necessary permissions to access the S3 bucket.
// last-updated.json will be used by the game to determine which data has been updated since the last deploy. Refer deploy.sh for more details.

import AWS from 'aws-sdk';
import { promises as fs } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Initialize S3 client
const s3 = new AWS.S3();

const bucketName = 'quests-core-app';
const prefix = '';

async function listS3Folders() {
    const folders = {};
    
    try {
        // List folders (prefixes) under the specified path
        const params = {
            Bucket: bucketName,
            Prefix: prefix,
            Delimiter: '/'
        };
        
        const result = await s3.listObjectsV2(params).promise();
        
        if (result.CommonPrefixes) {
            for (const commonPrefix of result.CommonPrefixes) {
                const folderPrefix = commonPrefix.Prefix;
                
                // List all objects within the folder
                const objectParams = {
                    Bucket: bucketName,
                    Prefix: folderPrefix
                };
                
                let createdAt = null;
                let updatedAt = null;
                
                // Handle pagination for objects within folder
                let continuationToken;
                do {
                    if (continuationToken) {
                        objectParams.ContinuationToken = continuationToken;
                    }
                    
                    const objectResult = await s3.listObjectsV2(objectParams).promise();
                    
                    if (objectResult.Contents) {
                        for (const obj of objectResult.Contents) {
                            const lastModified = obj.LastModified;
                            
                            if (createdAt === null || lastModified < createdAt) {
                                createdAt = lastModified;
                            }
                            if (updatedAt === null || lastModified > updatedAt) {
                                updatedAt = lastModified;
                            }
                        }
                    }
                    
                    continuationToken = objectResult.NextContinuationToken;
                } while (continuationToken);
                
                folders[folderPrefix] = {
                    createdAt: createdAt ? createdAt.toISOString() : null,
                    updatedAt: updatedAt ? updatedAt.toISOString() : null
                };
            }
        }
        
        return folders;
    } catch (error) {
        console.error('Error listing S3 folders:', error);
        throw error;
    }
}

async function getGitCommitHashes(folders) {
    const gameDataPath = './src/GAME_DATA';
    
    try {
        // Check if the directory exists
        await fs.access(gameDataPath);
        
        const items = await fs.readdir(gameDataPath);
        
        for (const folderName of items) {
            const folderPath = join(gameDataPath, folderName);
            
            try {
                const stats = await fs.stat(folderPath);
                if (stats.isDirectory()) {
                    // Get the latest commit hash for this folder
                    try {
                        const { stdout } = await execAsync(
                            `git log --oneline -1 -- "${folderPath}"`,
                            { cwd: '.' }
                        );
                        
                        const commitLine = stdout.trim();
                        const commitHash = commitLine ? commitLine.split(' ')[0] : null;
                        const s3FolderKey = `${folderName}/`;
                        
                        if (folders[s3FolderKey]) {
                            folders[s3FolderKey].latestCommitHash = commitHash;
                        } else {
                            folders[s3FolderKey] = {
                                createdAt: null,
                                updatedAt: null,
                                latestCommitHash: commitHash
                            };
                        }
                    } catch (gitError) {
                        console.error(`Error getting commit hash for ${folderName}:`, gitError.message);
                        const s3FolderKey = `${folderName}/`;
                        if (folders[s3FolderKey]) {
                            folders[s3FolderKey].latestCommitHash = null;
                        } else {
                            folders[s3FolderKey] = {
                                createdAt: null,
                                updatedAt: null,
                                latestCommitHash: null
                            };
                        }
                    }
                }
            } catch (statError) {
                console.error(`Error checking ${folderName}:`, statError.message);
            }
        }
    } catch (error) {
        console.log('GAME_DATA directory not found or not accessible');
    }
    
    return folders;
}

async function main() {
    try {
        console.log('Fetching S3 folder metadata...');
        let folders = await listS3Folders();
        
        console.log('Getting Git commit hashes...');
        folders = await getGitCommitHashes(folders);
        
        // Remove trailing "/" from all keys
        const cleanedFolders = {};
        for (const [key, value] of Object.entries(folders)) {
            const cleanKey = key.replace(/\/$/, '');
            cleanedFolders[cleanKey] = value;
        }
        
        // Save the folders metadata to a JSON file
        await fs.writeFile('last-updated.json', JSON.stringify(cleanedFolders, null, 4));
        
        console.log('Metadata saved to last-updated.json');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Run the script
main();