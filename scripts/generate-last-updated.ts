// This script updates the last-updated.json file with the latest commit hash and timestamps for a given game data key.
// It checks if the key exists, retrieves the latest commit hash from Git, and updates the JSON file accordingly.
// This script runs automatically during the deploy process to ensure the game data timestamps are always up-to-date.
// Refer generate-all-last-updated.ts to generate the last-updated.json file for all game data keys manually.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Type definitions
interface GameDataEntry {
  createdAt: string;
  updatedAt: string;
  latestCommitHash: string;
}

interface LastUpdatedData {
  [key: string]: GameDataEntry;
}

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const filePath: string = path.join(__dirname, '..', 'dist', 'last-updated.json');

const key: string | undefined = process.argv[2];

if (!key) {
  console.error('❌ Please provide a key name as argument.');
  process.exit(1);
}

const normalizedKey: string = key.endsWith('-stage') ? key.replace(/-stage$/, '') : key;
const gameDataFolder: string = path.join(__dirname, '..', 'src', 'GAME_DATA', normalizedKey);

if (!fs.existsSync(gameDataFolder)) {
  console.error(`❌ Folder does not exist: ${gameDataFolder}`);
  process.exit(1);
}

let latestCommitHash: string = '';

try {
  latestCommitHash = execSync(`git log -n 1 --pretty=format:%H -- "${gameDataFolder}"`, {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf-8',
  }).trim();
} catch (err: unknown) {
  const error = err as Error;
  console.warn('⚠️ Failed to get latest commit hash:', error.message);
}

let data: LastUpdatedData = {};

try {
  const fileContent: string = fs.readFileSync(filePath, 'utf-8');
  data = JSON.parse(fileContent) as LastUpdatedData;
} catch (err: unknown) {
  console.warn('⚠️ Failed to read or parse JSON. Starting with empty object.');
}

const currentTimestamp: string = new Date().toISOString();

if (!data[key]) {
  data[key] = {
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    latestCommitHash: latestCommitHash,
  };
} else {
  data[key].updatedAt = currentTimestamp;
  data[key].latestCommitHash = latestCommitHash;
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log(`✅ Updated key "${key}" with timestamp ${currentTimestamp} and commit ${latestCommitHash}`);
