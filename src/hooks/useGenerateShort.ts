import axios from "axios";
import { useCallback, useState } from "react";
import type { ShortGenerationPayload, ShortGenerationResponse } from "../types";
import { generateShort } from "../lib/api";

interface UseGenerateShortResult {
  submit: (payload: ShortGenerationPayload) => Promise<void>;
  reset: () => void;
  data: ShortGenerationResponse | null;
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
  const [data, setData] = useState<ShortGenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (payload: ShortGenerationPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateShort(payload);
      setData(response);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    submit,
    reset,
    data,
    isLoading,
    error
  };
};
