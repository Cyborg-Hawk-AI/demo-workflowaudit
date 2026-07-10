import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-raised">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold">
            WA
          </div>
          <span className="text-sm text-gray-400">
            WorkflowAudit — catch fragility before it breaks
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/demo"
            className="text-gray-300 transition hover:text-brand-400"
          >
            Live Demo
          </Link>
          <Link
            href="/developers"
            className="text-gray-300 transition hover:text-brand-400"
          >
            Developers
          </Link>
          <Link
            href="/research"
            className="text-gray-300 transition hover:text-brand-400"
          >
            How we found this idea
          </Link>
        </nav>
        <p className="text-xs text-gray-500">
          Demo mock — no backend required
        </p>
      </div>
    </footer>
  );
}
