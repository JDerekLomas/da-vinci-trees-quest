#!/usr/bin/env python3
"""Generate ElevenLabs voice lines for the Powerhouse quest.
Run in FOREGROUND (Keychain): secret-lover run -- python3 scripts/gen-powerhouse-audio.py
Maya = young female (Jessica); Dr. Okonkwo = warm female (Matilda)."""
import json, os, re, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import urllib.request

API = os.environ.get("ELEVENLABS_API_KEY")
MAYA = "cgSgspJ2msm6clMCkdW9"   # Jessica - young female
DRO = "XrExE9yKIg1WjnnlVkGX"    # Matilda - warm professional female

BASE = Path("src/GAME_DATA/powerhouse")
OUT = BASE / "assets" / "audio"
LOC = json.load(open(BASE / "locales" / "en.json"))
SCN = LOC["scenes"]

# key (under scenes.) -> voice
M, D = "maya", "dro"
DIALOG = {
    "s2.d1": M, "s2.d2": D, "s2.d3": M, "s2.d4": D,
    "s3.d1": D, "s3.d2": D, "s3.d3": D,
    "s5.d1": D, "s5.d2": D, "s5.d3": D,
    "s6.d1": D, "s6.d2": D, "s6.d3": D, "s6.d4": D,
    "s8.d1": D, "s8.d2": D, "s8.d3": M,
    "s10.d1": D, "s10.d2": D, "s10.d3": D,
    "s11.d1": D, "s11.d2": D, "s11.d3": D,
    "s13.d1": D, "s13.d2": D, "s13.d3": D,
    "s14.d1": D, "s14.d2": D, "s14.d3": D,
    "s16.d1": D, "s16.d2": D, "s16.d3": D,
    "s18.d1": D, "s18.d2": D, "s18.d3": D, "s18.d4": D,
    "s20.d1": D, "s20.d2": D, "s20.d3": D, "s20.d4": D,
    "s22.d1": D, "s22.d2": D, "s22.d3": D, "s22.d4": D,
    "s24.d1": D, "s24.d2": M, "s24.d3": D,
    "s25.d1": D, "s25.d2": D,
}
for q in ["q4", "q7", "q9", "q12", "q15", "q17", "q19", "q21", "q23"]:
    DIALOG[f"{q}.stem"] = D


def get_text(dotkey):
    node = SCN
    for part in dotkey.split("."):
        node = node[part]
    return node


def clean(text):
    text = re.split(r"<div", text, maxsplit=1)[0]   # drop embedded image+caption block
    text = re.sub(r"<[^>]+>", "", text)             # strip remaining tags
    text = text.replace("—", "...").replace("–", "...")
    text = text.replace("&amp;", "and")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def synth(item):
    key, voice = item
    fname = key.replace(".", "_") + ".mp3"
    out = OUT / fname
    text = clean(get_text(key))
    if not text:
        return (fname, "empty")
    vid = MAYA if voice == "maya" else DRO
    body = json.dumps({
        "text": text,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.25, "use_speaker_boost": True},
    }).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{vid}",
        data=body,
        headers={"xi-api-key": API, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        out.write_bytes(data)
        return (fname, f"ok {len(data)//1024}KB")
    except Exception as e:
        return (fname, f"FAIL {e}")


if not API:
    print("ELEVENLABS_API_KEY missing"); sys.exit(1)
OUT.mkdir(parents=True, exist_ok=True)
print(f"Generating {len(DIALOG)} voice lines...")
ok = 0
with ThreadPoolExecutor(max_workers=5) as ex:
    for fname, status in ex.map(synth, DIALOG.items()):
        print(f"  {fname}: {status}")
        if status.startswith("ok"):
            ok += 1
print(f"Done: {ok}/{len(DIALOG)}")
sys.exit(0 if ok == len(DIALOG) else 2)
