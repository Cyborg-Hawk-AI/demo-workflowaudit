import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — How We Found This Idea",
  description:
    "The research and validation behind WorkflowAudit — mined from real pain points in automation communities.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem:
      "Automated workflows lack proper error handling, causing complete failures when edge cases occur (missing fields, timeouts, API limits), leaving clients unable to troubleshoot and dependent on the original creator.",
    persona: "Automation consultant, business process expert",
    workaround:
      "Clients remain dependent on automation experts to fix issues; many experts disappear leaving clients stranded",
    wtp: "Clients are paying for automation services but experiencing costly failures",
    source: "https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/",
  },
  {
    problem:
      "Automated workflows are built without proper documentation, modularity, or clear logic explanation, making it impossible for others to understand, maintain, or debug them when issues arise.",
    persona: "Business owner, automation client",
    workaround:
      "Hiring automation experts who create undocumented, non-modular solutions; stuck with broken workflows when creators disappear",
    wtp: "Paying for automation services but receiving poor quality deliverables",
    source: "https://www.reddit.com/r/Entrepreneur/comments/1u97zle/vibecoded_automations_are_becoming_a_real_problem/",
  },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Research &amp; Validation</p>
        <h1 className="mt-2 text-4xl font-bold">How we found WorkflowAudit</h1>
        <p className="mt-4 text-lg text-gray-400">
          Mined from real communities where automation consultants and SMB owners
          describe workflows that break silently and nobody can fix.
        </p>
      </div>

      {/* Origin story */}
      <section className="mb-10 glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold">Why this exists</h2>
        <p className="mt-4 leading-relaxed text-gray-300">
          The r/Entrepreneur thread on &ldquo;vibecoded automations&rdquo; described
          workflows with &ldquo;no error handling, no documentation, no modularity&rdquo;
          that broke silently and left clients stranded. Commenters described paying
          consultants who then disappeared, leaving behind fragile workflows nobody
          could audit or fix. One person wrote:{" "}
          <em className="text-brand-300">
            &ldquo;I have no idea if my workflow is one API change away from breaking.&rdquo;
          </em>
        </p>
        <p className="mt-4 leading-relaxed text-gray-300">
          Existing tools (Make&apos;s built-in logs, Zapier&apos;s task history) show what
          happened <em>after</em> a failure but don&apos;t proactively identify fragility
          before it occurs.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <span className="rounded-full border border-surface-border px-3 py-1 text-gray-400">
            Cluster: Undocumented &amp; unmaintainable automation workflows
          </span>
          <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-brand-300">
            Rubric score: 108/130
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            Validation: 9/9 checks passed
          </span>
        </div>
      </section>

      {/* Target & GTM */}
      <section className="mb-10 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-brand-400">Target customer</h3>
          <p className="mt-2 text-gray-300">
            Automation consultants who want to upsell clients, and SMB owners who
            inherited workflows and want peace of mind.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Consultants can use it as a paid deliverable — the report IS the product
            they sell to clients, creating a built-in reseller channel.
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-brand-400">Go-to-market</h3>
          <p className="mt-2 text-gray-300">
            Automation consultant communities, Make.com partner ecosystem, cold email
            to Upwork/Fiverr automation sellers.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            <strong className="text-gray-300">Competitive landscape:</strong> No
            dedicated workflow auditing tool exists. Consultants currently do this
            manually or not at all.
          </p>
        </div>
      </section>

      {/* Validation checklist */}
      <section className="mb-10 glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold">Validation checklist (9/9)</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                ✓
              </span>
              <span className="text-gray-300">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Automation playbook */}
      <section className="mb-10 glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold">How this business runs itself</h2>
        <p className="mt-2 text-sm text-gray-500">Mailbox money — under 1 hour/week owner time</p>
        <p className="mt-4 leading-relaxed text-gray-300">
          Workflow JSON is uploaded or pulled via API. A serverless function runs the
          audit rubric via OpenAI and scores each node. A PDF is generated via
          Puppeteer and emailed to the user. Stripe webhooks manage credit deductions
          and subscription state. A weekly cron re-audits subscribed workflows and emails
          diff reports.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-surface-overlay p-4 text-center">
            <p className="text-2xl font-bold text-brand-400">~1 hr</p>
            <p className="text-xs text-gray-500">Owner time / week</p>
          </div>
          <div className="rounded-lg bg-surface-overlay p-4 text-center">
            <p className="text-2xl font-bold text-brand-400">3 wks</p>
            <p className="text-xs text-gray-500">MVP estimate</p>
          </div>
          <div className="rounded-lg bg-surface-overlay p-4 text-center">
            <p className="text-2xl font-bold text-brand-400">$9–$99</p>
            <p className="text-xs text-gray-500">Price range</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          <strong className="text-gray-300">MVP stack:</strong> Next.js + Supabase +
          OpenAI + PDF generation (Puppeteer); Make.com API first.
        </p>
      </section>

      {/* Pain points */}
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Source pain points (real posts)</h2>
        <div className="space-y-6">
          {painPoints.map((pp, i) => (
            <article key={i} className="glass rounded-2xl p-6">
              <p className="leading-relaxed text-gray-200">{pp.problem}</p>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-gray-500">Persona</dt>
                  <dd className="text-gray-300">{pp.persona}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Workaround today</dt>
                  <dd className="text-gray-300">{pp.workaround}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Willingness to pay signal</dt>
                  <dd className="text-gray-300">{pp.wtp}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Source</dt>
                  <dd>
                    <a
                      href={pp.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-400 hover:underline"
                    >
                      Reddit — vibecoded automations thread →
                    </a>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* About Idea Miner */}
      <section className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold">About this program</h2>
        <p className="mt-4 leading-relaxed text-gray-300">
          This demo was auto-built by the <strong>Idea Miner</strong> pipeline: a
          twice-daily research program that mines Reddit, Hacker News, Stack Exchange,
          and GitHub for real people describing real pain, scores the opportunities,
          and automatically ships a working mock of every idea that passes validation
          (&gt;=8/9 checks, momentum not declining, not previously built). The bar for
          every idea: low-maintenance recurring revenue that a solo owner can run in a
          few hours a week.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Generated by Idea Miner run 2026-07-10-pm on 2026-07-10 21:56 UTC
        </p>
        <Link
          href="/demo"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold hover:bg-brand-500"
        >
          Explore the demo →
        </Link>
      </section>
    </div>
  );
}
