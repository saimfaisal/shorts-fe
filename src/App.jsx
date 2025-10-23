import { useCallback } from "react";
import { ErrorBanner } from "./components/ErrorBanner";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ResultCard } from "./components/ResultCard";
import { ShortsForm } from "./components/ShortsForm";
import { useGenerateShort } from "./hooks/useGenerateShort";

const App = () => {
  const { data, error, isLoading, submit, reset } = useGenerateShort();

  const handleSubmit = useCallback(
    async (payload) => {
      await submit(payload);
    },
    [submit]
  );

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.15),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.1),_transparent_45%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            YouTube Shorts Generator
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Paste any YouTube link, choose the length of the short, and let the backend do the rest.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-card shadow-black/30 backdrop-blur">
          <div className="mb-8 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6">
            <h2 className="text-lg font-semibold text-white">Create a short in seconds</h2>
            <p className="mt-2 text-sm text-slate-300">
              Provide the YouTube URL, set how long the generated clip should be, and optionally decide where the short starts. When ready, click{" "}
              <span className="font-semibold text-brand-light">Generate Short</span>.
            </p>
          </div>

          <ShortsForm onSubmit={handleSubmit} isLoading={isLoading} onResetResult={reset} />
        </section>

        <section className="mt-10 space-y-4">
          {isLoading && <LoadingIndicator />}
          {error && <ErrorBanner message={error} />}
          {data && !isLoading && <ResultCard result={data} />}
        </section>

        <footer className="mt-auto pt-14 text-center text-xs text-slate-500">
          Configure the backend URL by setting <code className="rounded bg-slate-800 px-1 py-0.5">VITE_API_BASE_URL</code> and{" "}
          <code className="rounded bg-slate-800 px-1 py-0.5">VITE_GENERATE_SHORTS_PATH</code> in a <code className="rounded bg-slate-800 px-1 py-0.5">.env</code> file.
        </footer>
      </div>
    </main>
  );
};

export default App;
