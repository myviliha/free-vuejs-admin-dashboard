// DATA LAYER (API) — the only place that talks to the "backend".
//
// Moved here from `apps/web/reactjs/lib/api/` so both editions read one store. It was already
// framework-free by design, as the note below says, so the move is a change of address rather than
// a rewrite: Vue's composable and React's hook are two controllers over the same data.
//
// Three-layer architecture (see odin/engineering/AGENT-VUI.md → "Architecture: three layers"):
//   data (this file)  →  controller (use-notifications.ts)  →  presentation.
// No React in here, and nothing above it touches raw data.
//
// In-memory mock today. To wire a real API, swap the function bodies for
// `fetch(url, { signal })`; the signatures do not change, so the bell, the
// popup and the page all keep working.
const now = Date.now();
const minutes = (n) => new Date(now - n * 60_000).toISOString();
let rows = [
    {
        id: 1,
        kind: "mention",
        actor: "Priya Raman",
        message: "mentioned you in Acme Retail: can you confirm the billing address before we invoice?",
        at: minutes(4),
        read: false,
        href: "/organizations",
        meta: "Organizations · 2 replies",
    },
    {
        id: 2,
        kind: "assignment",
        actor: "Daniel Osei",
        message: "assigned you the ticket “Export fails for tenants with 10k+ rows”.",
        at: minutes(38),
        read: false,
        href: "/support",
        meta: "Support · High priority",
    },
    {
        id: 3,
        kind: "billing",
        actor: "Billing",
        message: "Invoice #1043 for the Growth plan was paid.",
        at: minutes(190),
        read: false,
        meta: "$149.00 · Visa ending 4242",
    },
    {
        id: 4,
        kind: "comment",
        actor: "Mei Lin",
        message: "commented on the Q3 pipeline review: “moving Northwind to closed-won today.”",
        at: minutes(430),
        read: true,
        href: "/crm/opportunities",
        meta: "Opportunities",
    },
    {
        id: 5,
        kind: "system",
        actor: "System",
        message: "Two new members joined the Platform team.",
        at: minutes(1_500),
        read: true,
        href: "/users",
        meta: "Users",
    },
    {
        id: 6,
        kind: "mention",
        actor: "Tomás Herrera",
        message: "mentioned you in Branches: the Lisbon office opening date moved to 14 September.",
        at: minutes(2_900),
        read: true,
        href: "/branches",
        meta: "Branches",
    },
    {
        id: 7,
        kind: "system",
        actor: "System",
        message: "Your export of 4,120 organizations finished and is ready to download.",
        at: minutes(4_400),
        read: true,
        meta: "Export · CSV",
    },
];
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
/** Subscribe to changes, so the bell and an open page agree on the count. */
export function subscribeNotifications(listener) {
    listeners.add(listener);
    return () => void listeners.delete(listener);
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
export async function listNotifications() {
    await wait(180); // stand-in for the network, so loading states are visible
    return rows.map((r) => ({ ...r }));
}
export async function markRead(id) {
    rows = rows.map((r) => (r.id === id ? { ...r, read: true } : r));
    emit();
}
export async function markAllRead() {
    rows = rows.map((r) => (r.read ? r : { ...r, read: true }));
    emit();
}
export function unreadCount(items) {
    return items.reduce((n, r) => n + (r.read ? 0 : 1), 0);
}
/** The filter chips both editions show, in the order both show them. */
export const NOTIFICATION_FILTERS = [
    { id: "all", label: "All" },
    { id: "mention", label: "Mentions" },
    { id: "assignment", label: "Assigned" },
    { id: "system", label: "System" },
];
/** Pure, so the two controllers cannot disagree about what a filter means. */
export function filterNotifications(items, filter) {
    return filter === "all" ? [...items] : items.filter((n) => n.kind === filter);
}
/** "now", "5m", "3h", "2d", "6w". `now` is a parameter so a test can pin it. */
export function relativeTime(iso, now = Date.now()) {
    const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
    if (seconds < 60)
        return "now";
    const minutes = Math.round(seconds / 60);
    if (minutes < 60)
        return `${minutes}m`;
    const hours = Math.round(minutes / 60);
    if (hours < 24)
        return `${hours}h`;
    const days = Math.round(hours / 24);
    if (days < 7)
        return `${days}d`;
    return `${Math.round(days / 7)}w`;
}
