// DATA LAYER (API) — a large users table with SERVER-SIDE pagination.
//
// **It lives here so both editions' Users screen reads the same 10,000 rows through the same fetcher.**
// It was `apps/web/reactjs/lib/api/users.ts` with one consumer. `USERS_SCREEN` is the only record screen
// that is server-paginated rather than fixture-backed, and an edition cannot honour that from a spec
// alone: it needs the fetcher itself. It never imported React, so the move is a move.
//
// The point of this page: a table with far more rows than you'd ever send to
// the browser. Only ONE page (≤ MAX_PAGE_SIZE rows) is ever returned; the
// client never holds the whole table. `listUsers` maps 1:1 onto a real
// endpoint — swap the body for `fetch("/api/users?" + params, { signal })` and
// the ServerQuery fields become query params. Nothing above this file changes.
//
// ponytail: 10k rows generated in memory stand in for a million-row backend so
// search/sort/filter stay instant in the demo; a real DB does the same query
// over millions. Generating a literal 1M array client-side would jank the
// browser — which is exactly why pagination lives on the server.
import { ROLES, STATUSES, TEAMS } from "./demo-user-options-core.js";
export { ROLES, STATUSES, TEAMS } from "./demo-user-options-core.js";
// The hard ceiling the server enforces. Read here (not just in the UI) because a
// client can request any pageSize — the API must clamp it. Matches
// NEXT_PUBLIC_MAX_PAGE_SIZE so the selector and the server agree.
//
// **`process` is guarded because this module is no longer Next-only.** Vite does not define `process`
// in a browser bundle, so an unguarded `process.env` throws `process is not defined` and takes the whole
// Vue Users screen down on first paint.
//
// The guard is `typeof process` and not `import.meta.env`, which was the first attempt: `packages/react`
// type-checks against a CommonJS target, where `import.meta` is an error (TS1470).
//
// **So the Vue edition can never see this variable, and the two editions agree only while it is unset.**
// Unset is the case today (`apps/web/reactjs` has `.env.example` and `.env.local.example` and no `.env`),
// so both clamp at 100 and the demos page identically. Set it to 250 and they stop agreeing, and
// `RecordView` reads the same variable through a *different* expression again, so React's page-size
// selector and this clamp can disagree with each other too. Raised in review, recorded as `Q-VP-5`
// rather than fixed here: the fix is to pass the ceiling in rather than read the environment twice, and
// that is a change to a shared component's contract.
// **Read through `globalThis` rather than the bare `process` identifier.** The runtime guard was
// already right; the *type* was not. `packages/core` is generated from this file and deliberately has
// no `@types/node`, being framework-free, so a bare `process` is an unknown name there and
// `check-types` fails. Turbo had a stale cache hiding that, which is why it went unnoticed: the
// generated `src/` is not part of the task's cache key, so a pass recorded before this module joined
// core kept being replayed. `globalThis` needs no ambient types and keeps the same guard.
const MAX_PAGE_SIZE = (() => {
    const env = globalThis.process
        ?.env;
    const n = Number(env?.NEXT_PUBLIC_MAX_PAGE_SIZE);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 100;
})();
const FIRST = [
    "Ava",
    "Haruto",
    "Lena",
    "Chidi",
    "Mia",
    "Noah",
    "Sofia",
    "Omar",
    "Isla",
    "Diego",
    "Yuki",
    "Priya",
];
const LAST = [
    "Nguyen",
    "Okafor",
    "Muller",
    "Santos",
    "Kim",
    "Rossi",
    "Haddad",
    "Novak",
    "Costa",
    "Reyes",
    "Aziz",
    "Blum",
];
const TOTAL = 10_000;
// The "table" — generated once, deterministically (no Math.random, so every
// render is identical). Stands in for the database.
const ALL = Array.from({ length: TOTAL }, (_, i) => {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 7) % LAST.length];
    return {
        id: i + 1,
        name: `${first} ${last}`,
        email: `${first}.${last}${i + 1}@example.com`.toLowerCase(),
        role: ROLES[i % ROLES.length],
        team: TEAMS[i % TEAMS.length],
        status: STATUSES[i % STATUSES.length],
        createdAt: new Date(2020, 0, 1 + ((i * 13) % 1600)).toISOString().slice(0, 10),
    };
});
// Soft-deleted user ids. A real backend stores a `deleted_at`; here a Set stands
// in. Seeded so the Trash view isn't empty. The `trash: true` query returns only
// these; the live query excludes them.
const trashedIds = new Set([3, 8, 21]);
/** Restore soft-deleted users (RecordView's `onRestore`). Refetch shows them
 *  back in Live and gone from Trash. */
export function restoreUsers(ids) {
    for (const id of ids)
        trashedIds.delete(Number(id));
}
/**
 * Fetch one page. Filters + sorts + paginates server-side and returns just that
 * page plus the true total. `pageSize` is clamped to MAX_PAGE_SIZE — the client
 * can't pull a bigger page than allowed. `q.trash` returns soft-deleted users
 * instead of live ones.
 */
export function listUsers(q, signal) {
    const pageSize = Math.min(Math.max(1, q.pageSize), MAX_PAGE_SIZE);
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => {
            // Trash view returns only soft-deleted rows; live excludes them.
            let out = q.trash
                ? ALL.filter((u) => trashedIds.has(u.id))
                : ALL.filter((u) => !trashedIds.has(u.id));
            const search = q.search.trim().toLowerCase();
            if (search) {
                out = out.filter((u) => [u.name, u.email, u.role, u.team].some((v) => v.toLowerCase().includes(search)));
            }
            const status = q.filters.status;
            if (typeof status === "string" && status) {
                out = out.filter((u) => u.status === status);
            }
            const team = q.filters.team;
            if (typeof team === "string" && team) {
                out = out.filter((u) => u.team === team);
            }
            const role = q.filters.role;
            if (typeof role === "string" && role) {
                out = out.filter((u) => u.role === role);
            }
            if (q.sort) {
                const { key, dir } = q.sort;
                out = [...out].sort((a, b) => {
                    const av = a[key];
                    const bv = b[key];
                    const cmp = typeof av === "number" && typeof bv === "number"
                        ? av - bv
                        : String(av ?? "").localeCompare(String(bv ?? ""));
                    return dir === "asc" ? cmp : -cmp;
                });
            }
            const total = out.length;
            const start = (q.page - 1) * pageSize;
            resolve({ rows: out.slice(start, start + pageSize), total });
        }, 300); // simulated latency; a real fetch() has its own
        signal.addEventListener("abort", () => {
            clearTimeout(t);
            reject(new DOMException("Aborted", "AbortError"));
        });
    });
}
