import path from 'path';
import fs from 'fs';

export const VITE_GAME_ID = process.argv[2];

if (!VITE_GAME_ID) {
  console.error('[ERROR] : No VITE_GAME_ID provided.');
  process.exit(1);
}

interface CharacterVoice {
  id: string;
  name: string;
}
interface CharacterVoices {
  [key: string]: { [key: string]: CharacterVoice };
}
interface AudioConfig {
  [key: string]: CharacterVoices;
}

const audioConfig: AudioConfig = JSON.parse(fs.readFileSync('scripts/audio-config.json', 'utf8'));

export const voices: CharacterVoices = audioConfig[VITE_GAME_ID];

export const VOICE_AI_API_KEY = '<voice_ai_api_key>';
export const NARAKEET_API_KEY = '<narakeet_api_key>';

export const inputPath = path.join('src', 'GAME_DATA', VITE_GAME_ID, 'locales');
export const outputPath = path.join('src', 'GAME_DATA', VITE_GAME_ID, 'assets', 'audio');

export const blockElements = [
  'address',
  'article',
  'aside',
  'blockquote',
  'details',
  'dialog',
  'div',
  'dl',
  'dt',
  'dd',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
];
