import { setTimeout } from 'timers/promises';

export interface ElevenLabsAudioTaskResponse {
  audioData: ArrayBuffer;
}

export default class ElevenLabsAudio {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor(
    apiKey: string,
    model: string = 'eleven_multilingual_v2',
    apiUrl: string = 'https://api.elevenlabs.io/v1'
  ) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.model = model;
  }

  async requestAudioTask(text: string, voiceId: string): Promise<ElevenLabsAudioTaskResponse> {
    const url = `${this.apiUrl}/text-to-speech/${voiceId}`;
    const payload = {
      text,
      model_id: this.model,
      voice_settings: {
        stability: 0.30,        // Lower = more expressive/emotional
        similarity_boost: 0.80,
        style: 0.65,            // Higher = more stylized/dramatic
        use_speaker_boost: true,
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }

      const audioData = await response.arrayBuffer();
      return { audioData };
    } catch (error: unknown) {
      console.error('[ERROR] : Failed to request audio task:', (error as Error).message);
      throw error;
    }
  }

  // ElevenLabs returns audio directly, so this just returns a placeholder
  async checkAudioStatus(taskResponse: ElevenLabsAudioTaskResponse): Promise<string> {
    // ElevenLabs API returns audio synchronously, so no polling needed
    // Return a placeholder - the actual audio is in taskResponse.audioData
    return 'direct-audio';
  }

  // Get the audio buffer directly (for use with ElevenLabs)
  getAudioBuffer(taskResponse: ElevenLabsAudioTaskResponse): ArrayBuffer {
    return taskResponse.audioData;
  }

  // List available voices
  async listVoices(): Promise<{ voices: { voice_id: string; name: string }[] }> {
    const url = `${this.apiUrl}/voices`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error: unknown) {
      console.error('[ERROR] : Failed to list voices:', (error as Error).message);
      throw error;
    }
  }
}
