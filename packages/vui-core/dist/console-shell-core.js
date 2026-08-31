import { FREE_RAIL_WIDTH } from "./class-variants.js";
import { isRail } from "./shell-layout-core.js";
/**
 * Everything `console-shell` decides, with no framework in it (`PD-227`).
 *
 * **The same shell was being decided three times.** `packages/react/src/console-shell.tsx` (335 code
 * lines), `apps/web/free-vue/src/AppShell.vue` (251) and `apps/web/free-angular/src/app-shell.ts`
 * (290) each independently worked out which group is open, which item is current, whether the rail
 * is showing and how wide the sidebar is. Eight hundred and seventy-six lines answering four
 * questions, so a bug in any of them had to be found and fixed three times, and only the React copy
 * had tests. Vue even named the same concept `openGroups` where React called it `open`, which is
 * what drift looks like before anyone notices.
 *
 * **A renderer owns two pieces of state and its markup. It decides nothing.** Measured before this
 * was written: the whole shell's state is `collapsed` (a boolean) and `open` (a list of labels).
 * Everything else is derived, and derivation is what lives here.
 *
 * **This file must stay framework-free, and that is enforced rather than asked.**
 * `packages/core/scripts/build.mjs` fails the build if a module listed in its `MODULES` picks up a
 * `react`, `vue` or `svelte` import or a `"use client"` directive, which is how `nav-core.ts`,
 * `class-variants.ts` and `shell-layout-core.ts` have stayed portable. Add this file there and the
 * guarantee is checked on every build instead of trusted.
 *
 * The naming convention this establishes: **`<shell>-shell-core.ts` decides, `<shell>-shell.tsx`
 * draws**, one core per shell and one renderer per framework. `odin/engineering/AGENT-SHELLS.md`
 * is the procedure for adding the next one.
 */
/**
 * The rail's width when a full sidebar collapses to icons.
 *
 * **Re-exported, not restated.** The first draft of this file wrote `72` here, and the shipped value
 * is `90` (`class-variants.ts`): an 18px regression on every collapsed layout, against which
 * `RAIL_INSET` and the flyout's anchor offset are both measured. A refactor that changes a number is
 * not a refactor, and the fingerprint was `FREE_RAIL_WIDTH` sitting in the renderer's imports with
 * nothing using it any more.
 */
export const RAIL_WIDTH = FREE_RAIL_WIDTH;
/** A stable DOM id for a group's submenu, so the button can point at the panel it opens. */
export const submenuId = (label) => `submenu-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
/** The current route, compared exactly. A prefix match would light two items at once. */
export const isCurrent = (pathname, href) => pathname === href;
/** A group is active when it is the current route or holds it. */
export const holdsCurrent = (entry, pathname) => entry.href === pathname || (entry.children ?? []).some((child) => child.href === pathname);
/**
 * Which groups start open: every group holding the current route.
 *
 * Computed rather than remembered, so a deep link opens the right group on the first paint. The
 * static export never hydrates, so anything decided in an effect is decided too late there.
 */
export function initialOpen(nav, pathname) {
    // **Every** holder, not the first. The first draft used `.find()`, which silently narrowed the
    // behaviour it was extracted from: two groups can link the same child href, and the shipped code
    // opened both. A test fixture without that shape cannot tell `find` from `filter`, so there is one
    // below that has it.
    return nav.flatMap((group) => group.entries
        .filter((entry) => entry.children?.some((child) => child.href === pathname))
        .map((entry) => entry.label));
}
/** Open a closed group, close an open one. Returns a new list; the caller stores it. */
export function toggleGroup(open, label) {
    return open.includes(label) ? open.filter((l) => l !== label) : [...open, label];
}
/** Whether a group's submenu is open. */
export const isExpanded = (open, label) => open.includes(label);
/**
 * The sidebar is showing icons only, either because the layout is a rail or because it is collapsed.
 *
 * Two different causes, one visual result, and the renderers each worked this out separately.
 */
export const isRailShowing = (layout, collapsed) => isRail(layout) || collapsed;
/** The sidebar's width in pixels for the current layout and state. */
export function sidebarWidth(layout, collapsed) {
    if (isRail(layout))
        return layout.width;
    return collapsed ? RAIL_WIDTH : layout.width;
}
