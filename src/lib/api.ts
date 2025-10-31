import axios from "axios";
import type { ShortGenerationPayload, ShortVideo } from "../types";

const DEFAULT_GENERATE_PATH = "/api/shorts/generate/";
const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_POLL_INTERVAL_MS = 3_000;
const DEFAULT_POLL_TIMEOUT_MS = 1_800_000;

const resolveDefaultBaseUrl = () => {
  const explicit = import.meta.env.VITE_API_BASE_URL;
  if (explicit) {
    return explicit;
  }

  if (import.meta.env.DEV) {
    // Vite proxy handles API calls in development, so stay on the same origin.
    return "";
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

const resolveTimeout = () => {
  const rawTimeout = import.meta.env.VITE_API_TIMEOUT_MS;

  if (typeof rawTimeout === "string" && rawTimeout.trim().length > 0) {
    const parsed = Number(rawTimeout);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
    console.warn(
      `Invalid VITE_API_TIMEOUT_MS value "${rawTimeout}". Falling back to ${DEFAULT_TIMEOUT_MS}ms.`
    );
  }

  return DEFAULT_TIMEOUT_MS;
};

const resolvePollInterval = () => {
  const rawInterval = import.meta.env.VITE_API_POLL_INTERVAL_MS;

  if (typeof rawInterval === "string" && rawInterval.trim().length > 0) {
    const parsed = Number(rawInterval);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
    console.warn(
      `Invalid VITE_API_POLL_INTERVAL_MS value "${rawInterval}". Falling back to ${DEFAULT_POLL_INTERVAL_MS}ms.`
    );
  }

  return DEFAULT_POLL_INTERVAL_MS;
};

const resolvePollTimeout = () => {
  const rawTimeout = import.meta.env.VITE_API_POLL_TIMEOUT_MS;

  if (typeof rawTimeout === "string" && rawTimeout.trim().length > 0) {
    const parsed = Number(rawTimeout);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
    console.warn(
      `Invalid VITE_API_POLL_TIMEOUT_MS value "${rawTimeout}". Falling back to ${DEFAULT_POLL_TIMEOUT_MS}ms.`
    );
  }

  return DEFAULT_POLL_TIMEOUT_MS;
};

const buildUrl = (baseUrl: string, path: string) => {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const resolvedBaseUrl = resolveDefaultBaseUrl();

const apiClient = axios.create({
  baseURL: resolvedBaseUrl || undefined,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: resolveTimeout()
});

export const generateShort = async (
  payload: ShortGenerationPayload
): Promise<ShortVideo> => {
  const baseUrl = apiClient.defaults.baseURL ?? resolvedBaseUrl;
  const endpoint = buildUrl(
    baseUrl,
    import.meta.env.VITE_GENERATE_SHORTS_PATH ?? DEFAULT_GENERATE_PATH
  );

  const response = await apiClient.post<ShortVideo>(endpoint, payload);
  return response.data;
};

export const fetchShortById = async (id: number): Promise<ShortVideo> => {
  const baseUrl = apiClient.defaults.baseURL ?? resolvedBaseUrl;
  const endpoint = buildUrl(baseUrl, `/api/shorts/${id}/`);
  const response = await apiClient.get<ShortVideo>(endpoint);
  return response.data;
};

export const getPollSettings = () => ({
  intervalMs: resolvePollInterval(),
  timeoutMs: resolvePollTimeout()
});
