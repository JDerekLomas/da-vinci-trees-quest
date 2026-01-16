import { setTimeout } from 'timers/promises';
import { AudioService, NarakeetAudioTaskResponse } from './audio-service';

type PollResponse = {
  finished: boolean;
  percent?: number;
  succeeded?: boolean;
  result?: string;
  message?: string;
  durationInSeconds?: number;
};

export default class NarakeetAudio implements AudioService {
  private apiKey: string;
  private apiUrl: string;
  private pollingInterval: number;

  constructor(apiKey: string, pollingInterval: number = 5000, apiUrl: string = 'https://api.narakeet.com') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.pollingInterval = pollingInterval;
  }

  async requestAudioTask(text: string, voice: string): Promise<NarakeetAudioTaskResponse> {
    const url = `${this.apiUrl}/text-to-speech/mp3?voice=${voice}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'x-api-key': this.apiKey,
        },
        body: text,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return (await response.json()) as NarakeetAudioTaskResponse;
    } catch (error: unknown) {
      console.error('[ERROR] : Failed to request audio task:', (error as Error).message);
      throw error;
    }
  }

  async checkAudioStatus(taskResponse: NarakeetAudioTaskResponse): Promise<string> {
    const { statusUrl } = taskResponse;
    while (true) {
      try {
        const response = await fetch(statusUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = (await response.json()) as PollResponse;
        if (data.finished) {
          return data.result ?? '';
        }
      } catch (error: unknown) {
        console.error('[ERROR] : failed to check audio status:', (error as Error).message);
        throw error;
      }

      await setTimeout(this.pollingInterval);
    }
  }
}
