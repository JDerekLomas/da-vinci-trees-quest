import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', 'dist', 'last-updated.json');
const key = process.argv[2];
if (!key) {
    console.error('❌ Please provide a key name as argument.');
    process.exit(1);
}
const normalizedKey = key.endsWith('-stage') ? key.replace(/-stage$/, '') : key;
const gameDataFolder = path.join(__dirname, '..', 'src', 'GAME_DATA', normalizedKey);
if (!fs.existsSync(gameDataFolder)) {
    console.error(`❌ Folder does not exist: ${gameDataFolder}`);
    process.exit(1);
}
let latestCommitHash = '';
try {
    latestCommitHash = execSync(`git log -n 1 --pretty=format:%H -- "${gameDataFolder}"`, {
        cwd: path.join(__dirname, '..'),
        encoding: 'utf-8',
    }).trim();
}
catch (err) {
    const error = err;
    console.warn('⚠️ Failed to get latest commit hash:', error.message);
}
let data = {};
try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(fileContent);
}
catch (err) {
    console.warn('⚠️ Failed to read or parse JSON. Starting with empty object.');
}
const currentTimestamp = new Date().toISOString();
if (!data[key]) {
    data[key] = {
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
        latestCommitHash: latestCommitHash,
    };
}
else {
    data[key].updatedAt = currentTimestamp;
    data[key].latestCommitHash = latestCommitHash;
}
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`✅ Updated key "${key}" with timestamp ${currentTimestamp} and commit ${latestCommitHash}`);
