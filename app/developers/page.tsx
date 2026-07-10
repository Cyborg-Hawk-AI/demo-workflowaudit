import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Documentation",
  description: "Feature documentation for the WorkflowAudit interactive demo.",
};

const features = [
  {
    name: "Dashboard & Workflow List",
    demoPath: "/demo → Dashboard tab",
    tryIt: "Click stat cards, filter by platform dropdown, click any workflow row or View → button, filter activity feed.",
    mocked: "All workflow data, scores, and activity events are hardcoded in lib/mock-data.ts. No database or API.",
    production:
      "Supabase stores workflows per org. Make/Zapier/n8n APIs sync scenario metadata. Activity feed from audit job events + Stripe webhooks via Supabase Realtime.",
  },
  {
    name: "Connect Workflow (JSON Upload)",
    demoPath: "/demo → Connect & Scan tab → JSON Upload",
    tryIt: "Toggle upload mode, edit JSON textarea, click Load sample export, then Run Fragility Scan.",
    mocked: "JSON is client-side only. Scan shows a progress bar then navigates to report — no LLM call.",
    production:
      "POST /api/workflows/import accepts JSON blob, normalizes node graph, stores in Supabase. Validates platform-specific schema.",
  },
  {
    name: "Connect Workflow (API Pull)",
    demoPath: "/demo → Connect & Scan tab → API Connection",
    tryIt: "Switch to API mode, select platform, edit API key, click Test Connection.",
    mocked: "Test Connection shows a toast. No real API calls.",
    production:
      "OAuth tokens stored encrypted in Supabase. Serverless function calls Make GET /scenarios, Zapier GET /zaps, or n8n REST API.",
  },
  {
    name: "Automated Fragility Scan",
    demoPath: "/demo → Connect & Scan → Run Fragility Scan",
    tryIt: "Click Run Fragility Scan to watch progress bar, then auto-navigate to Scored Report.",
    mocked: "Simulated 3-second scan with hardcoded result (score 62, 18 issues).",
    production:
      "Vercel serverless queues audit job. OpenAI scores each node against rubric: error handlers, hardcoded creds, SPOF, documentation. Results in audit_results table.",
  },
  {
    name: "Scored Health Report",
    demoPath: "/demo → Scored Report tab",
    tryIt: "Switch workflow dropdown, click category bars, click node findings to jump to fix list.",
    mocked: "Scores and categories from mock-data. Workflow dropdown swaps hardcoded per-workflow scores.",
    production:
      "Composite score = weighted average of category scores. Each category has LLM-generated summary with node citations.",
  },
  {
    name: "Priority-Ranked Fix List",
    demoPath: "/demo → Fix List tab",
    tryIt: "Filter all/open/resolved, click a fix to see explanation, Mark Resolved, Copy for Client, Include in PDF.",
    mocked: "Fix items in React state. Mark Resolved updates UI only.",
    production:
      "OpenAI generates plain-English explanations ranked by severity × blast radius. Status tracked per finding. Effort estimates from rubric templates.",
  },
  {
    name: "White-Label PDF Report",
    demoPath: "/demo → White-Label PDF tab",
    tryIt: "Edit company name, color picker, footer text, hide branding checkbox. Preview PDF modal, Email to Client.",
    mocked: "Live HTML preview updates in real time. PDF download/email are toasts only.",
    production:
      "Puppeteer renders branded HTML template server-side. Resend emails PDF to consultant + optional client contact. Consultant Pro plan required for white-label.",
  },
  {
    name: "Scheduled Re-Audit & Diff",
    demoPath: "/demo → Re-Audit & Diff tab",
    tryIt: "Toggle schedule, change frequency, Run Re-Audit Now, filter diff by type, click diff rows, Email Diff Report.",
    mocked: "Diff changes are static sample data. Schedule toggle is local state.",
    production:
      "Vercel Cron weekly fetches latest workflow JSON, re-runs audit, JSON-diff against previous snapshot. Email diff report via Resend.",
  },
  {
    name: "Credits & Subscription Billing",
    demoPath: "/demo → Credits & Plan tab",
    tryIt: "Manage Subscription, Downgrade, Buy More Credits modal, click transaction rows.",
    mocked: "Credit balance in React state. Buy credits adds to counter. No Stripe.",
    production:
      "Stripe Checkout: $9/report credits, $99/mo Consultant Pro. Webhooks update credits and plan_tier in Supabase. Customer portal for subscription management.",
  },
  {
    name: "DEV NOTE Tooltips",
    demoPath: "/demo — amber (i) icons throughout",
    tryIt: "Click any amber info icon beside major controls for production implementation notes.",
    mocked: "Static tooltip content in DevNote component.",
    production:
      "These document the intended architecture for reviewers evaluating the demo.",
  },
];

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Developer Documentation</p>
        <h1 className="mt-2 text-4xl font-bold">WorkflowAudit Demo — Feature Map</h1>
        <p className="mt-4 text-lg text-gray-400">
          Every feature in the interactive demo, what&apos;s mocked vs. production, and
          where to click to try it.
        </p>
        <Link
          href="/demo"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold hover:bg-brand-500"
        >
          Open Interactive Demo →
        </Link>
      </div>

      <section className="mb-12 glass rounded-2xl p-8">
        <h2 className="text-xl font-bold">Architecture Overview</h2>
        <p className="mt-3 text-gray-400">
          This demo is a zero-config Next.js 14 App Router app deployable to Vercel
          with no environment variables. All interactivity is client-side React state
          with hardcoded sample data.
        </p>
        <div className="mt-6 rounded-lg bg-surface-overlay p-4 font-mono text-sm text-gray-300">
          <p>User uploads JSON or connects API</p>
          <p className="ml-4">→ Serverless audit job (OpenAI rubric per node)</p>
          <p className="ml-4">→ Scores + fix list stored in Supabase</p>
          <p className="ml-4">→ Puppeteer generates white-label PDF</p>
          <p className="ml-4">→ Resend emails report to user</p>
          <p className="ml-4">→ Stripe webhooks manage credits + subscription</p>
          <p className="ml-4">→ Vercel Cron re-audits weekly, diffs, emails changes</p>
        </div>
      </section>

      <div className="space-y-6">
        {features.map((f, i) => (
          <article key={f.name} className="glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/20 text-sm font-bold text-brand-400">
                {i + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{f.name}</h3>
                <p className="mt-1 text-sm text-brand-400">{f.demoPath}</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      How to try it
                    </p>
                    <p className="mt-1 text-sm text-gray-300">{f.tryIt}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                      Mocked in demo
                    </p>
                    <p className="mt-1 text-sm text-gray-300">{f.mocked}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                      Production plan
                    </p>
                    <p className="mt-1 text-sm text-gray-300">{f.production}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 glass rounded-2xl p-8">
        <h2 className="text-xl font-bold">Tech Stack (MVP Estimate)</h2>
        <ul className="mt-4 space-y-2 text-gray-400">
          <li><strong className="text-gray-300">Frontend:</strong> Next.js 14 App Router + Tailwind CSS</li>
          <li><strong className="text-gray-300">Database:</strong> Supabase (workflows, audits, users, branding)</li>
          <li><strong className="text-gray-300">AI:</strong> OpenAI API — node-level rubric scoring</li>
          <li><strong className="text-gray-300">PDF:</strong> Puppeteer serverless HTML → PDF</li>
          <li><strong className="text-gray-300">Email:</strong> Resend — reports and diff notifications</li>
          <li><strong className="text-gray-300">Payments:</strong> Stripe — credits + Consultant Pro subscription</li>
          <li><strong className="text-gray-300">Cron:</strong> Vercel Cron — weekly re-audits</li>
          <li><strong className="text-gray-300">Timeline:</strong> ~3 weeks; Make.com API integration first</li>
        </ul>
      </section>
    </div>
  );
}
