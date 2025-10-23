export const LoadingIndicator = ({ label = "Generating short…" }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-200 shadow-inner shadow-slate-950/40">
    <svg
      className="h-6 w-6 animate-spin text-brand"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <p>{label}</p>
  </div>
);
