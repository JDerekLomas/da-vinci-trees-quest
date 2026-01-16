import { setTimeout } from 'timers/promises';
import { AudioService, VoiceAiAudioTaskResponse } from './audio-service';

export default class VoiceAiAudio implements AudioService {
  private apiKey: string;
  private apiUrl: string;
  private pollingInterval: number;

  constructor(apiKey: string, pollingInterval: number = 5000, apiUrl: string = 'https://tts-backend.voice.ai') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.pollingInterval = pollingInterval;
  }

  async requestAudioTask(text: string, voice: string): Promise<VoiceAiAudioTaskResponse> {
    const url = `${this.apiUrl}/dev/api/v1/audios/text-to-speech`;
    const payload = {
      voice,
      text,
      creativity: 60,
      diversity: 50,
      precision: 40,
      adherence: 70,
      guidance: 55,
      enhanced: 0,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-API-Token': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return (await response.json()) as VoiceAiAudioTaskResponse;
    } catch (error: unknown) {
      console.error('[ERROR] : Failed to request audio task:', (error as Error).message);
      throw error;
    }
  }

  async checkAudioStatus(taskResponse: VoiceAiAudioTaskResponse): Promise<string> {
    const { audioId } = taskResponse;
    const url = `${this.apiUrl}/dev/api/v1/audios/${audioId}`;
    while (true) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-API-Token': this.apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = (await response.json()) as { status: string };

        if (data.status === 'AVAILABLE') {
          return this.getDownloadLink(audioId);
        } else if (data.status === 'PENDING' || data.status === 'PROCESSING') {
          await setTimeout(this.pollingInterval);
        } else {
          throw new Error(`Unexpected status: ${data.status}`);
        }
      } catch (error: unknown) {
        console.error('[ERROR] : Failed to check audio status:', (error as Error).message);
        throw error;
      }
    }
  }

  private async getDownloadLink(audioId: string): Promise<string> {
    const url = `${this.apiUrl}/dev/api/v1/audios/${audioId}/download`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Token': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = (await response.json()) as { audioFileId: string; audioFileUrl: string };

      return data.audioFileUrl;
    } catch (error: unknown) {
      console.error('[ERROR] : Failed to fetch download link:', (error as Error).message);
      throw error;
    }
  }
}
