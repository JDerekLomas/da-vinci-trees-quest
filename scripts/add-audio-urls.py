#!/usr/bin/env python3
"""Add audioUrl fields to sceneData.ts for Da Vinci Trees quest."""

import re
from pathlib import Path

SCENE_DATA_FILE = Path('/Users/dereklomas/quests-app/src/GAME_DATA/da-vinci-trees/sceneData.ts')

# Mapping of dialogue keys to their act and character
# Format: dialogue_key -> (act, character_code)
# C1 = Maya, C2 = Dr. Reyes
DIALOGUE_INFO = {
    # Act 1
    'd1': ('act1', 'C1'), 'd2': ('act1', 'C2'), 'd3': ('act1', 'C1'),
    'd4': ('act1', 'C2'), 'd5': ('act1', 'C1'), 'd6': ('act1', 'C2'),
    'd7': ('act1', 'C1'), 'd8': ('act1', 'C2'), 'd9': ('act1', 'C1'),
    'd10': ('act1', 'C1'), 'd11': ('act1', 'C1'), 'd12': ('act1', 'C2'),
    'd13': ('act1', 'C1'), 'd14': ('act1', 'C2'), 'd15': ('act1', 'C1'),
    'd16': ('act1', 'C2'), 'd17': ('act1', 'C1'), 'd18': ('act1', 'C2'),
    # Act 2
    'd19': ('act2', 'C1'), 'd20': ('act2', 'C2'), 'd21': ('act2', 'C2'),
    'd22': ('act2', 'C1'), 'd23': ('act2', 'C2'), 'd24': ('act2', 'C1'),
    'd25': ('act2', 'C2'), 'd26': ('act2', 'C1'), 'd27': ('act2', 'C2'),
    'd28': ('act2', 'C2'), 'd29': ('act2', 'C1'), 'd30': ('act2', 'C2'),
    'd31': ('act2', 'C1'), 'd32': ('act2', 'C2'), 'd33': ('act2', 'C2'),
    'd34': ('act2', 'C1'), 'd35': ('act2', 'C2'), 'd37': ('act2', 'C2'),
    'd38': ('act2', 'C1'), 'd39': ('act2', 'C1'), 'd40': ('act2', 'C2'),
    'd41': ('act2', 'C1'),
    # Act 3
    'd43': ('act3', 'C2'), 'd44': ('act3', 'C1'), 'd45': ('act3', 'C1'),
    'd46': ('act3', 'C2'), 'd47': ('act3', 'C1'), 'd48': ('act3', 'C1'),
    'd50': ('act3', 'C2'), 'd51': ('act3', 'C1'), 'd52': ('act3', 'C2'),
    # Act 4
    'd54': ('act4', 'C1'), 'd55': ('act4', 'C2'), 'd56': ('act4', 'C2'),
    'd57': ('act4', 'C1'), 'd58': ('act4', 'C2'), 'd59': ('act4', 'C1'),
    'd60': ('act4', 'C2'),
    # Act 5
    'd64': ('act5', 'C1'), 'd65': ('act5', 'C2'), 'd67': ('act5', 'C1'),
    'd68': ('act5', 'C2'), 'd69': ('act5', 'C1'), 'd70': ('act5', 'C1'),
    'd71': ('act5', 'C2'), 'd72': ('act5', 'C2'), 'd74': ('act5', 'C2'),
    'd76': ('act5', 'C1'), 'd77': ('act5', 'C2'),
    # Act 6
    'd78': ('act6', 'C1'), 'd79': ('act6', 'C2'), 'd82': ('act6', 'C1'),
    # Act 7
    'd83': ('act7', 'C1'), 'd84': ('act7', 'C2'), 'd86': ('act7', 'C1'),
    'd87': ('act7', 'C2'), 'd88': ('act7', 'C1'), 'd89': ('act7', 'C2'),
    'd90': ('act7', 'C1'),
}

def get_audio_url(dialogue_key):
    """Get the audio URL for a dialogue key."""
    if dialogue_key not in DIALOGUE_INFO:
        return None
    act, char = DIALOGUE_INFO[dialogue_key]
    return f"/assets/audio/da-vinci-trees_{act}_{dialogue_key}_{char}_en.mp3"

def main():
    content = SCENE_DATA_FILE.read_text()

    # Find all bodyAsHtml entries and add audioUrl after them
    # Pattern: bodyAsHtml: 'scenes.actX.dY',
    pattern = r"(bodyAsHtml: 'scenes\.(act\d+)\.(d\d+)',)"

    def replacement(match):
        full_match = match.group(1)
        act = match.group(2)
        dialogue_key = match.group(3)

        audio_url = get_audio_url(dialogue_key)
        if audio_url:
            return f"{full_match}\n        audioUrl: '{audio_url}',"
        return full_match

    updated_content = re.sub(pattern, replacement, content)

    # Write the updated content
    SCENE_DATA_FILE.write_text(updated_content)
    print("Updated sceneData.ts with audio URLs")

if __name__ == '__main__':
    main()
