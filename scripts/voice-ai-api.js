import { setTimeout } from 'timers/promises';
export default class VoiceAiAudio {
    apiKey;
    apiUrl;
    pollingInterval;
    constructor(apiKey, pollingInterval = 5000, apiUrl = 'https://tts-backend.voice.ai') {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.pollingInterval = pollingInterval;
    }
    async requestAudioTask(text, voice) {
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
            return (await response.json());
        }
        catch (error) {
            console.error('[ERROR] : Failed to request audio task:', error.message);
            throw error;
        }
    }
    async checkAudioStatus(taskResponse) {
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
                const data = (await response.json());
                if (data.status === 'AVAILABLE') {
                    return this.getDownloadLink(audioId);
                }
                else if (data.status === 'PENDING' || data.status === 'PROCESSING') {
                    await setTimeout(this.pollingInterval);
                }
                else {
                    throw new Error(`Unexpected status: ${data.status}`);
                }
            }
            catch (error) {
                console.error('[ERROR] : Failed to check audio status:', error.message);
                throw error;
            }
        }
    }
    async getDownloadLink(audioId) {
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
            const data = (await response.json());
            return data.audioFileUrl;
        }
        catch (error) {
            console.error('[ERROR] : Failed to fetch download link:', error.message);
            throw error;
        }
    }
}
