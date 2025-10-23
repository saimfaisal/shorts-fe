export const ErrorBanner = ({ message }) => (
  <div
    role="alert"
    className="flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100"
  >
    <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-rose-400" />
    <p className="leading-relaxed">{message}</p>
  </div>
);
