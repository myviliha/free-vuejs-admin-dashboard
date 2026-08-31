import type { FreeNavEntry, FreeNavGroup } from "./nav-core.js";
import { type ShellLayout } from "./shell-layout-core.js";
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
export declare const RAIL_WIDTH = 90;
/**
 * The whole of a console shell's state.
 *
 * Two fields, which is the finding that made this extraction worth doing: a renderer holding only
 * these two can ask this module every other question.
 */
export interface ConsoleShellState {
    /** The sidebar is collapsed to its rail. */
    readonly collapsed: boolean;
    /** Labels of the groups whose submenu is open. */
    readonly open: readonly string[];
}
/** A stable DOM id for a group's submenu, so the button can point at the panel it opens. */
export declare const submenuId: (label: string) => string;
/** The current route, compared exactly. A prefix match would light two items at once. */
export declare const isCurrent: (pathname: string, href: string) => boolean;
/** A group is active when it is the current route or holds it. */
export declare const holdsCurrent: (entry: FreeNavEntry, pathname: string) => boolean;
/**
 * Which groups start open: every group holding the current route.
 *
 * Computed rather than remembered, so a deep link opens the right group on the first paint. The
 * static export never hydrates, so anything decided in an effect is decided too late there.
 */
export declare function initialOpen(nav: readonly FreeNavGroup[], pathname: string): readonly string[];
/** Open a closed group, close an open one. Returns a new list; the caller stores it. */
export declare function toggleGroup(open: readonly string[], label: string): readonly string[];
/** Whether a group's submenu is open. */
export declare const isExpanded: (open: readonly string[], label: string) => boolean;
/**
 * The sidebar is showing icons only, either because the layout is a rail or because it is collapsed.
 *
 * Two different causes, one visual result, and the renderers each worked this out separately.
 */
export declare const isRailShowing: (layout: ShellLayout, collapsed: boolean) => boolean;
/** The sidebar's width in pixels for the current layout and state. */
export declare function sidebarWidth(layout: ShellLayout, collapsed: boolean): number;
