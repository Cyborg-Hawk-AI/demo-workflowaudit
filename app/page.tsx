import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automated Workflow Health Reports",
  description:
    "Catch fragility in Make, Zapier, and n8n workflows before they break. Scored audits, fix lists, and white-label PDFs for consultants.",
};

const features = [
  {
    icon: "🔌",
    title: "Connect Any Workflow",
    description:
      "Upload JSON exports or pull directly via Make, Zapier, or n8n API. One click to start a full fragility scan.",
  },
  {
    icon: "📊",
    title: "Scored Health Report",
    description:
      "Every node scored against error handling, credential security, single points of failure, and documentation gaps.",
  },
  {
    icon: "🎯",
    title: "Priority Fix List",
    description:
      "Ranked recommendations in plain English — what broke, why it matters, and how long each fix takes.",
  },
  {
    icon: "📄",
    title: "White-Label PDF",
    description:
      "Consultants deliver branded audit reports to clients. Your logo, your colors, your deliverable.",
  },
  {
    icon: "🔄",
    title: "Scheduled Re-Audits",
    description:
      "Weekly scans catch drift. Diff reports show exactly what changed since the last audit.",
  },
  {
    icon: "⚡",
    title: "Mailbox Money",
    description:
      "Serverless audits, auto-generated PDFs, Stripe billing. Under one hour of owner time per week.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-surface to-surface" />
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
            For automation consultants &amp; SMB owners
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Catch workflow fragility{" "}
            <span className="text-gradient">before it breaks</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Automated health audit reports for Make, Zapier, and n8n workflows.
            Score every node, rank every fix, deliver white-label PDFs — so your
            clients never get stranded by silent failures.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-900/50 transition hover:bg-brand-500"
            >
              Try Interactive Demo
            </Link>
            <Link
              href="/research"
              className="rounded-xl border border-surface-border px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-brand-500/50 hover:text-white"
            >
              How we found this idea
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-surface-border/50 pt-10">
            {[
              { value: "9/9", label: "Validation checks passed" },
              { value: "62→85", label: "Avg. score improvement" },
              { value: "<1hr", label: "Owner time per week" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brand-400">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-surface-border bg-surface-raised/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Everything you need to audit workflows</h2>
            <p className="mt-3 text-gray-400">
              From JSON upload to client-ready PDF — fully automated.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass group rounded-2xl p-6 transition hover:border-brand-500/30"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-brand-300">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-2xl p-8 md:p-12">
            <blockquote className="text-xl font-medium leading-relaxed text-gray-200 md:text-2xl">
              &ldquo;I have no idea if my workflow is one API change away from
              breaking.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-gray-500">
              — r/Entrepreneur thread on &ldquo;vibecoded automations&rdquo;
            </p>
            <p className="mt-6 text-gray-400">
              WorkflowAudit exists because consultants disappear and SMB owners
              inherit fragile automations nobody can audit. We fix that with
              proactive scoring — not post-mortem logs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-surface-border bg-surface-raised/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Simple, consultant-friendly pricing</h2>
            <p className="mt-3 text-gray-400">
              Pay per report or go unlimited with white-label branding.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-300">Pay Per Report</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-gray-500"> / audit</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> Full fragility scan
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> Scored report + fix list
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> PDF download
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> Credit-based billing
                </li>
              </ul>
              <Link
                href="/demo"
                className="mt-8 block rounded-lg border border-surface-border py-3 text-center text-sm font-medium transition hover:border-brand-500/50"
              >
                See in demo →
              </Link>
            </div>
            <div className="relative rounded-2xl border border-brand-500/40 bg-gradient-to-b from-brand-950/50 to-surface-raised p-8 shadow-lg shadow-brand-900/20">
              <span className="absolute -top-3 right-6 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold">
                Popular
              </span>
              <h3 className="text-lg font-semibold text-brand-300">Consultant Pro</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-500"> / month</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> Unlimited audits
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> White-label PDF branding
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> Scheduled re-audits + diffs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-400">✓</span> Client portal access
                </li>
              </ul>
              <Link
                href="/demo"
                className="mt-8 block rounded-lg bg-brand-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                Try white-label in demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold">See it in action</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Explore the fully interactive demo with realistic workflow data,
            scored reports, PDF preview, and scheduled diff audits.
          </p>
          <Link
            href="/demo"
            className="mt-8 inline-block rounded-xl bg-brand-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-brand-500"
          >
            Launch Demo →
          </Link>
        </div>
      </section>
    </>
  );
}
