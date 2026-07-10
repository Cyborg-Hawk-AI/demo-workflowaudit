export const WORKFLOWS = [
  {
    id: "wf-001",
    name: "Lead Capture → HubSpot → Slack",
    platform: "Make.com",
    client: "BrightPath Marketing",
    nodes: 14,
    lastAudit: "2026-07-08",
    score: 62,
    status: "At Risk",
  },
  {
    id: "wf-002",
    name: "Shopify Order Fulfillment",
    platform: "Zapier",
    client: "Oak & Pine Co.",
    nodes: 9,
    lastAudit: "2026-07-03",
    score: 78,
    status: "Fair",
  },
  {
    id: "wf-003",
    name: "Invoice Sync n8n Pipeline",
    platform: "n8n",
    client: "Meridian Accounting",
    nodes: 22,
    lastAudit: "2026-06-28",
    score: 41,
    status: "Critical",
  },
  {
    id: "wf-004",
    name: "Support Ticket Router",
    platform: "Make.com",
    client: "CloudServe SaaS",
    nodes: 11,
    lastAudit: "2026-07-09",
    score: 85,
    status: "Good",
  },
];

export const SCORE_CATEGORIES = [
  { id: "error-handling", label: "Error Handling", score: 45, max: 100, issues: 6 },
  { id: "credentials", label: "Credential Security", score: 38, max: 100, issues: 3 },
  { id: "spof", label: "Single Points of Failure", score: 55, max: 100, issues: 4 },
  { id: "documentation", label: "Documentation", score: 72, max: 100, issues: 2 },
  { id: "modularity", label: "Modularity", score: 68, max: 100, issues: 3 },
];

export const FIX_ITEMS = [
  {
    id: "fix-1",
    priority: 1,
    severity: "critical",
    title: "Hardcoded API key in HTTP module",
    node: "HTTP Request — Step 7",
    explanation:
      "A Stripe secret key is embedded directly in the module URL parameters. Anyone with export access can extract it. Rotate the key immediately and move it to a secure connection.",
    effort: "15 min",
    status: "open",
  },
  {
    id: "fix-2",
    priority: 2,
    severity: "critical",
    title: "No error handler on webhook trigger",
    node: "Webhook — Step 1",
    explanation:
      "When the incoming payload is missing required fields, the workflow fails silently with no notification. Add a router with a fallback path that logs errors and alerts your team.",
    effort: "30 min",
    status: "open",
  },
  {
    id: "fix-3",
    priority: 3,
    severity: "high",
    title: "Single HubSpot connection for all branches",
    node: "HubSpot CRM — Steps 4, 9, 12",
    explanation:
      "Three modules share one OAuth connection. If it expires, the entire downstream pipeline stops. Split into scoped connections or add a health-check sub-scenario.",
    effort: "45 min",
    status: "in-progress",
  },
  {
    id: "fix-4",
    priority: 4,
    severity: "high",
    title: "Undocumented filter logic",
    node: "Filter — Step 5",
    explanation:
      "The filter uses a complex JSONata expression with no inline notes. Future maintainers cannot understand the business rule. Add a sticky note and export a logic summary.",
    effort: "20 min",
    status: "open",
  },
  {
    id: "fix-5",
    priority: 5,
    severity: "medium",
    title: "No retry on rate-limited API call",
    node: "Slack API — Step 11",
    explanation:
      "Slack returns 429 under load but the module has retries disabled. Enable automatic retries with exponential backoff to prevent message loss during peak hours.",
    effort: "10 min",
    status: "open",
  },
  {
    id: "fix-6",
    priority: 6,
    severity: "medium",
    title: "Aggregator timeout too short",
    node: "Array Aggregator — Step 8",
    explanation:
      "The 30-second timeout is shorter than the upstream API's p95 latency. Batches are truncated during slow periods. Increase to 120s or paginate the source.",
    effort: "25 min",
    status: "resolved",
  },
];

export const ACTIVITY_FEED = [
  { id: "a1", time: "2 min ago", event: "Re-audit completed for Lead Capture → HubSpot → Slack", type: "audit" },
  { id: "a2", time: "18 min ago", event: "PDF report emailed to sarah@brightpath.io", type: "email" },
  { id: "a3", time: "1 hr ago", event: "Credit deducted: 1 audit report ($9.00)", type: "billing" },
  { id: "a4", time: "3 hrs ago", event: "Diff detected: 2 nodes modified in Shopify Order Fulfillment", type: "diff" },
  { id: "a5", time: "Yesterday", event: "White-label branding updated for Apex Automations", type: "branding" },
  { id: "a6", time: "Jul 7", event: "Scheduled re-audit ran for 4 subscribed workflows", type: "cron" },
];

export const DIFF_CHANGES = [
  {
    id: "d1",
    type: "modified",
    node: "HTTP Request — Step 7",
    before: "URL: api.stripe.com/v1/charges (key in query string)",
    after: "URL: api.stripe.com/v1/charges (key moved to header — partial fix)",
    date: "2026-07-08",
  },
  {
    id: "d2",
    type: "added",
    node: "Error Handler — Step 1b",
    before: "(none)",
    after: "Router branch added for malformed webhook payloads",
    date: "2026-07-08",
  },
  {
    id: "d3",
    type: "removed",
    node: "Sticky Note — Step 3",
    before: "Note: 'Only process US leads'",
    after: "(deleted)",
    date: "2026-07-07",
  },
  {
    id: "d4",
    type: "modified",
    node: "Slack API — Step 11",
    before: "Retries: disabled",
    after: "Retries: 3 attempts, 5s delay",
    date: "2026-07-05",
  },
];

export const SAMPLE_JSON = `{
  "name": "Lead Capture → HubSpot → Slack",
  "flow": [
    { "id": 1, "module": "webhook:customWebhook", "version": 1 },
    { "id": 2, "module": "tools:setVariable", "version": 1 },
    { "id": 3, "module": "hubspot:createContact", "version": 2 },
    { "id": 7, "module": "http:ActionSendData", "version": 3,
      "parameters": { "url": "https://api.stripe.com/v1/charges?key=sk_live_..." }
    }
  ]
}`;

export const CONSULTANT_PROFILE = {
  name: "Sarah Chen",
  company: "Apex Automations",
  plan: "Consultant Pro",
  credits: 12,
  auditsThisMonth: 28,
  clients: 14,
};

export const WHITE_LABEL = {
  logoText: "Apex Automations",
  primaryColor: "#1a75f5",
  footerText: "Prepared by Apex Automations — Workflow Health Assessment",
  hideWorkflowAudit: true,
};
