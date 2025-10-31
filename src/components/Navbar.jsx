export const Navbar = ({ onOpenAuth }) => (
  <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <a
        href="/#"
        className="flex items-center gap-2 text-lg font-semibold text-slate-900 transition hover:text-brand-dark"
        aria-label="ShortBeat home"
      >
        <span className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text font-poppins text-transparent">
            Short
          </span>
          <span className="ml-1 bg-gradient-to-r from-brand-dark via-accent-dark to-brand bg-clip-text font-montserrat text-transparent">
            Beat
          </span>
        </span>
      </a>
      <nav className="flex items-center gap-3">
        <button
          onClick={() => onOpenAuth?.("login")}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          Log in
        </button>
        <button
          onClick={() => onOpenAuth?.("signup")}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          Sign up
        </button>
      </nav>
    </div>
  </header>
);
