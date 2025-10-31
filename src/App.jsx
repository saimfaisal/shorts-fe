import { useCallback, useState } from "react";
import { ErrorBanner } from "./components/ErrorBanner";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { Navbar } from "./components/Navbar";
import { ResultCard } from "./components/ResultCard";
import { ShortsForm } from "./components/ShortsForm";
import { useGenerateShort } from "./hooks/useGenerateShort";
import { AuthPage } from "./pages/AuthPage";
import { Footer } from "./components/Footer";

const App = () => {
  const { data, error, isLoading, submit, reset } = useGenerateShort();
  const [authMode, setAuthMode] = useState(null);

  const handleSubmit = useCallback(
    async (payload) => {
      await submit(payload);
    },
    [submit]
  );

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
  };

  const handleCloseAuth = (nextMode) => {
    if (nextMode === "login" || nextMode === "signup") {
      setAuthMode(nextMode);
      return;
    }
    setAuthMode(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <Navbar onOpenAuth={handleOpenAuth} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.1),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.08),_transparent_45%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        {authMode ? (
          <AuthPage mode={authMode} onBack={handleCloseAuth} />
        ) : (
          <>
            <header className="mb-10 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text font-poppins text-transparent">
                  Short
                </span>
                <span className="ml-2 bg-gradient-to-r from-brand-dark via-accent-dark to-brand bg-clip-text font-montserrat text-transparent">
                  Beat
                </span>
              </h1>
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                Paste any YouTube link, choose the length of the short, and let ShortBeat do the rest.
              </p>
            </header>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80 backdrop-blur">
              <div className="mb-8 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Create a short in seconds</h2>
                <p className="mt-2 text-sm text-slate-600">
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

            {/* <footer className="mt-auto pt-14 text-center text-xs text-slate-500">
              Configure the backend URL by setting <code className="rounded bg-slate-800 px-1 py-0.5">VITE_API_BASE_URL</code> and{" "}
              <code className="rounded bg-slate-800 px-1 py-0.5">VITE_GENERATE_SHORTS_PATH</code> in a <code className="rounded bg-slate-800 px-1 py-0.5">.env</code> file.
            </footer> */}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default App;
