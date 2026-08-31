/**
 * The nav shape this core needs, stated structurally rather than imported.
 *
 * **There are four nav vocabularies in this repository**: `nav-core.ts`'s `NavSectionData`, the same
 * file's `FreeNavGroup` for the console shell, `@repo/web-chrome/nav-config`'s `NavSection`, and the
 * app-level re-export of it. They describe the same thing and are not assignable to each other.
 *
 * **The claim here is about entries, not sections.** A link and an entry from any of the four
 * satisfy the shapes below; the *section wrapper* does not, because this shell's is `{ items }` and
 * the console's is `{ entries }`. Worth stating precisely: an earlier draft of this comment said
 * every existing shape satisfies it, which would send a porter to pass `FREE_NAV` here and find it
 * rejected.
 *
 * A framework-free core has no business picking one. It needs a label, an optional href and optional
 * children, so that is what it asks for, and every existing shape satisfies it. Unifying the four is
 * real work and its own change; making this core depend on the outcome would block it behind that.
 */
export interface ShellNavLink {
    readonly label: string;
    readonly href?: string;
}
export interface ShellNavEntry extends ShellNavLink {
    readonly children?: readonly ShellNavLink[];
}
export interface ShellNavSection {
    readonly items: readonly ShellNavEntry[];
}
/**
 * Everything `workspace-shell` decides, with no framework in it (`PD-231`).
 *
 * The second core, following the convention `PD-227` set: **`<shell>-shell-core.ts` decides,
 * `<shell>-shell.tsx` draws**, one core per shell and one renderer per framework, with
 * `odin/engineering/AGENT-SHELLS.md` as the procedure.
 *
 * ## Why there is no shared core above this one
 *
 * The plan was a `shell-core.ts` abstract top holding what both shells agree on, and the state names
 * suggested there was plenty: both have `collapsed` and both track which groups are open. Reading
 * the two implementations, the agreement is almost entirely in the names.
 *
 * - **`isCurrent` differs, and both are right.** `console-shell` compares exactly; this one treats a
 *   route as current when the pathname is a *prefix* of it. On `/records/people/123` the console
 *   shell highlights nothing and this one highlights the parent, which is correct for each: this
 *   shell has nested record routes, and the demo's are flat.
 * - **`toggleGroup` differs.** The console's always allows several open at once. This one depends on
 *   the collapsed group mode: a flyout shows one group at a time like a menu, inline behaves like
 *   the expanded rail.
 * - **The open set is a `Set` here and an array there**, which is the same concept in a third shape.
 *
 * What is genuinely identical is `submenuId`, and an abstract base holding one string function is
 * the speculative generality `E-03` forbids. Two cores that share a naming convention and nothing
 * else is the honest shape, and the third shell will say whether that stays true.
 */
/** Resize bounds, in pixels. The rail is what a collapsed sidebar becomes. */
export declare const SIDEBAR_MIN_WIDTH = 200;
export declare const SIDEBAR_MAX_WIDTH = 420;
export declare const SIDEBAR_DEFAULT_WIDTH = 240;
export declare const SIDEBAR_COLLAPSED_WIDTH = 60;
/**
 * How a collapsed group reveals its children.
 *
 * `inline` expands in place and lets several stay open; the two flyout modes open a panel beside the
 * rail and show one at a time, because a menu that keeps every submenu open is not a menu.
 */
export type CollapsedGroupMode = "inline" | "flyout-click" | "flyout-hover";
export declare const COLLAPSED_GROUP_MODES: readonly CollapsedGroupMode[];
/** The default when nothing valid is configured. */
export declare const DEFAULT_COLLAPSED_GROUP_MODE: CollapsedGroupMode;
/**
 * Read a configured mode, falling back rather than throwing.
 *
 * Takes the raw value instead of reading `process.env` itself: this module ships through
 * `@viliha/vui-core` to editions that are not Next apps, and a core that reaches for an environment
 * variable is a core that only works in one of them.
 */
export declare function collapsedGroupMode(raw: string | undefined): CollapsedGroupMode;
/** Whether a collapsed group opens as a panel rather than expanding in place. */
export declare const usesFlyout: (collapsed: boolean, mode: CollapsedGroupMode) => boolean;
/**
 * The current route, by prefix.
 *
 * **Deliberately not `console-shell`'s exact match.** This shell's routes nest: a record's detail
 * page lives under its list, and an exact comparison leaves the sidebar showing no selection at all
 * on every detail screen. `/` is special-cased because every path is prefixed by it.
 */
export declare function isCurrent(pathname: string, href: string): boolean;
/**
 * An entry with children, as opposed to a plain link.
 *
 * The workspace nav is a union: `NavLinkData` has an `href`, `NavGroupData` has `children`. The
 * console shell's `FreeNavEntry` carries both optionally, which is the third way these two shells
 * differ in shape and another reason they do not share a core.
 */
export declare const isGroup: (entry: ShellNavEntry) => boolean;
/** A group is current when any of its children is. */
export declare const holdsCurrent: (entry: ShellNavEntry, pathname: string) => boolean;
/**
 * Which groups start open: every group holding the current route.
 *
 * Computed rather than remembered, so a deep link opens the right group in the first paint. Returns
 * a `Set` because that is what the renderer holds, and converting on every read would be a cost paid
 * per row.
 */
export declare function initialOpen(nav: readonly ShellNavSection[], pathname: string): Set<string>;
/**
 * Open a closed group, close an open one, and respect the mode.
 *
 * A flyout shows one at a time: opening a second closes the first, which is how a menu behaves.
 * Inline lets several stay open, matching the expanded rail. Returns a new `Set` so a renderer
 * holding it in framework state re-renders.
 */
export declare function toggleGroup(open: ReadonlySet<string>, label: string, flyout: boolean): Set<string>;
/** Whether a group's children are showing. */
export declare const isExpanded: (open: ReadonlySet<string>, label: string) => boolean;
/** A dragged width, held inside the bounds. */
export declare const clampWidth: (px: number) => number;
/**
 * A width restored from storage, or `null` when it is not usable.
 *
 * `null` rather than the default, so a caller can tell "nothing saved" from "saved and out of
 * range" if it ever needs to. `Number("")` is `0` and `Number(null)` is `0`, both of which fail the
 * bounds check, so a missing key needs no separate branch.
 */
export declare function storedWidth(raw: string | null): number | null;
/** The sidebar's rendered width for the current state. */
export declare const sidebarWidth: (width: number, collapsed: boolean) => number;
