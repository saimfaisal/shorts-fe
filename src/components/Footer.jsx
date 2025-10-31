import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from './icons.jsx';
export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white/90">
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div>
        <p className="text-base font-semibold text-slate-900">
          <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text font-poppins text-transparent">
            Short
          </span>
          <span className="ml-1 bg-gradient-to-r from-brand-dark via-accent-dark to-brand bg-clip-text font-montserrat text-transparent">
            Beat
          </span>
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Create polished vertical shorts from any YouTube video in seconds.
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <a href="#features" className="transition hover:text-brand">
            Features
          </a>
          <a href="#pricing" className="transition hover:text-brand">
            Pricing
          </a>
          <a href="#support" className="transition hover:text-brand">
            Support
          </a>
          <a href="mailto:hello@shortbeat.app" className="transition hover:text-brand">
            Contact
          </a>
        </nav> */}

        <div className="flex items-center gap-3 text-slate-500">
          <a
            href="https://www.linkedin.com"
            aria-label="Follow ShortBeat on LinkedIn"
            className="rounded-full border border-slate-200 p-2 transition hover:border-brand hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com"
            aria-label="Follow ShortBeat on Facebook"
            className="rounded-full border border-slate-200 p-2 transition hover:border-brand hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Follow ShortBeat on Instagram"
            className="rounded-full border border-slate-200 p-2 transition hover:border-brand hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.x.com"
            aria-label="Follow ShortBeat on X"
            className="rounded-full border border-slate-200 p-2 transition hover:border-brand hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            target="_blank"
            rel="noreferrer noopener"
          >
            <XIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <p className="text-xs text-slate-400 sm:text-right">
        © {new Date().getFullYear()} ShortBeat. Crafted for creators.
      </p>
    </div>
  </footer>
);
