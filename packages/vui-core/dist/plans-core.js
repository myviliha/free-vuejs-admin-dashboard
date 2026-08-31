/**
 * The pricing plans, shared because every edition renders them.
 *
 * The documentation's free-and-pro page, the React pricing screen and the Vue one all read this. It
 * lived in `@repo/web-chrome` until 2026-08-23, which is a React package, so the Vue pricing screen
 * would have had to import React or retype a price list. Two copies of a price list is the one
 * duplication nobody notices until a customer does, and `@repo/web-chrome/plans` re-exports this so
 * no existing consumer had to move.
 *
 * Framework-free by construction, which it already was: this file has never had an import.
 */
// What is free and what is Pro, in one place.
//
// The docs, the pricing page and the demo all render this, so there is one
// answer to "do I have to pay for X?" rather than three that drift.
//
// The rule behind the data: **every version already published stays MIT.**
// Nothing is withdrawn retroactively, because nothing can be: `@viliha/vui-react`
// 1.66 and everything before it is on npm under MIT permanently, and that is
// true whatever this table says tomorrow.
//
// What the table does say, from 2026-08-17: **the record workflow is Pro.**
// `RecordView` (server-backed paging, typed filters, bulk actions, the inline
// record form, import and export) is the paid component, and the free package
// ships `DataTable` in its place: the same job for data you already hold in
// memory. That is a change from what this file said before, it is a promise we
// had made in as many words, and the docs say so rather than quietly restating
// the new position. The ruling is `PD-006` in `odin/PRODUCT.md`.
export const PLAN_MATRIX = [
    // Theme
    {
        area: "Theme",
        item: "Design tokens, dark mode, z-scale",
        plan: "free",
        note: "129 CSS variables, MIT, in every framework",
    },
    {
        area: "Theme",
        item: "Runtime theming and per-tenant brand",
        plan: "free",
        note: "ThemeConfigProvider plus @viliha/vui-core",
    },
    {
        area: "Theme",
        item: "Motion and icon-chip tokens",
        plan: "free",
        note: "Retune or switch off, see /docs/swapping",
    },
    // Layout
    {
        area: "Layout",
        item: "App shell: sidebar, top bar, open tabs",
        plan: "free",
        note: "Scaffolded by npx @viliha/vui-react init",
    },
    {
        area: "Layout",
        item: "All five page types",
        plan: "free",
        note: "Dashboard, settings, board, and the list page on DataTable",
    },
    {
        area: "Layout",
        item: "Auth, legal and error screens",
        plan: "free",
        note: "Sign in, sign up, reset, terms, 404, 500",
    },
    {
        area: "Layout",
        item: "The starter marketing site",
        plan: "free",
        note: "65 pages in apps/website, composed entirely from blocks",
    },
    {
        area: "Layout",
        item: "Page kits per vertical",
        plan: "pro",
        note: "Planned: SaaS, agency and e-commerce sets, ready to fill in",
    },
    {
        area: "Layout",
        item: "Command palette and global search",
        plan: "free",
        note: "⌘K and ⌘⌥K, wired to the nav config",
    },
    // Components
    {
        area: "Components",
        item: "Every React component except the record workflow",
        plan: "free",
        note: "70-odd components: forms, overlays, navigation, charts, the app shell",
    },
    {
        area: "Components",
        item: "DataTable, the data table",
        plan: "free",
        note: "Sort, search, paginate, select and hide columns, over an array",
    },
    {
        area: "Components",
        item: "RecordView, the record workflow",
        plan: "pro",
        note: "Server-backed paging and filters, bulk actions, inline record form",
    },
    {
        area: "Components",
        item: "Vue components",
        plan: "free",
        note: "@viliha/vui-vue, growing; see /docs/frameworks",
    },
    {
        area: "Components",
        item: "Charts",
        plan: "free",
        note: "Recharts in React, TanStack Charts across frameworks",
    },
    {
        area: "Components",
        item: "Website blocks",
        plan: "free",
        note: "60 marketing blocks in @viliha/vui-blocks: hero, pricing, FAQ, footer",
    },
    {
        area: "Components",
        item: "WordPress block theme",
        plan: "pro",
        note: "theme.json and 15 patterns generated from the same tokens; see /docs/wordpress",
    },
    {
        area: "Components",
        item: "WordPress admin skin",
        plan: "pro",
        note: "Planned. Restyles wp-admin; headless against the REST API works today",
    },
    {
        area: "Components",
        item: "Data table for Vue and Svelte",
        plan: "free",
        note: "Planned. The free React DataTable, ported. @viliha/vui-vue has no table yet",
    },
    {
        area: "Components",
        item: "Record workflow for Vue and Svelte",
        plan: "pro",
        note: "Planned. Parity with RecordView, which is months of work per framework",
    },
    {
        area: "Components",
        item: "Premium blocks",
        plan: "pro",
        note: "Planned: billing, roles and permissions, audit log, inbox",
    },
    // Data
    {
        area: "Data",
        item: "Import and export, the engine",
        plan: "free",
        note: "CSV, JSON, Excel and print in @viliha/vui-core, no dependencies",
    },
    {
        area: "Data",
        item: "Import and export, wired into the table",
        plan: "pro",
        note: "The toolbar, the column mapping and the preview, all part of RecordView",
    },
    {
        area: "Data",
        item: "Mock API and controller pattern",
        plan: "free",
        note: "The three-layer architecture the demo uses",
    },
    // Tooling
    {
        area: "Tooling",
        item: "The init scaffolder",
        plan: "free",
        note: "Next.js and Turborepo, fresh or existing",
    },
    {
        area: "Tooling",
        item: "The MCP server",
        plan: "free",
        note: "Ten tools, so an agent can query the library and compose a page",
    },
    {
        area: "Tooling",
        item: "End-to-end test suite",
        plan: "free",
        note: "Playwright specs for both apps, in apps/e2e",
    },
    {
        area: "Tooling",
        item: "Requirement templates",
        plan: "free",
        note: "Ten markdown briefs at /docs/templates",
    },
    // Support
    {
        area: "Support",
        item: "Issues and discussions",
        plan: "free",
        note: "Best effort, in the open",
    },
    {
        area: "Support",
        item: "Priority support and a commercial licence",
        plan: "pro",
        note: "Planned. An invoice and a named counterparty",
    },
    {
        area: "Support",
        item: "Managed hosting",
        plan: "pro",
        note: "Planned. A service, so it is the one thing that cannot be forked",
    },
];
export const PLAN_LABEL = { free: "Free", pro: "Pro" };
/**
 * The one-sentence promise, quoted in the docs, the README and the demo.
 *
 * It used to end "so nothing free today can move behind the paywall later", and on 2026-08-17
 * `RecordView` did exactly that. The half of the promise that is enforceable by npm rather than by
 * us is the half that survives, and it is the half worth making: what you installed is yours.
 * Overstating it once is why this constant now says less and means it.
 */
export const PLAN_PLEDGE = "Every version already published is MIT permanently, so anything you have installed stays yours under the licence it shipped with, forever, including RecordView up to 1.66. What changes is where new work goes.";
export const PLAN_AREAS = [...new Set(PLAN_MATRIX.map((e) => e.area))];
export function planCounts() {
    return PLAN_MATRIX.reduce((acc, e) => ({ ...acc, [e.plan]: acc[e.plan] + 1 }), {
        free: 0,
        pro: 0,
    });
}
