export interface ShortGenerationPayload {
  youtube_url: string;
  duration: number;
  start_time?: string | number;
}

export interface ShortGenerationResponse {
  file_url?: string;
  status?: string;
  duration?: number;
  message?: string;
  [key: string]: unknown;
}
