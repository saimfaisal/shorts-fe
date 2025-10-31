import axios from "axios";
import { useCallback, useRef, useState } from "react";
import type { ShortGenerationPayload, ShortVideo, ShortStatus } from "../types";
import { fetchShortById, generateShort, getPollSettings } from "../lib/api";

interface UseGenerateShortResult {
  submit: (payload: ShortGenerationPayload) => Promise<void>;
  reset: () => void;
  data: ShortVideo | null;
  isLoading: boolean;
  error: string | null;
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseMessage = (error.response?.data as { message?: string })?.message;
    if (responseMessage) {
      return responseMessage;
    }

    if (error.response?.status) {
      return `Request failed with status ${error.response.status}.`;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while generating the short.";
};

export const useGenerateShort = (): UseGenerateShortResult => {
  const [data, setData] = useState<ShortVideo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRequestRef = useRef(0);

  const isTerminalStatus = (status: ShortStatus | undefined) =>
    status === "completed" || status === "failed";

  const pollForCompletion = useCallback(async (shortId: number) => {
    const requestToken = activeRequestRef.current;
    const { intervalMs, timeoutMs } = getPollSettings();
    const deadline = Date.now() + timeoutMs;
    let latest: ShortVideo | null = null;

    while (Date.now() < deadline) {
      // Allow other async work to run before next poll.
      await new Promise((resolve) => setTimeout(resolve, intervalMs));

      if (activeRequestRef.current !== requestToken) {
        // A newer request started; abort this poll silently.
        return null;
      }

      try {
        latest = await fetchShortById(shortId);
        if (activeRequestRef.current !== requestToken) {
          return null;
        }
        setData(latest);

        if (isTerminalStatus(latest.status)) {
          return latest;
        }
      } catch (pollError) {
        // Propagate network errors so the caller can handle them.
        throw pollError;
      }
    }

    throw new Error("Timed out while waiting for the short to finish processing.");
  }, []);

  const submit = useCallback(async (payload: ShortGenerationPayload) => {
    setIsLoading(true);
    setError(null);
    activeRequestRef.current += 1;
    const currentToken = activeRequestRef.current;

    try {
      const response = await generateShort(payload);
      if (activeRequestRef.current !== currentToken) {
        return;
      }
      setData(response);

      if (response.id && !isTerminalStatus(response.status)) {
        const finalResult = await pollForCompletion(response.id);
        if (finalResult && finalResult.status === "failed" && finalResult.error_message) {
          setError(finalResult.error_message);
        }
      } else if (response.status === "failed" && response.error_message) {
        setError(response.error_message);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      if (activeRequestRef.current === currentToken) {
        setIsLoading(false);
      }
    }
  }, [pollForCompletion]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    activeRequestRef.current += 1;
    setIsLoading(false);
  }, []);

  return {
    submit,
    reset,
    data,
    isLoading,
    error
  };
};
