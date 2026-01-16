import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import Readline from 'readline';

import { AudioService, NarakeetAudioTaskResponse, VoiceAiAudioTaskResponse } from './audio-service';
import VoiceAiAudio from './voice-ai-api.js';
import NarakeetAudio from './narakeet-api.js';
import {
  voices,
  inputPath,
  outputPath,
  blockElements,
  VITE_GAME_ID,
  NARAKEET_API_KEY,
  VOICE_AI_API_KEY,
} from './audio-constants.js';

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => readline.question(query, resolve));
};

const dialogKeysInput = await askQuestion('Enter DIALOG_KEYS (comma-separated, or leave empty for all): ');
const dialogKeys = dialogKeysInput ? dialogKeysInput.split(',').map((val) => val.trim()) : null;
readline.close();

const voiceAiAudio = new VoiceAiAudio(VOICE_AI_API_KEY);
const narakeetAudio = new NarakeetAudio(NARAKEET_API_KEY);

if (!voices) {
  console.error(`[ERROR] : No voices found for VITE_GAME_ID ${VITE_GAME_ID}`);
  process.exit(1);
}

const removeHtmlTags = (text: string): string => {
  const blockRegex = new RegExp(`</?(${blockElements.join('|')})[^>]*>`, 'gi');
  const cleanedText = text
    .replace(blockRegex, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
  return cleanedText;
};

const downloadAudio = async (downloadUrl: string, outputPath: string) => {
  try {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download file. Status code: ${response.status}`);
    }

    const fileStream = fs.createWriteStream(outputPath);
    if (response.body) {
      await pipeline(response.body, fileStream);
    } else {
      throw new Error('Response body is null');
    }
  } catch (error: unknown) {
    console.error('[ERROR] : Failed to download:', (error as Error).message);
    fs.unlink(outputPath, () => console.log(`[INFO] : Cleaned up file at ${outputPath}`));
    throw error;
  }
};

const processTextAudio = async (
  text: string,
  outputPath: string,
  voice: string,
  service: AudioService,
): Promise<void> => {
  try {
    // Request audio task
    const response: VoiceAiAudioTaskResponse | NarakeetAudioTaskResponse = await service.requestAudioTask(
      text,
      voice,
    );
    // Poll until the audio task is finished
    const downloadLink = await service.checkAudioStatus(response);
    // Download the audio file
    await downloadAudio(downloadLink, outputPath);
    console.log(`[INFO] : Download completed: ${outputPath}`);
  } catch (error: unknown) {
    console.error('[ERROR] : Failed to process audio');
    throw error;
  }
};

const processDialogs = async (lang: 'en' | 'es') => {
  try {
    const filePath = path.join(inputPath, `${lang}.json`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const failedDialogs: {
      sceneKey: string;
      dialogKey: string;
      error: string;
    }[] = [];

    const tasks = Object.keys(data.scenes).map(async (sceneKey) => {
      const scene = data.scenes[sceneKey];
      for (const dialogKey in scene) {
        // Skip if dialog keys are provided and current dialog is not in the list
        if (dialogKeys && !dialogKeys.includes(dialogKey)) {
          continue;
        }

        const character = dialogKey.split('_')[3]; // Extract character (e.g., C1, C2)
        if (!voices[character]) {
          console.error(`[ERROR] : Missing voice mapping for dialog ${sceneKey}_${dialogKey}.`);
          continue;
        }

        const dialog = scene[dialogKey];
        const text = removeHtmlTags(dialog);
        const voice = voices[character][lang].id;

        const outputFilePath = path.join(outputPath, `${VITE_GAME_ID}_${dialogKey}_${lang}.mp3`);
        const dir = path.dirname(outputFilePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`[INFO] : Directory created: ${dir}`);
        }

        try {
          console.log(`[INFO] : Processing dialog ${sceneKey}_${dialogKey}...`);
          if (lang === 'en') await processTextAudio(text, outputFilePath, voice, voiceAiAudio);
          else if (lang === 'es') await processTextAudio(text, outputFilePath, voice, narakeetAudio);
          else throw new Error('Invalid language specified');
        } catch (error: unknown) {
          console.error(`[ERROR] : Failed to process dialog ${sceneKey}_${dialogKey}`);
          failedDialogs.push({
            sceneKey,
            dialogKey,
            error: (error as Error).message,
          });
        }
      }
    });

    await Promise.all(tasks);

    if (failedDialogs.length > 0) {
      console.log(`[INFO] : Following ${lang} dialogs failed to process:`);
      console.table(failedDialogs);
    } else {
      console.log(`[INFO] : All ${lang} dialogs processed successfully.`);
    }
  } catch (error: unknown) {
    console.error('[ERROR] : failed reading or processing JSON file:', error);
  }
};

processDialogs('en');
processDialogs('es');
