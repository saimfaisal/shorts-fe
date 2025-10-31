export type ShortStatus = "pending" | "processing" | "completed" | "failed";

export interface ShortGenerationPayload {
  youtube_url: string;
  duration: number;
  start_time?: number;
}

export interface ShortVideo {
  id: number;
  youtube_url: string;
  duration: number;
  start_time: number;
  status: ShortStatus;
  error_message: string;
  file: string | null;
  file_url?: string | null;
  created_at: string;
  updated_at: string;
}
