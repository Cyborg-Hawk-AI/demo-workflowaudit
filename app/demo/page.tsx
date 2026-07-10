"use client";

import { useState, useCallback } from "react";
import DevNote from "@/components/DevNote";
import Toast from "@/components/Toast";
import {
  WORKFLOWS,
  SCORE_CATEGORIES,
  FIX_ITEMS,
  ACTIVITY_FEED,
  DIFF_CHANGES,
  SAMPLE_JSON,
  CONSULTANT_PROFILE,
  WHITE_LABEL,
} from "@/lib/mock-data";

type Tab = "dashboard" | "connect" | "report" | "fixes" | "pdf" | "schedule" | "billing";
type ConnectMode = "upload" | "api";
type ScanPhase = "idle" | "scanning" | "complete";

const TABS: { id: Tab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "connect", label: "Connect & Scan" },
  { id: "report", label: "Scored Report" },
  { id: "fixes", label: "Fix List" },
  { id: "pdf", label: "White-Label PDF" },
  { id: "schedule", label: "Re-Audit & Diff" },
  { id: "billing", label: "Credits & Plan" },
];

const severityColors: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const statusColors: Record<string, string> = {
  Critical: "text-red-400 bg-red-500/10",
  "At Risk": "text-orange-400 bg-orange-500/10",
  Fair: "text-amber-400 bg-amber-500/10",
  Good: "text-emerald-400 bg-emerald-500/10",
};

