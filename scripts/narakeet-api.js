import { setTimeout } from 'timers/promises';
export default class NarakeetAudio {
    apiKey;
    apiUrl;
    pollingInterval;
    constructor(apiKey, pollingInterval = 5000, apiUrl = 'https://api.narakeet.com') {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.pollingInterval = pollingInterval;
    }
    async requestAudioTask(text, voice) {
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
            return (await response.json());
        }
        catch (error) {
            console.error('[ERROR] : Failed to request audio task:', error.message);
            throw error;
        }
    }
    async checkAudioStatus(taskResponse) {
        const { statusUrl } = taskResponse;
        while (true) {
            try {
                const response = await fetch(statusUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = (await response.json());
                if (data.finished) {
                    return data.result ?? '';
                }
            }
            catch (error) {
                console.error('[ERROR] : failed to check audio status:', error.message);
                throw error;
            }
            await setTimeout(this.pollingInterval);
        }
    }
}
