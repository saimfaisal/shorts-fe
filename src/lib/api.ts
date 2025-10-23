import axios from "axios";
import type { ShortGenerationPayload, ShortGenerationResponse } from "../types";

const DEFAULT_BASE_URL = "http://localhost:8000";
const DEFAULT_GENERATE_PATH = "/api/shorts/generate/";

const buildUrl = (baseUrl: string, path: string) => {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 45000
});

export const generateShort = async (
  payload: ShortGenerationPayload
): Promise<ShortGenerationResponse> => {
  const endpoint = buildUrl(
    apiClient.defaults.baseURL ?? DEFAULT_BASE_URL,
    import.meta.env.VITE_GENERATE_SHORTS_PATH ?? DEFAULT_GENERATE_PATH
  );

  const response = await apiClient.post<ShortGenerationResponse>(endpoint, payload);
  return response.data;
};
