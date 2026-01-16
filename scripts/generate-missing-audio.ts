import fs from 'fs';
import path from 'path';
import ElevenLabsAudio from './elevenlabs-api.js';

// Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
const GAME_ID = 'da-vinci-trees';

// Voice IDs
const VOICES = {
  maya: 'pFZP5JQG7iQjIQuC4Bku', // Lily - Velvety Actress (C1)
  reyes: 'Xb7hH8MSUJpSbSDYk0k2', // Alice - Clear, Engaging Educator (C2)
};

// HTML tag removal
const removeHtmlTags = (text: string): string => {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

// Define the new dialog entries that need audio
// Format: { section, key, character (C1=Maya, C2=Reyes), text }
interface DialogEntry {
  section: string;
  key: string;
  character: 'C1' | 'C2';
  text: string;
}

const getNewDialogEntries = (localeData: any): DialogEntry[] => {
  const entries: DialogEntry[] = [];

  // Cross-section dialog (Scene 8b)
  // Dr. Reyes: d1, d3, d4, d6, d8; Maya: d2, d5, d7
  const crossSection = localeData.scenes?.cross_section || {};
  if (crossSection.d1) entries.push({ section: 'cross_section', key: 'd1', character: 'C2', text: crossSection.d1 });
  if (crossSection.d2) entries.push({ section: 'cross_section', key: 'd2', character: 'C1', text: crossSection.d2 });
  if (crossSection.d3) entries.push({ section: 'cross_section', key: 'd3', character: 'C2', text: crossSection.d3 });
  if (crossSection.d4) entries.push({ section: 'cross_section', key: 'd4', character: 'C2', text: crossSection.d4 });
  if (crossSection.d5) entries.push({ section: 'cross_section', key: 'd5', character: 'C1', text: crossSection.d5 });
  if (crossSection.d6) entries.push({ section: 'cross_section', key: 'd6', character: 'C2', text: crossSection.d6 });
  if (crossSection.d7) entries.push({ section: 'cross_section', key: 'd7', character: 'C1', text: crossSection.d7 });
  if (crossSection.d8) entries.push({ section: 'cross_section', key: 'd8', character: 'C2', text: crossSection.d8 });

  // Conifer tree dialog (Scene 17)
  // Dr. Reyes: d1, d3, d5, d7, d8; Maya: d2, d4, d6
  const coniferTree = localeData.scenes?.conifer_tree || {};
  if (coniferTree.d1) entries.push({ section: 'conifer_tree', key: 'd1', character: 'C2', text: coniferTree.d1 });
  if (coniferTree.d2) entries.push({ section: 'conifer_tree', key: 'd2', character: 'C1', text: coniferTree.d2 });
  if (coniferTree.d3) entries.push({ section: 'conifer_tree', key: 'd3', character: 'C2', text: coniferTree.d3 });
  if (coniferTree.d4) entries.push({ section: 'conifer_tree', key: 'd4', character: 'C1', text: coniferTree.d4 });
  if (coniferTree.d5) entries.push({ section: 'conifer_tree', key: 'd5', character: 'C2', text: coniferTree.d5 });
  if (coniferTree.d6) entries.push({ section: 'conifer_tree', key: 'd6', character: 'C1', text: coniferTree.d6 });
  if (coniferTree.d7) entries.push({ section: 'conifer_tree', key: 'd7', character: 'C2', text: coniferTree.d7 });
  if (coniferTree.d8) entries.push({ section: 'conifer_tree', key: 'd8', character: 'C2', text: coniferTree.d8 });

  // Form factor dialog (Scene 20b)
  // Dr. Reyes: d1, d3, d4, d6, d8; Maya: d2, d5, d7
  const formFactor = localeData.scenes?.form_factor || {};
  if (formFactor.d1) entries.push({ section: 'form_factor', key: 'd1', character: 'C2', text: formFactor.d1 });
  if (formFactor.d2) entries.push({ section: 'form_factor', key: 'd2', character: 'C1', text: formFactor.d2 });
  if (formFactor.d3) entries.push({ section: 'form_factor', key: 'd3', character: 'C2', text: formFactor.d3 });
  if (formFactor.d4) entries.push({ section: 'form_factor', key: 'd4', character: 'C2', text: formFactor.d4 });
  if (formFactor.d5) entries.push({ section: 'form_factor', key: 'd5', character: 'C1', text: formFactor.d5 });
  if (formFactor.d6) entries.push({ section: 'form_factor', key: 'd6', character: 'C2', text: formFactor.d6 });
  if (formFactor.d7) entries.push({ section: 'form_factor', key: 'd7', character: 'C1', text: formFactor.d7 });
  if (formFactor.d8) entries.push({ section: 'form_factor', key: 'd8', character: 'C2', text: formFactor.d8 });

  // Volume comparison dialog (Scene 21)
  // Dr. Reyes: d1, d3, d5, d7, d8; Maya: d2, d4, d6
  const volumeComparison = localeData.scenes?.volume_comparison || {};
  if (volumeComparison.d1) entries.push({ section: 'volume_comparison', key: 'd1', character: 'C2', text: volumeComparison.d1 });
  if (volumeComparison.d2) entries.push({ section: 'volume_comparison', key: 'd2', character: 'C1', text: volumeComparison.d2 });
  if (volumeComparison.d3) entries.push({ section: 'volume_comparison', key: 'd3', character: 'C2', text: volumeComparison.d3 });
  if (volumeComparison.d4) entries.push({ section: 'volume_comparison', key: 'd4', character: 'C1', text: volumeComparison.d4 });
  if (volumeComparison.d5) entries.push({ section: 'volume_comparison', key: 'd5', character: 'C2', text: volumeComparison.d5 });
  if (volumeComparison.d6) entries.push({ section: 'volume_comparison', key: 'd6', character: 'C1', text: volumeComparison.d6 });
  if (volumeComparison.d7) entries.push({ section: 'volume_comparison', key: 'd7', character: 'C2', text: volumeComparison.d7 });
  if (volumeComparison.d8) entries.push({ section: 'volume_comparison', key: 'd8', character: 'C2', text: volumeComparison.d8 });

  // Act6 expanded dialog (Scene 26)
  // Maya: d80, d82_new, d84_new, d86_new; Dr. Reyes: d81, d83_new, d85_new, d87_new
  const act6 = localeData.scenes?.act6 || {};
  if (act6.d80) entries.push({ section: 'act6', key: 'd80', character: 'C1', text: act6.d80 });
  if (act6.d81) entries.push({ section: 'act6', key: 'd81', character: 'C2', text: act6.d81 });
  if (act6.d82_new) entries.push({ section: 'act6', key: 'd82_new', character: 'C1', text: act6.d82_new });
  if (act6.d83_new) entries.push({ section: 'act6', key: 'd83_new', character: 'C2', text: act6.d83_new });
  if (act6.d84_new) entries.push({ section: 'act6', key: 'd84_new', character: 'C1', text: act6.d84_new });
  if (act6.d85_new) entries.push({ section: 'act6', key: 'd85_new', character: 'C2', text: act6.d85_new });
  if (act6.d86_new) entries.push({ section: 'act6', key: 'd86_new', character: 'C1', text: act6.d86_new });
  if (act6.d87_new) entries.push({ section: 'act6', key: 'd87_new', character: 'C2', text: act6.d87_new });

  return entries;
};

const generateAudio = async (
  elevenlabs: ElevenLabsAudio,
  text: string,
  voiceId: string,
  outputPath: string
): Promise<void> => {
  try {
    const cleanText = removeHtmlTags(text);
    console.log(`[INFO] : Generating: "${cleanText.substring(0, 50)}..."`);

    const response = await elevenlabs.requestAudioTask(cleanText, voiceId);
    const audioBuffer = elevenlabs.getAudioBuffer(response);

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, Buffer.from(audioBuffer));
    console.log(`[SUCCESS] : ${outputPath}`);
  } catch (error) {
    console.error(`[ERROR] : Failed: ${(error as Error).message}`);
    throw error;
  }
};

