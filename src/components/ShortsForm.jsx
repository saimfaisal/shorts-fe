import { useMemo, useState } from "react";

const initialState = {
  youtubeUrl: "",
  duration: "30",
  startTime: ""
};

const colonTimePattern = /^(\d{1,2}:){0,2}\d{1,2}$/;

const parseStartTime = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  if (!colonTimePattern.test(trimmed)) {
    return undefined;
  }

  const segments = trimmed.split(":").map(Number);
  if (segments.some((segment) => Number.isNaN(segment))) {
    return undefined;
  }

  return segments.reduceRight((acc, segment, index, array) => {
    const power = array.length - 1 - index;
    return acc + segment * 60 ** power;
  }, 0);
};

const isLikelyYoutubeUrl = (value) => {
  if (!value.trim()) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return /youtube\.com|youtu\.be/.test(parsed.hostname);
  } catch {
    return /youtube\.com|youtu\.be/.test(value);
  }
};

export const ShortsForm = ({ onSubmit, isLoading, onResetResult }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const isPristine = useMemo(
    () =>
      values.youtubeUrl === initialState.youtubeUrl &&
      values.duration === initialState.duration &&
      values.startTime === initialState.startTime,
    [values]
  );

  const handleChange =
    (field) =>
    (event) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value
      }));

      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }

      if (field === "youtubeUrl" && onResetResult) {
        onResetResult();
      }
    };

  const validate = () => {
    const nextErrors = {};

    if (!values.youtubeUrl.trim()) {
      nextErrors.youtubeUrl = "Paste a YouTube video link to continue.";
    } else if (!isLikelyYoutubeUrl(values.youtubeUrl.trim())) {
      nextErrors.youtubeUrl = "Enter a valid YouTube URL.";
    }

    const durationNumber = Number(values.duration);
    if (!values.duration.trim()) {
      nextErrors.duration = "Duration is required.";
    } else if (Number.isNaN(durationNumber) || durationNumber <= 0) {
      nextErrors.duration = "Use a positive number of seconds.";
    }

    const parsedStartTime = parseStartTime(values.startTime);
    if (values.startTime && parsedStartTime === undefined) {
      nextErrors.startTime = "Use seconds (e.g. 45) or HH:MM:SS format.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return { success: false };
    }

    const payload = {
      youtube_url: values.youtubeUrl.trim(),
      duration: Math.round(durationNumber)
    };

    if (parsedStartTime !== undefined) {
      payload.start_time = parsedStartTime;
    }

    return { success: true, payload };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, payload } = validate();

    if (!success || !payload) {
      return;
    }

    await onSubmit(payload);
  };

  const handleReset = () => {
    setValues(initialState);
    setErrors({});
    onResetResult?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="youtubeUrl" className="text-sm font-medium text-slate-700">
          YouTube Video URL
        </label>
        <input
          id="youtubeUrl"
          name="youtubeUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={values.youtubeUrl}
          onChange={handleChange("youtubeUrl")}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          autoComplete="off"
          required
        />
        {errors.youtubeUrl && (
          <p className="text-sm text-rose-400" role="alert">
            {errors.youtubeUrl}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="duration" className="text-sm font-medium text-slate-700">
            Short Duration (seconds)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            placeholder="15"
            value={values.duration}
            onChange={handleChange("duration")}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            required
          />
          {errors.duration && (
            <p className="text-sm text-rose-400" role="alert">
              {errors.duration}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="startTime" className="text-sm font-medium text-slate-700">
            Start Time (optional)
          </label>
          <input
            id="startTime"
            name="startTime"
            type="text"
            placeholder="e.g. 1:20 or 80"
            value={values.startTime}
            onChange={handleChange("startTime")}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          {errors.startTime ? (
            <p className="text-sm text-rose-400" role="alert">
              {errors.startTime}
            </p>
          ) : (
            <p className="text-sm text-slate-500">Use seconds or HH:MM:SS.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 sm:w-auto"
          disabled={Boolean(isLoading)}
        >
          {isLoading ? "Generating…" : "Generate Short"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto"
          disabled={isLoading || isPristine}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
