import fs from 'fs';
import path from 'path';
import Readline from 'readline';
import ElevenLabsAudio from './elevenlabs-api.js';

// Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '<your-elevenlabs-api-key>';
const VITE_GAME_ID = process.argv[2];

if (!VITE_GAME_ID) {
  console.error('[ERROR] : No VITE_GAME_ID provided. Usage: npx ts-node scripts/generate-audio-elevenlabs.ts <game-id>');
  process.exit(1);
}

// ElevenLabs voice mapping for quests
// You can get voice IDs from: https://api.elevenlabs.io/v1/voices
const voiceMapping: Record<string, Record<string, string>> = {
  'matrix-multiplication': {
    alex: 'TX3LPaxmHKxFdv7VOQHJ', // Liam - Energetic, Social Media Creator (young, enthusiastic)
    dr_chen: 'Xb7hH8MSUJpSbSDYk0k2', // Alice - Clear, Engaging Educator (professional mentor)
    narrator: 'Xb7hH8MSUJpSbSDYk0k2', // Alice voice for narration
  },
  'da-vinci-trees': {
    maya: 'pFZP5JQG7iQjIQuC4Bku', // Lily - Velvety Actress (young forestry intern)
    dr_reyes: 'Xb7hH8MSUJpSbSDYk0k2', // Alice - Clear, Engaging Educator (forest ecologist)
    char1: 'pFZP5JQG7iQjIQuC4Bku', // Maya
    char2: 'Xb7hH8MSUJpSbSDYk0k2', // Dr. Reyes
    narrator: 'Xb7hH8MSUJpSbSDYk0k2', // Alice voice for narration
  },
};

// HTML tag removal
const blockElements = [
  'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol',
  'blockquote', 'pre', 'table', 'tr', 'td', 'th', 'br',
];

const removeHtmlTags = (text: string): string => {
  const blockRegex = new RegExp(`</?(${blockElements.join('|')})[^>]*>`, 'gi');
  return text
    .replace(blockRegex, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

// Extract dialog entries from locale file
interface DialogEntry {
  sceneKey: string;
  dialogKey: string;
  character: string;
  text: string;
  outputFileName: string;
}

const extractDialogs = (localeData: any, gameId: string, lang: string): DialogEntry[] => {
  const dialogs: DialogEntry[] = [];
  const scenes = localeData.scenes || {};

  let sceneIndex = 0;
  for (const sceneKey of Object.keys(scenes)) {
    if (sceneKey === 'common' || sceneKey === 'glossary') continue;

    const scene = scenes[sceneKey];
    let dialogIndex = 0;

    for (const dialogKey of Object.keys(scene)) {
      const value = scene[dialogKey];

      // Skip nested objects (like calculator.heading, visualizer.heading)
      if (typeof value === 'object') continue;

      // Determine character from dialog key
      let character = 'narrator';
      if (dialogKey.includes('alex')) {
        character = 'alex';
      } else if (dialogKey.includes('chen')) {
        character = 'dr_chen';
      } else if (dialogKey.includes('mei')) {
        character = 'mei';
      } else if (dialogKey.includes('aunt_lily') || dialogKey.includes('lily')) {
        character = 'aunt_lily';
      }

      const cleanText = removeHtmlTags(value);
      if (cleanText.length > 0 && cleanText.length < 5000) {
        dialogs.push({
          sceneKey,
          dialogKey,
          character,
          text: cleanText,
          outputFileName: `${gameId}_scene_${sceneIndex}_${dialogIndex}_${lang}.mp3`,
        });
        dialogIndex++;
      }
    }
    sceneIndex++;
  }

  return dialogs;
};

const generateAudio = async (
  elevenlabs: ElevenLabsAudio,
  text: string,
  voiceId: string,
  outputPath: string
): Promise<void> => {
  try {
    const response = await elevenlabs.requestAudioTask(text, voiceId);
    const audioBuffer = elevenlabs.getAudioBuffer(response);

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write audio buffer to file
    fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
    console.log(`[INFO] : Generated: ${outputPath}`);
  } catch (error) {
    console.error(`[ERROR] : Failed to generate audio: ${(error as Error).message}`);
    throw error;
  }
};

const main = async () => {
  if (ELEVENLABS_API_KEY === '<your-elevenlabs-api-key>') {
    console.error('[ERROR] : Please set ELEVENLABS_API_KEY environment variable');
    console.log('Usage: ELEVENLABS_API_KEY=your-key npx ts-node scripts/generate-audio-elevenlabs.ts matrix-multiplication');
    process.exit(1);
  }

  const voices = voiceMapping[VITE_GAME_ID];
  if (!voices) {
    console.error(`[ERROR] : No voice mapping found for game: ${VITE_GAME_ID}`);
    console.log('Available games:', Object.keys(voiceMapping).join(', '));
    process.exit(1);
  }

  const elevenlabs = new ElevenLabsAudio(ELEVENLABS_API_KEY);

  // Read locale file
  const localePath = path.join('src', 'GAME_DATA', VITE_GAME_ID, 'locales', 'en.json');
  const outputDir = path.join('src', 'GAME_DATA', VITE_GAME_ID, 'assets', 'audio');

  if (!fs.existsSync(localePath)) {
    console.error(`[ERROR] : Locale file not found: ${localePath}`);
    process.exit(1);
  }

  const localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
  const dialogs = extractDialogs(localeData, VITE_GAME_ID, 'en');

  console.log(`[INFO] : Found ${dialogs.length} dialogs to generate`);
  console.log(`[INFO] : Output directory: ${outputDir}`);

  // Ask for confirmation
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const confirm = await new Promise<string>((resolve) => {
    readline.question('Continue with audio generation? (y/n): ', resolve);
  });
  readline.close();

  if (confirm.toLowerCase() !== 'y') {
    console.log('[INFO] : Aborted');
    process.exit(0);
  }

  // Generate audio files
  const results: { success: string[]; failed: string[] } = { success: [], failed: [] };

  for (const dialog of dialogs) {
    const voiceId = voices[dialog.character] || voices['narrator'];
    const outputPath = path.join(outputDir, dialog.outputFileName);

    console.log(`[INFO] : Processing ${dialog.sceneKey}.${dialog.dialogKey} (${dialog.character})...`);

    try {
      await generateAudio(elevenlabs, dialog.text, voiceId, outputPath);
      results.success.push(dialog.outputFileName);

      // Rate limiting - ElevenLabs has limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      results.failed.push(dialog.outputFileName);
    }
  }

  console.log('\n[SUMMARY]');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed files:');
    results.failed.forEach((f) => console.log(`  - ${f}`));
  }

  // Output audioUrl mapping for sceneData.ts
  console.log('\n[INFO] : Add these audioUrl properties to your sceneData.ts:');
  dialogs.forEach((d) => {
    console.log(`// ${d.sceneKey}.${d.dialogKey}`);
    console.log(`audioUrl: '/assets/audio/${d.outputFileName}',`);
  });
};

main().catch(console.error);
