#!/usr/bin/env node
// One-off art generator for the "Powerhouse" mitochondria quest.
// Uses MuleRouter -> Alibaba Wan2.6 text-to-image. Run in FOREGROUND:
//   secret-lover run -- node scripts/gen-powerhouse-art.mjs
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.MULEROUTER_API_KEY;
const API_BASE = 'https://api.mulerouter.ai/vendors/alibaba/v1/wan2.6-t2i/generation';
const ROOT = path.join(process.cwd(), 'src', 'GAME_DATA', 'powerhouse', 'assets');

const STYLE =
  'Vibrant, polished digital illustration for a high-school educational science game. ' +
  'Cinematic lighting, clean shapes, rich saturated color, sense of wonder, friendly and modern. ' +
  'No text, no words, no letters, no logos, no watermark.';

const JOBS = [
  // backgrounds (16:9)
  { file: 'backgrounds/title.png', size: '1280*720', prompt:
    'Epic hero image: glowing mitochondria with visible folded cristae floating in a deep blue space, ' +
    'a determined runner silhouette in warm orange light striding across the foreground, energy sparks, ' +
    'deep navy and electric teal with orange accents, dramatic and inspiring.' },
  { file: 'backgrounds/lab.png', size: '1280*720', prompt:
    'Interior of a modern bright sports-science laboratory, a treadmill, large glowing wall screens with ' +
    'abstract performance graphs and heart-rate curves, sleek equipment, big windows with daylight, ' +
    'clean teal and white palette, welcoming and high-tech.' },
  { file: 'backgrounds/cell.png', size: '1280*720', prompt:
    'Breathtaking microscopic view inside a living human muscle cell, several large glowing mitochondria ' +
    'with clearly visible folded inner-membrane cristae, translucent organic membranes, floating particles, ' +
    'bioluminescent purples, blues and teal, soft volumetric glow, awe-inspiring.' },
  { file: 'backgrounds/track.png', size: '1280*720', prompt:
    'An empty outdoor running track with crisp white lane lines at golden hour, warm low sunlight, ' +
    'long shadows, stadium softly blurred in the background, motivational and serene, orange and amber tones.' },
  { file: 'backgrounds/end.png', size: '1280*720', prompt:
    'The finish line of a running track with a thin tape across empty lanes, triumphant golden sunburst light, ' +
    'confetti sparkles in the air, celebratory and uplifting, warm orange and green tones.' },
  // characters (square head-and-shoulders portraits on a soft simple background, for circular cropping)
  { file: 'characters/maya.png', size: '1024*1024', prompt:
    'Friendly stylized character portrait, head and shoulders, centered: a confident 17-year-old female ' +
    'distance runner with an athletic build, in a bright track-and-field training top, a fitness watch on her ' +
    'wrist, hair tied back, warm determined smile, looking at the viewer. Simple soft teal-to-blue gradient ' +
    'background. Modern animated film style, appealing and relatable.' },
  { file: 'characters/dro.png', size: '1024*1024', prompt:
    'Friendly stylized character portrait, head and shoulders, centered: a warm, confident female exercise ' +
    'physiologist in her early 40s, smart-casual clothing under an open white lab coat, short professional ' +
    'hair, kind reassuring smile, looking at the viewer. Simple soft warm-orange gradient background. ' +
    'Modern animated film style, intelligent and approachable.' },
];

async function createTask(prompt, size) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json', 'User-Agent': 'Powerhouse/1.0' },
    body: JSON.stringify({ prompt: `${STYLE} ${prompt}`, size, n: 1, prompt_extend: false }),
  });
  if (!res.ok) throw new Error(`create ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data?.task_info?.id || data?.id;
}

async function checkTask(taskId) {
  const res = await fetch(`${API_BASE}/${taskId}`, {
    headers: { Authorization: `Bearer ${API_KEY}`, 'User-Agent': 'Powerhouse/1.0' },
  });
  if (!res.ok) throw new Error(`check ${res.status}`);
  const data = await res.json();
  const status = data?.task_info?.status || data?.status;
  const images = data?.task_info?.result?.images || data?.task_info?.images || data?.images || [];
  return { status, images };
}

async function run(job) {
  try {
    const taskId = await createTask(job.prompt, job.size);
    for (let i = 0; i < 80; i++) {
      await new Promise((r) => setTimeout(r, 4000));
      const { status, images } = await checkTask(taskId);
      const s = String(status || '').toLowerCase();
      if (s === 'completed' || s === 'succeeded') {
        const url = images[0]?.url || images[0];
        const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
        const out = path.join(ROOT, job.file);
        fs.writeFileSync(out, buf);
        console.log(`OK   ${job.file} (${(buf.length / 1024).toFixed(0)} KB)`);
        return { file: job.file, ok: true };
      }
      if (s === 'failed') throw new Error('task failed');
    }
    throw new Error('timeout');
  } catch (e) {
    console.log(`FAIL ${job.file}: ${e.message}`);
    return { file: job.file, ok: false };
  }
}

if (!API_KEY) {
  console.error('MULEROUTER_API_KEY missing');
  process.exit(1);
}
console.log(`Generating ${JOBS.length} images...`);
const results = await Promise.all(JOBS.map(run));
const ok = results.filter((r) => r.ok).length;
console.log(`Done: ${ok}/${JOBS.length} succeeded`);
process.exit(ok === JOBS.length ? 0 : 2);
