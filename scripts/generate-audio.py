#!/usr/bin/env python3
"""Generate ElevenLabs voice audio for Da Vinci Trees quest."""

import json
import os
import re
import requests
import time
from pathlib import Path

# Configuration
ELEVENLABS_API_KEY = os.environ.get('ELEVENLABS_API_KEY')
VOICE_MAYA = 'cgSgspJ2msm6clMCkdW9'  # Jessica - young, playful
VOICE_REYES = 'nPczCjzI2devNBz1zQrb'  # Brian - deep, resonant, comforting (African American male)

OUTPUT_DIR = Path('/Users/dereklomas/quests-app/src/GAME_DATA/da-vinci-trees/assets/audio')
LOCALE_FILE = Path('/Users/dereklomas/quests-app/src/GAME_DATA/da-vinci-trees/locales/en.json')

# Dialogue to character mapping based on sceneData.ts
# char1 = Maya, char2 = Dr. Reyes
DIALOGUE_SPEAKERS = {
    # Act 1
    'd1': 'maya', 'd2': 'reyes', 'd3': 'maya', 'd4': 'reyes', 'd5': 'maya',
    'd6': 'reyes', 'd7': 'maya', 'd8': 'reyes', 'd9': 'maya', 'd10': 'maya',
    'd11': 'maya', 'd12': 'reyes', 'd13': 'maya', 'd14': 'reyes', 'd15': 'maya',
    'd16': 'reyes', 'd17': 'maya', 'd18': 'reyes',
    # Act 2
    'd19': 'maya', 'd20': 'reyes', 'd21': 'reyes', 'd22': 'maya', 'd23': 'reyes',
    'd24': 'maya', 'd25': 'reyes', 'd26': 'maya', 'd27': 'reyes', 'd28': 'reyes',
    'd29': 'maya', 'd30': 'reyes', 'd31': 'maya', 'd32': 'reyes', 'd33': 'reyes',
    'd34': 'maya', 'd35': 'reyes', 'd37': 'reyes', 'd38': 'maya', 'd39': 'maya',
    'd40': 'reyes', 'd41': 'maya',
    # Act 3
    'd43': 'reyes', 'd44': 'maya', 'd45': 'maya', 'd46': 'reyes', 'd47': 'maya',
    'd48': 'maya', 'd50': 'reyes', 'd51': 'maya', 'd52': 'reyes',
    # Act 4
    'd54': 'maya', 'd55': 'reyes', 'd56': 'reyes', 'd57': 'maya', 'd58': 'reyes',
    'd59': 'maya', 'd60': 'reyes',
    # Act 5
    'd64': 'maya', 'd65': 'reyes', 'd67': 'maya', 'd68': 'reyes', 'd69': 'maya',
    'd70': 'maya', 'd71': 'reyes', 'd72': 'reyes', 'd74': 'reyes', 'd76': 'maya',
    'd77': 'reyes',
    # Act 6
    'd78': 'maya', 'd79': 'reyes', 'd82': 'maya',
    # Act 7
    'd83': 'maya', 'd84': 'reyes', 'd86': 'maya', 'd87': 'reyes', 'd88': 'maya',
    'd89': 'reyes', 'd90': 'maya',
}

def strip_html(text):
    """Remove HTML tags from text."""
    # Remove img tags and their content
    text = re.sub(r"<div[^>]*>.*?</div>", "", text, flags=re.DOTALL)
    # Remove other HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = text.replace('&mdash;', '...').replace('&ndash;', '...')
    text = text.replace('\u2014', '...').replace('\u2013', '...')
    text = text.replace('\u03c0', 'pi').replace('\u00b2', ' squared')
    text = text.replace('\u00b3', ' cubed').replace('\u2153', 'one third')
    return text.strip()

def generate_audio(text, voice_id, output_path):
    """Generate audio using ElevenLabs API."""
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }

    data = {
        "text": text,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.3,
            "use_speaker_boost": True
        }
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            f.write(response.content)
        return True
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return False

def main():
    if not ELEVENLABS_API_KEY:
        print("Error: ELEVENLABS_API_KEY not set")
        return

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Load locale file
    with open(LOCALE_FILE, 'r') as f:
        locale = json.load(f)

    scenes = locale.get('scenes', {})

    # Process all acts
    generated = 0
    for act_name, act_data in scenes.items():
        if not act_name.startswith('act'):
            continue

        for key, text in act_data.items():
            if not key.startswith('d') or not key[1:].isdigit():
                continue

            speaker = DIALOGUE_SPEAKERS.get(key)
            if not speaker:
                print(f"Warning: No speaker mapping for {key}")
                continue

            voice_id = VOICE_MAYA if speaker == 'maya' else VOICE_REYES
            char_code = 'C1' if speaker == 'maya' else 'C2'

            # Clean text
            clean_text = strip_html(text)
            if len(clean_text) < 5:
                print(f"Skipping {key}: text too short")
                continue

            # Generate filename
            filename = f"da-vinci-trees_{act_name}_{key}_{char_code}_en.mp3"
            output_path = OUTPUT_DIR / filename

            if output_path.exists():
                print(f"Skipping {filename}: already exists")
                continue

            print(f"Generating {filename}...")
            print(f"  Text: {clean_text[:80]}...")

            if generate_audio(clean_text, voice_id, output_path):
                generated += 1
                print(f"  Done!")
            else:
                print(f"  Failed!")

            # Rate limiting
            time.sleep(0.5)

    print(f"\nGenerated {generated} audio files")

if __name__ == '__main__':
    main()