const main = async () => {
  if (!ELEVENLABS_API_KEY) {
    console.error('[ERROR] : Please set ELEVENLABS_API_KEY environment variable');
    console.log('Usage: ELEVENLABS_API_KEY=your-key npx ts-node scripts/generate-missing-audio.ts');
    process.exit(1);
  }

  const elevenlabs = new ElevenLabsAudio(ELEVENLABS_API_KEY);
  const localePath = path.join('src', 'GAME_DATA', GAME_ID, 'locales', 'en.json');
  const outputDir = path.join('src', 'GAME_DATA', GAME_ID, 'assets', 'audio');

  if (!fs.existsSync(localePath)) {
    console.error(`[ERROR] : Locale file not found: ${localePath}`);
    process.exit(1);
  }

  const localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
  const entries = getNewDialogEntries(localeData);

  console.log(`[INFO] : Found ${entries.length} dialog entries to generate`);
  console.log(`[INFO] : Output directory: ${outputDir}\n`);

  const results = { success: 0, failed: 0 };

  for (const entry of entries) {
    const voiceId = entry.character === 'C1' ? VOICES.maya : VOICES.reyes;
    const outputFileName = `${GAME_ID}_${entry.section}_${entry.key}_${entry.character}_en.mp3`;
    const outputPath = path.join(outputDir, outputFileName);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] : ${outputFileName} already exists`);
      continue;
    }

    try {
      await generateAudio(elevenlabs, entry.text, voiceId, outputPath);
      results.success++;
      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      results.failed++;
    }
  }

  console.log('\n[SUMMARY]');
  console.log(`Success: ${results.success}`);
  console.log(`Failed: ${results.failed}`);

  // Output audioUrl mappings for sceneData.ts
  console.log('\n[INFO] : Add these audioUrl properties to your sceneData.ts dialogs:');
  for (const entry of entries) {
    const outputFileName = `${GAME_ID}_${entry.section}_${entry.key}_${entry.character}_en.mp3`;
    console.log(`// ${entry.section}.${entry.key} (${entry.character === 'C1' ? 'Maya' : 'Dr. Reyes'})`);
    console.log(`audioUrl: '/assets/audio/${outputFileName}',`);
  }
};

main().catch(console.error);