export default function DemoPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(WORKFLOWS[0].id);
  const [connectMode, setConnectMode] = useState<ConnectMode>("upload");
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [scanPhase, setScanPhase] = useState<ScanPhase>("complete");
  const [scanProgress, setScanProgress] = useState(100);
  const [fixFilter, setFixFilter] = useState<"all" | "open" | "resolved">("all");
  const [fixItems, setFixItems] = useState(FIX_ITEMS);
  const [selectedFix, setSelectedFix] = useState<string | null>(null);
  const [wlLogo, setWlLogo] = useState(WHITE_LABEL.logoText);
  const [wlColor, setWlColor] = useState(WHITE_LABEL.primaryColor);
  const [wlFooter, setWlFooter] = useState(WHITE_LABEL.footerText);
  const [hideWA, setHideWA] = useState(WHITE_LABEL.hideWorkflowAudit);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [scheduleFreq, setScheduleFreq] = useState("weekly");
  const [diffFilter, setDiffFilter] = useState<"all" | "added" | "modified" | "removed">("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [credits, setCredits] = useState(CONSULTANT_PROFILE.credits);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [apiPlatform, setApiPlatform] = useState("make");
  const [apiKey, setApiKey] = useState("mk_live_••••••••••••4f2a");

  const showToast = useCallback((message: string, type: "success" | "info" | "warning" = "info") => {
    setToast({ message, type });
  }, []);

  const workflow = WORKFLOWS.find((w) => w.id === selectedWorkflow) ?? WORKFLOWS[0];

  const runScan = () => {
    setScanPhase("scanning");
    setScanProgress(0);
    showToast("Fragility scan started — analyzing 14 nodes…", "info");
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanPhase("complete");
          showToast("Scan complete! Health score: 62/100 — 6 critical issues found.", "success");
          setTab("report");
          return 100;
        }
        return p + 12;
      });
    }, 300);
  };

  const filteredFixes = fixItems.filter((f) => {
    if (fixFilter === "open") return f.status !== "resolved";
    if (fixFilter === "resolved") return f.status === "resolved";
    return true;
  });

  const filteredDiffs = DIFF_CHANGES.filter((d) =>
    diffFilter === "all" ? true : d.type === diffFilter
  );

  const filteredActivity = ACTIVITY_FEED.filter((a) =>
    activityFilter === "all" ? true : a.type === activityFilter
  );

  const markFixResolved = (id: string) => {
    setFixItems((items) =>
      items.map((f) => (f.id === id ? { ...f, status: "resolved" as const } : f))
    );
    showToast("Fix marked as resolved — score will update on next re-audit.", "success");
    setSelectedFix(null);
  };

  const buyCredits = (amount: number) => {
    setCredits((c) => c + amount);
    setShowBuyModal(false);
    showToast(`Purchased ${amount} audit credits — $${amount * 9} charged to card •••• 4242.`, "success");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Demo header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">WorkflowAudit Console</h1>
          <p className="mt-1 text-sm text-gray-400">
            Signed in as {CONSULTANT_PROFILE.name} · {CONSULTANT_PROFILE.company} ·{" "}
            <span className="text-brand-400">{CONSULTANT_PROFILE.plan}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DevNote title="Consultant Dashboard">
            Production: Auth via Supabase. Dashboard loads workflows from DB filtered by org_id.
          </DevNote>
          <button
            type="button"
            onClick={() => showToast("Notifications panel opened — 3 unread alerts.", "info")}
            className="relative rounded-lg border border-surface-border px-3 py-2 text-sm hover:bg-surface-overlay"
          >
            🔔
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
              3
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("connect");
              showToast("New audit wizard opened.", "info");
            }}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500"
          >
            + New Audit
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-surface-border bg-surface-raised p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              showToast(`Switched to ${t.label} view.`, "info");
            }}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-brand-600 text-white"
                : "text-gray-400 hover:bg-surface-overlay hover:text-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === "dashboard" && (
        <div className="animate-fade-in space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Workflows Monitored", value: "4", sub: "+1 this month" },
              { label: "Avg. Health Score", value: "66", sub: "Across all clients" },
              { label: "Open Critical Issues", value: "7", sub: "Needs attention" },
              { label: "Audits This Month", value: String(CONSULTANT_PROFILE.auditsThisMonth), sub: "Unlimited plan" },
            ].map((card) => (
              <button
                key={card.label}
                type="button"
                onClick={() => showToast(`Drill-down: ${card.label} details loaded.`, "info")}
                className="glass rounded-xl p-5 text-left transition hover:border-brand-500/30"
              >
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="mt-1 text-3xl font-bold">{card.value}</p>
                <p className="mt-1 text-xs text-brand-400">{card.sub}</p>
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass rounded-xl p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Client Workflows</h2>
                <DevNote title="Workflow List">
                  Production: Synced from Make/Zapier/n8n APIs or manual JSON uploads stored in Supabase.
                </DevNote>
                <select
                  className="rounded-lg border border-surface-border bg-surface-overlay px-3 py-1.5 text-sm"
                  onChange={(e) => showToast(`Filtered by platform: ${e.target.value}`, "info")}
                >
                  <option value="all">All platforms</option>
                  <option value="make">Make.com</option>
                  <option value="zapier">Zapier</option>
                  <option value="n8n">n8n</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-border text-left text-gray-500">
                      <th className="pb-3 pr-4">Workflow</th>
                      <th className="pb-3 pr-4">Client</th>
                      <th className="pb-3 pr-4">Score</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WORKFLOWS.map((w) => (
                      <tr
                        key={w.id}
                        className={`border-b border-surface-border/50 transition hover:bg-surface-overlay/50 ${
                          selectedWorkflow === w.id ? "bg-brand-600/5" : ""
                        }`}
                      >
                        <td className="py-3 pr-4">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedWorkflow(w.id);
                              showToast(`Selected: ${w.name}`, "info");
                            }}
                            className="text-left font-medium hover:text-brand-400"
                          >
                            {w.name}
                          </button>
                          <p className="text-xs text-gray-500">{w.platform} · {w.nodes} nodes</p>
                        </td>
                        <td className="py-3 pr-4 text-gray-400">{w.client}</td>
                        <td className="py-3 pr-4">
                          <span className={`font-bold ${w.score < 50 ? "text-red-400" : w.score < 70 ? "text-amber-400" : "text-emerald-400"}`}>
                            {w.score}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[w.status]}`}>
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedWorkflow(w.id);
                              setTab("report");
                              showToast(`Opening audit report for ${w.name}`, "info");
                            }}
                            className="text-brand-400 hover:underline"
                          >
                            View →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="font-semibold">Activity Feed</h2>
                <DevNote title="Activity Log">
                  Production: Event stream from audit jobs, Stripe webhooks, and cron re-audits via Supabase realtime.
                </DevNote>
              </div>
              <select
                className="mb-3 w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-1.5 text-sm"
                value={activityFilter}
                onChange={(e) => {
                  setActivityFilter(e.target.value);
                  showToast(`Activity filtered: ${e.target.value}`, "info");
                }}
              >
                <option value="all">All events</option>
                <option value="audit">Audits</option>
                <option value="email">Emails</option>
                <option value="billing">Billing</option>
                <option value="diff">Diffs</option>
                <option value="cron">Scheduled</option>
              </select>
              <ul className="space-y-3">
                {filteredActivity.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => showToast(`Event detail: ${a.event}`, "info")}
                      className="w-full rounded-lg p-2 text-left text-sm transition hover:bg-surface-overlay"
                    >
                      <p className="text-gray-300">{a.event}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{a.time}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Connect & Scan */}
      {tab === "connect" && (
        <div className="animate-fade-in space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Connect Workflow</h2>
              <DevNote title="Workflow Import">
                Production: Vercel serverless function accepts JSON upload or calls Make/Zapier/n8n API with stored OAuth tokens. Parsed into normalized node graph.
              </DevNote>
            </div>
            <div className="mb-4 flex gap-2">
              {(["upload", "api"] as ConnectMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setConnectMode(mode);
                    showToast(`Import mode: ${mode === "upload" ? "JSON Upload" : "API Pull"}`, "info");
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    connectMode === mode
                      ? "bg-brand-600 text-white"
                      : "border border-surface-border text-gray-400 hover:bg-surface-overlay"
                  }`}
                >
                  {mode === "upload" ? "JSON Upload" : "API Connection"}
                </button>
              ))}
            </div>

            {connectMode === "upload" ? (
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Paste workflow JSON export
                </label>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  rows={12}
                  className="w-full rounded-lg border border-surface-border bg-surface font-mono text-xs text-gray-300 focus:border-brand-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => showToast("Sample JSON loaded from Make.com export.", "info")}
                  className="mt-2 text-sm text-brand-400 hover:underline"
                >
                  Load sample export
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Platform</label>
                  <select
                    value={apiPlatform}
                    onChange={(e) => {
                      setApiPlatform(e.target.value);
                      showToast(`Platform set to ${e.target.value}`, "info");
                    }}
                    className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm"
                  >
                    <option value="make">Make.com</option>
                    <option value="zapier">Zapier</option>
                    <option value="n8n">n8n (self-hosted)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">API Key / Token</label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 font-mono text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Connected! Fetched 4 scenarios from Make.com account.", "success")}
                  className="rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
                >
                  Test Connection
                </button>
              </div>
            )}
          </div>

          <div className="glass rounded-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Run Fragility Scan</h2>
                <DevNote title="Audit Engine">
                  Production: Serverless job queues OpenAI call per node against rubric (error handling, credentials, SPOF, docs). Results stored in Supabase with scores.
                </DevNote>
              </div>
              <span className="text-sm text-gray-500">
                Target: {workflow.name}
              </span>
            </div>

            {scanPhase === "scanning" && (
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-400">Analyzing nodes…</span>
                  <span className="text-brand-400">{scanProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}

            {scanPhase === "complete" && (
              <div className="mb-4 flex items-center gap-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-medium text-emerald-300">Last scan: Jul 8, 2026 at 2:14 PM</p>
                  <p className="text-sm text-gray-400">14 nodes analyzed · 18 issues found · Score: 62/100</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={runScan}
              disabled={scanPhase === "scanning"}
              className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold hover:bg-brand-500 disabled:opacity-50"
            >
              {scanPhase === "scanning" ? "Scanning…" : "Run Fragility Scan"}
            </button>
          </div>
        </div>
      )}

      {/* Scored Report */}
      {tab === "report" && (
        <div className="animate-fade-in space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{workflow.name}</h2>
              <p className="text-sm text-gray-400">{workflow.client} · {workflow.platform} · Audited {workflow.lastAudit}</p>
            </div>
            <div className="flex items-center gap-2">
              <DevNote title="Health Score">
                Production: Weighted composite of category scores. LLM rubric assigns 0-100 per dimension with cited node references.
              </DevNote>
              <select
                className="rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm"
                value={selectedWorkflow}
                onChange={(e) => {
                  setSelectedWorkflow(e.target.value);
                  showToast("Report switched to selected workflow.", "info");
                }}
              >
                {WORKFLOWS.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass flex flex-col items-center justify-center rounded-xl p-8">
              <p className="text-sm text-gray-500">Overall Health Score</p>
              <p className="mt-2 text-6xl font-bold text-amber-400">{workflow.score}</p>
              <p className="mt-1 text-sm text-gray-500">out of 100</p>
              <span className={`mt-3 rounded-full px-3 py-1 text-sm ${statusColors[workflow.status]}`}>
                {workflow.status}
              </span>
              <button
                type="button"
                onClick={() => {
                  setTab("fixes");
                  showToast("Navigated to priority fix list.", "info");
                }}
                className="mt-4 text-sm text-brand-400 hover:underline"
              >
                View 6 open issues →
              </button>
            </div>

            <div className="glass rounded-xl p-6 lg:col-span-2">
              <h3 className="mb-4 font-semibold">Category Breakdown</h3>
              <div className="space-y-4">
                {SCORE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => showToast(`${cat.label}: ${cat.issues} issues — drill-down loaded.`, "info")}
                    className="block w-full text-left"
                  >
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{cat.label}</span>
                      <span className={cat.score < 50 ? "text-red-400" : cat.score < 70 ? "text-amber-400" : "text-emerald-400"}>
                        {cat.score}/{cat.max} · {cat.issues} issues
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-border">
                      <div
                        className={`h-full rounded-full transition-all ${
                          cat.score < 50 ? "bg-red-500" : cat.score < 70 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="mb-4 font-semibold">Node-Level Findings (sample)</h3>
            <div className="space-y-2">
              {[
                { node: "HTTP Request — Step 7", issue: "Hardcoded credential detected", severity: "critical" },
                { node: "Webhook — Step 1", issue: "No error handler configured", severity: "critical" },
                { node: "Filter — Step 5", issue: "Undocumented business logic", severity: "high" },
                { node: "HubSpot CRM — Step 4", issue: "Shared OAuth — single point of failure", severity: "high" },
                { node: "Slack API — Step 11", issue: "Retries disabled on rate-limited endpoint", severity: "medium" },
              ].map((item) => (
                <button
                  key={item.node}
                  type="button"
                  onClick={() => {
                    setTab("fixes");
                    showToast(`Highlighted fix for ${item.node}`, "info");
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-surface-border/50 p-3 text-left text-sm transition hover:bg-surface-overlay"
                >
                  <div>
                    <p className="font-medium">{item.node}</p>
                    <p className="text-gray-500">{item.issue}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${severityColors[item.severity]}`}>
                    {item.severity}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fix List */}
      {tab === "fixes" && (
        <div className="animate-fade-in space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-lg font-semibold">Priority-Ranked Fix List</h2>
            <DevNote title="Fix Recommendations">
              Production: OpenAI generates plain-English explanations per finding, ranked by severity × blast radius. Stored with effort estimates.
            </DevNote>
            <div className="ml-auto flex gap-2">
              {(["all", "open", "resolved"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFixFilter(f);
                    showToast(`Showing ${f} fixes`, "info");
                  }}
                  className={`rounded-lg px-3 py-1.5 text-sm capitalize ${
                    fixFilter === f ? "bg-brand-600 text-white" : "border border-surface-border text-gray-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              {filteredFixes.map((fix) => (
                <button
                  key={fix.id}
                  type="button"
                  onClick={() => {
                    setSelectedFix(fix.id);
                    showToast(`Selected: ${fix.title}`, "info");
                  }}
                  className={`glass w-full rounded-xl p-4 text-left transition hover:border-brand-500/30 ${
                    selectedFix === fix.id ? "border-brand-500/50 ring-1 ring-brand-500/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-overlay text-sm font-bold text-gray-400">
                      {fix.priority}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{fix.title}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${severityColors[fix.severity]}`}>
                          {fix.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{fix.node} · ~{fix.effort}</p>
                      {fix.status === "resolved" && (
                        <span className="mt-1 inline-block text-xs text-emerald-400">✓ Resolved</span>
                      )}
                      {fix.status === "in-progress" && (
                        <span className="mt-1 inline-block text-xs text-amber-400">In progress</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="glass rounded-xl p-6">
              {selectedFix ? (
                (() => {
                  const fix = fixItems.find((f) => f.id === selectedFix);
                  if (!fix) return null;
                  return (
                    <div>
                      <h3 className="text-lg font-semibold">{fix.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{fix.node}</p>
                      <p className="mt-4 leading-relaxed text-gray-300">{fix.explanation}</p>
                      <div className="mt-6 flex gap-3">
                        {fix.status !== "resolved" && (
                          <button
                            type="button"
                            onClick={() => markFixResolved(fix.id)}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
                          >
                            Mark Resolved
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => showToast("Fix copied to clipboard for client email.", "success")}
                          className="rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
                        >
                          Copy for Client
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTab("pdf");
                            showToast("Added to PDF report section.", "info");
                          }}
                          className="rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
                        >
                          Include in PDF
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <p className="text-center text-gray-500">Select a fix to see full explanation</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* White-Label PDF */}
      {tab === "pdf" && (
        <div className="animate-fade-in space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-lg font-semibold">White-Label Settings</h2>
                <DevNote title="PDF Branding">
                  Production: Consultant Pro subscribers set branding in DB. Puppeteer renders HTML template with custom logo URL, colors, footer. Emailed via Resend.
                </DevNote>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Company Name / Logo Text</label>
                  <input
                    type="text"
                    value={wlLogo}
                    onChange={(e) => setWlLogo(e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={wlColor}
                      onChange={(e) => setWlColor(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded border border-surface-border"
                    />
                    <input
                      type="text"
                      value={wlColor}
                      onChange={(e) => setWlColor(e.target.value)}
                      className="flex-1 rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Report Footer</label>
                  <input
                    type="text"
                    value={wlFooter}
                    onChange={(e) => setWlFooter(e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={hideWA}
                    onChange={(e) => setHideWA(e.target.checked)}
                    className="rounded"
                  />
                  Hide &ldquo;Powered by WorkflowAudit&rdquo; branding
                </label>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => showToast("Branding settings saved.", "success")}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500"
                >
                  Save Branding
                </button>
                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
                >
                  Preview PDF
                </button>
                <button
                  type="button"
                  onClick={() => showToast("PDF generated and emailed to sarah@brightpath.io", "success")}
                  className="rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
                >
                  Email to Client
                </button>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="mb-4 text-sm font-medium text-gray-500">Live Preview</h3>
              <div className="rounded-lg border border-gray-700 bg-white p-6 text-gray-900 shadow-xl">
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: wlColor }}>
                  <span className="text-lg font-bold" style={{ color: wlColor }}>{wlLogo}</span>
                  <span className="text-xs text-gray-500">Jul 8, 2026</span>
                </div>
                <h4 className="mt-4 text-xl font-bold">Workflow Health Assessment</h4>
                <p className="text-sm text-gray-600">Lead Capture → HubSpot → Slack</p>
                <p className="text-sm text-gray-600">Prepared for BrightPath Marketing</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 text-2xl font-bold" style={{ borderColor: wlColor, color: wlColor }}>
                    62
                  </div>
                  <div>
                    <p className="font-semibold text-red-600">At Risk</p>
                    <p className="text-sm text-gray-600">6 critical · 4 high · 8 medium</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-semibold">Top Priority Fixes</p>
                  {fixItems.slice(0, 3).map((f) => (
                    <p key={f.id} className="text-xs text-gray-600">
                      {f.priority}. {f.title}
                    </p>
                  ))}
                </div>
                <p className="mt-6 border-t pt-4 text-center text-xs text-gray-500">{wlFooter}</p>
                {!hideWA && (
                  <p className="mt-2 text-center text-[10px] text-gray-400">Powered by WorkflowAudit</p>
                )}
              </div>
            </div>
          </div>

          {showPdfModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowPdfModal(false)}>
              <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-8 text-gray-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">PDF Preview — Full Report</h3>
                  <button type="button" onClick={() => setShowPdfModal(false)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
                </div>
                <p className="mt-4 text-sm text-gray-600">12-page report including executive summary, category scores, node findings, and prioritized remediation plan.</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowPdfModal(false);
                    showToast("PDF downloaded: brightpath-workflow-audit-2026-07-08.pdf", "success");
                  }}
                  className="mt-6 rounded-lg px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: wlColor }}
                >
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Schedule & Diff */}
      {tab === "schedule" && (
        <div className="animate-fade-in space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Scheduled Re-Audit</h2>
              <DevNote title="Cron Re-Audits">
                Production: Vercel Cron weekly pulls latest workflow JSON via API, re-runs audit rubric, diffs against previous snapshot in Supabase, emails diff report.
              </DevNote>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => {
                    setScheduleEnabled(e.target.checked);
                    showToast(e.target.checked ? "Re-audits enabled for this workflow." : "Re-audits paused.", "info");
                  }}
                  className="rounded"
                />
                <span className="text-sm">Enable scheduled re-audits</span>
              </label>
              <select
                value={scheduleFreq}
                onChange={(e) => {
                  setScheduleFreq(e.target.value);
                  showToast(`Schedule set to ${e.target.value}`, "info");
                }}
                disabled={!scheduleEnabled}
                className="rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm disabled:opacity-50"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly (recommended)</option>
                <option value="monthly">Monthly</option>
              </select>
              <span className="text-sm text-gray-500">Next run: Monday, Jul 14, 2026 at 6:00 AM UTC</span>
              <button
                type="button"
                onClick={() => showToast("Manual re-audit triggered — results in ~2 minutes.", "success")}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500"
              >
                Run Re-Audit Now
              </button>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <h2 className="text-lg font-semibold">Diff Report</h2>
              <span className="text-sm text-gray-500">Since last audit: Jul 1, 2026</span>
              <div className="ml-auto flex gap-2">
                {(["all", "added", "modified", "removed"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setDiffFilter(f);
                      showToast(`Diff filter: ${f}`, "info");
                    }}
                    className={`rounded-lg px-3 py-1 text-sm capitalize ${
                      diffFilter === f ? "bg-brand-600 text-white" : "border border-surface-border text-gray-400"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredDiffs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => showToast(`Diff detail: ${d.node} — ${d.type}`, "info")}
                  className="w-full rounded-lg border border-surface-border/50 p-4 text-left transition hover:bg-surface-overlay"
                >
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium uppercase ${
                      d.type === "added" ? "bg-emerald-500/20 text-emerald-400" :
                      d.type === "removed" ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {d.type}
                    </span>
                    <span className="font-medium">{d.node}</span>
                    <span className="ml-auto text-xs text-gray-500">{d.date}</span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded bg-red-500/5 p-2">
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-mono text-xs text-red-300">{d.before}</p>
                    </div>
                    <div className="rounded bg-emerald-500/5 p-2">
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-mono text-xs text-emerald-300">{d.after}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => showToast("Diff report emailed to sarah@brightpath.io and client contact.", "success")}
              className="mt-4 rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
            >
              Email Diff Report
            </button>
          </div>
        </div>
      )}

      {/* Billing */}
      {tab === "billing" && (
        <div className="animate-fade-in space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass rounded-xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-lg font-semibold">Current Plan</h2>
                <DevNote title="Stripe Billing">
                  Production: Stripe Checkout for credits ($9/report) and Consultant Pro subscription ($99/mo). Webhooks update credit balance and plan tier in Supabase.
                </DevNote>
              </div>
              <p className="text-2xl font-bold text-brand-400">Consultant Pro</p>
              <p className="text-sm text-gray-400">$99/month · Unlimited audits + white-label</p>
              <p className="mt-4 text-sm text-gray-500">Renews Aug 1, 2026 · Card •••• 4242</p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => showToast("Stripe billing portal opened in new tab.", "info")}
                  className="rounded-lg border border-surface-border px-4 py-2 text-sm hover:bg-surface-overlay"
                >
                  Manage Subscription
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Plan downgrade scheduled for end of billing period.", "warning")}
                  className="rounded-lg border border-surface-border px-4 py-2 text-sm text-gray-400 hover:bg-surface-overlay"
                >
                  Downgrade
                </button>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="mb-4 text-lg font-semibold">Audit Credits</h2>
              <p className="text-4xl font-bold">{credits}</p>
              <p className="text-sm text-gray-400">credits remaining (rollover from pay-per-report)</p>
              <button
                type="button"
                onClick={() => setShowBuyModal(true)}
                className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500"
              >
                Buy More Credits — $9 each
              </button>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="mb-4 font-semibold">Recent Transactions</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-left text-gray-500">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Jul 8, 2026", desc: "Audit: Lead Capture → HubSpot → Slack", amount: "1 credit", status: "Completed" },
                  { date: "Jul 1, 2026", desc: "Consultant Pro — Monthly", amount: "$99.00", status: "Paid" },
                  { date: "Jun 28, 2026", desc: "Audit: Invoice Sync n8n Pipeline", amount: "1 credit", status: "Completed" },
                  { date: "Jun 15, 2026", desc: "Credit pack (5 audits)", amount: "$45.00", status: "Paid" },
                ].map((row) => (
                  <tr
                    key={row.date + row.desc}
                    className="border-b border-surface-border/50"
                  >
                    <td className="py-3 text-gray-400">{row.date}</td>
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => showToast(`Invoice: ${row.desc}`, "info")}
                        className="hover:text-brand-400"
                      >
                        {row.desc}
                      </button>
                    </td>
                    <td className="py-3">{row.amount}</td>
                    <td className="py-3">
                      <span className="text-emerald-400">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showBuyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowBuyModal(false)}>
              <div className="w-full max-w-md rounded-xl border border-surface-border bg-surface-raised p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold">Buy Audit Credits</h3>
                <p className="mt-2 text-sm text-gray-400">$9 per credit · 1 credit = 1 full workflow audit</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[1, 5, 10].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => buyCredits(n)}
                      className="rounded-lg border border-surface-border p-4 text-center transition hover:border-brand-500/50 hover:bg-brand-600/10"
                    >
                      <p className="text-2xl font-bold">{n}</p>
                      <p className="text-sm text-gray-400">${n * 9}</p>
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setShowBuyModal(false)} className="mt-4 w-full text-sm text-gray-500 hover:text-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
