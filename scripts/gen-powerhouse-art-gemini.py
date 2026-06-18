#!/usr/bin/env python3
"""Generate Powerhouse quest art with Google Imagen 4, matching the STEAMQuest
house style (anime/visual-novel painterly backgrounds; stylized character
portraits on flat backgrounds for later bg-removal).
Run FOREGROUND: secret-lover run -- python3 scripts/gen-powerhouse-art-gemini.py
Writes PNGs to /tmp/gem for review before placement."""
import base64, json, os, sys, urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

API = os.environ.get("GEMINI_API_KEY")
MODEL = "imagen-4.0-generate-001"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API}"
OUT = Path("/tmp/gem"); OUT.mkdir(exist_ok=True)

BG_STYLE = ("Anime visual-novel background art, semi-realistic painterly digital illustration, "
            "bright clean cinematic lighting, vibrant saturated colors, detailed, no people, "
            "no text, no words, no letters, no logos.")
CHAR_STYLE = ("Stylized semi-realistic character portrait in a polished modern mobile-game / "
              "visual-novel illustration style, head and upper body, facing the viewer, calm "
              "friendly closed-mouth expression, soft studio lighting, FLAT SOLID light grey "
              "background (#dddddd), centered, no text, no words, no logos.")

JOBS = [
    ("bg", "title", "16:9",
     "Epic but stylized cellular world: glowing mitochondria with visible folded cristae drifting "
     "through a deep blue cell interior, a soft warm light beam, a sense of energy and wonder, "
     "an athletic vibe with subtle orange energy streaks."),
    ("bg", "lab", "16:9",
     "Interior of a bright modern sports-science laboratory: a treadmill, large glowing wall "
     "screens showing abstract performance graphs and heart-rate curves, sleek equipment, big "
     "windows with daylight, clean teal-and-white palette, welcoming and high-tech."),
    ("bg", "cell", "16:9",
     "Inside a living human muscle cell: several large glowing mitochondria with clearly visible "
     "folded inner-membrane cristae, translucent organic membranes, floating particles, soft "
     "bioluminescent purples, blues and teal, dreamy volumetric glow, awe-inspiring."),
    ("bg", "track", "16:9",
     "An empty outdoor running track with crisp white lane lines at golden hour, warm low sunlight, "
     "long soft shadows, a stadium gently blurred behind, motivational and serene, amber tones."),
    ("bg", "end", "16:9",
     "The finish line of a running track, a thin tape across empty lanes, triumphant golden "
     "sunburst light, a few confetti sparkles, celebratory and uplifting, warm orange and green."),
    ("char", "maya", "3:4",
     "A confident friendly 17-year-old female distance runner of African descent, athletic build, "
     "wearing a bright track-and-field training top, hair in neat braids tied back, a small fitness "
     "watch on her wrist, looking at the viewer with a calm warm closed-mouth smile."),
    ("char", "dro", "3:4",
     "A warm confident female exercise physiologist in her early 40s, light-brown skin, smart-casual "
     "clothing under an open white lab coat, short professional hair, a calm reassuring closed-mouth "
     "smile, intelligent and approachable, looking at the viewer."),
]


def gen(job):
    kind, name, ar, desc = job
    style = BG_STYLE if kind == "bg" else CHAR_STYLE
    body = json.dumps({
        "instances": [{"prompt": f"{style} {desc}"}],
        "parameters": {"sampleCount": 1, "aspectRatio": ar, "personGeneration": "allow_adult"},
    }).encode()
    req = urllib.request.Request(URL, data=body, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            d = json.load(r)
        preds = d.get("predictions", [])
        if not preds or "bytesBase64Encoded" not in preds[0]:
            return (name, f"FAIL no image: {str(d)[:160]}")
        (OUT / f"{kind}_{name}.png").write_bytes(base64.b64decode(preds[0]["bytesBase64Encoded"]))
        return (name, "ok")
    except Exception as e:
        return (name, f"FAIL {e}")


if not API:
    print("GEMINI_API_KEY missing"); sys.exit(1)
print(f"Generating {len(JOBS)} images with {MODEL}...")
ok = 0
with ThreadPoolExecutor(max_workers=4) as ex:
    for name, status in ex.map(gen, JOBS):
        print(f"  {name}: {status}")
        if status == "ok":
            ok += 1
print(f"Done: {ok}/{len(JOBS)} -> /tmp/gem")
sys.exit(0 if ok == len(JOBS) else 2)
