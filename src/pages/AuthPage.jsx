export const AuthPage = ({ mode, onBack }) => {
  const isSignup = mode === "signup";

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      >
        ← Back to creator
      </button>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/80">
        <h1 className="text-3xl font-bold text-slate-900">
          {isSignup ? "Create your ShortBeat account" : "Welcome back to ShortBeat"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isSignup
            ? "Sign up to save your favorite shorts and access them anywhere."
            : "Log in to resume generating and managing your Shorts projects."}
        </p>

        <form className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              required
            />
          </div>

          {isSignup && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                required
              />
            </div>
          )}

          <button
            type="button"
            className="w-full rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {isSignup ? "Already have an account?" : "Need a ShortBeat account?"}{" "}
          <button
            type="button"
            onClick={() => onBack(isSignup ? "login" : "signup")}
            className="font-semibold text-brand transition hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </section>
    </div>
  );
};
