export interface AudioService {
  requestAudioTask(text: string, voice: string): Promise<VoiceAiAudioTaskResponse | NarakeetAudioTaskResponse>;
  checkAudioStatus(data: VoiceAiAudioTaskResponse | NarakeetAudioTaskResponse): Promise<string>;
}

export interface VoiceAiAudioTaskResponse {
  audioId: string;
}

export interface NarakeetAudioTaskResponse {
  statusUrl: string;
}
