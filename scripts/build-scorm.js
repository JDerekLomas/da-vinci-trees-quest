import archiver from 'archiver';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { sync } from 'glob';
import path from 'path';
import scormConfig from './scorm.json' assert { type: 'json' };
const SCORM_DIR = 'scorm';
const SCORM_BUILD_DIR = 'scorm_build';
const DIST_DIR = 'dist';
const TEMP_SCORM_DIR = 'temp';
const GAMES = [
    'breakeven',
    'virus',
    'playground',
    'pricing-dilemma',
    'skytrack-internship',
    'critical-point',
    'baseball-game-plan',
    'kelp-forest-defenders',
    'lunar-probe-precision',
    'get-in-the-zone',
    'atacama',
    'game-geometry',
    'wind-wise',
    'engineering-the-perfect-beat',
    'ancient-alexandria',
    'euclid-path',
    'circles-engineering-the-depth',
    'inbox-under-siege',
    'data-analysis',
    'journey-through-waves',
    'optical-illusions',
    'falling-into-orbit',
    'shaping-sound',
    'lost-hiker',
    'musical-scale',
    'forest-architect',
    'coordinate-geometry',
    'similar-triangles',
    'exponential-model',
    'calculated-rescue',
    'al-khwarizmi',
    'fractals',
    'polynomial-pirates',
    'mathematical-architecture',
    'pythagoras-quest',
];
const GAME_CONFIGS = scormConfig;
const GET_DIST_DIR = (gameId) => path.join(DIST_DIR, gameId);
const GET_SCORM_DIR = (gameId) => path.join(GET_DIST_DIR(gameId), SCORM_BUILD_DIR);
function createManifest(gameId) {
    const templatePath = path.join('scripts', 'imsmanifest.template.xml');
    let manifestContent = fs.readFileSync(templatePath, 'utf-8');
    const config = GAME_CONFIGS[gameId];
    manifestContent = manifestContent
        .replace(/{{IDENTIFIER}}/g, config.identifier)
        .replace(/{{TITLE}}/g, config.title)
        .replace(/{{DESCRIPTION}}/g, config.description)
        .replace(/{{GAME_IDENTIFIER}}/g, gameId);
    return manifestContent;
}
function updateManifest(manifestPath, gameId) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const parser = new XMLParser({
        ignoreAttributes: false,
        preserveOrder: true,
    });
    const manifest = parser.parse(manifestContent);
    const files = sync('**/*', {
        cwd: GET_DIST_DIR(gameId),
        nodir: true,
    });
    const resourceElement = manifest[1].manifest[2].resources[0].resource;
    if (resourceElement) {
        resourceElement.push(...files.map((file) => ({
            file: [],
            ':@': {
                '@_href': file,
            },
        })));
    }
    const builder = new XMLBuilder({
        format: true,
        preserveOrder: true,
        ignoreAttributes: false,
    });
    const updatedManifest = builder.build(manifest);
    fs.writeFileSync(manifestPath, updatedManifest);
}
function createScormPackage(gameId) {
    if (!fs.existsSync(TEMP_SCORM_DIR)) {
        fs.mkdirSync(TEMP_SCORM_DIR);
    }
    console.log(`Copying dist to temp scorm directory...`, GET_DIST_DIR(gameId), TEMP_SCORM_DIR);
    fs.cpSync(GET_DIST_DIR(gameId), TEMP_SCORM_DIR, { recursive: true });
    if (!fs.existsSync(GET_SCORM_DIR(gameId))) {
        fs.mkdirSync(GET_SCORM_DIR(gameId));
    }
    console.log(`Copying temp scorm directory to scorm build directory...`, TEMP_SCORM_DIR, GET_SCORM_DIR(gameId));
    fs.cpSync(TEMP_SCORM_DIR, GET_SCORM_DIR(gameId), { recursive: true });
    console.log(`Removing temp scorm directory...`, TEMP_SCORM_DIR);
    fs.rmSync(TEMP_SCORM_DIR, { recursive: true, force: true });
    console.log(`Copying scormxsd to scorm build directory...`);
    fs.cpSync(path.join('scripts', 'scormxsd'), path.join(GET_SCORM_DIR(gameId), 'scormxsd'), { recursive: true });
    const manifestContent = createManifest(gameId);
    const manifestPath = path.join(GET_SCORM_DIR(gameId), 'imsmanifest.xml');
    fs.writeFileSync(manifestPath, manifestContent);
    updateManifest(manifestPath, gameId);
    if (!fs.existsSync(path.join(GET_DIST_DIR(gameId), SCORM_DIR))) {
        fs.mkdirSync(path.join(GET_DIST_DIR(gameId), SCORM_DIR));
    }
    else {
        fs.readdirSync(path.join(GET_DIST_DIR(gameId), SCORM_DIR)).forEach((file) => {
            fs.rmSync(path.join(GET_DIST_DIR(gameId), SCORM_DIR, file), { force: true });
        });
    }
    const output = fs.createWriteStream(path.join(GET_DIST_DIR(gameId), SCORM_DIR, 'package.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => {
        console.log(`${gameId}.zip has been created successfully`);
        fs.rmSync(GET_SCORM_DIR(gameId), { recursive: true, force: true });
    });
    archive.on('error', (err) => {
        console.error(`Error creating ${gameId}.zip:`, err);
        throw err;
    });
    archive.pipe(output);
    archive.directory(GET_SCORM_DIR(gameId), false);
    archive.finalize();
}
function validateGameId(gameId) {
    return GAMES.includes(gameId);
}
const gameId = process.argv[2];
if (gameId === 'launcher') {
    console.log('Skipping scorm build for launcher');
    process.exit(0);
}
if (gameId) {
    if (validateGameId(gameId)) {
        createScormPackage(gameId);
    }
    else {
        console.error(`Invalid game ID: ${gameId}. Valid games are: ${GAMES.join(', ')}`);
        process.exit(1);
    }
}
else {
    GAMES.forEach(createScormPackage);
}
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
    process.exit(1);
});
