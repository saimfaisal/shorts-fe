const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) {
    return "Unknown";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }

  return `${minutes}m ${remainder.toString().padStart(2, "0")}s`;
};

const capitalize = (value) => {
  if (!value) {
    return "pending";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const ResultCard = ({ result }) => {
  const hasFile = Boolean(result.file_url);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40 backdrop-blur">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Status</p>
            <p className="mt-1 text-lg font-semibold text-slate-100">
              {capitalize(result.status)}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Duration</p>
            <p className="mt-1 text-lg font-semibold text-slate-100">
              {formatDuration(result.duration)}
            </p>
          </div>

          {result.error_message && (
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Details</p>
              <p className="mt-1 text-sm text-rose-300">{result.error_message}</p>
            </div>
          )}
        </div>

        {hasFile ? (
          <div className="flex w-full flex-col items-start gap-3 sm:w-56">
            <p className="text-xs uppercase tracking-wide text-slate-400">Short File</p>
            <a
              href={result.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            >
              Download / Preview
            </a>
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            {result.status === "processing"
              ? "The backend is still working on your short. Keep this page open and the download link will appear when ready."
              : "The backend did not return a file URL. Check the status or try again in a moment."}
          </p>
        )}
      </div>

      {Object.keys(result).length > 0 && (
        <details className="mt-6 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          <summary className="cursor-pointer font-medium text-slate-100">
            Raw response details
          </summary>
          <pre className="mt-3 overflow-x-auto rounded bg-slate-950/60 p-3 text-xs text-slate-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};
