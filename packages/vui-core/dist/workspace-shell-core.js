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
export const SIDEBAR_MIN_WIDTH = 200;
export const SIDEBAR_MAX_WIDTH = 420;
export const SIDEBAR_DEFAULT_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 60;
export const COLLAPSED_GROUP_MODES = [
    "inline",
    "flyout-click",
    "flyout-hover",
];
/** The default when nothing valid is configured. */
export const DEFAULT_COLLAPSED_GROUP_MODE = "flyout-hover";
/**
 * Read a configured mode, falling back rather than throwing.
 *
 * Takes the raw value instead of reading `process.env` itself: this module ships through
 * `@viliha/vui-core` to editions that are not Next apps, and a core that reaches for an environment
 * variable is a core that only works in one of them.
 */
export function collapsedGroupMode(raw) {
    return COLLAPSED_GROUP_MODES.includes(raw ?? "")
        ? raw
        : DEFAULT_COLLAPSED_GROUP_MODE;
}
/** Whether a collapsed group opens as a panel rather than expanding in place. */
export const usesFlyout = (collapsed, mode) => collapsed && mode !== "inline";
/**
 * The current route, by prefix.
 *
 * **Deliberately not `console-shell`'s exact match.** This shell's routes nest: a record's detail
 * page lives under its list, and an exact comparison leaves the sidebar showing no selection at all
 * on every detail screen. `/` is special-cased because every path is prefixed by it.
 */
export function isCurrent(pathname, href) {
    if (href === "/")
        return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}
/**
 * An entry with children, as opposed to a plain link.
 *
 * The workspace nav is a union: `NavLinkData` has an `href`, `NavGroupData` has `children`. The
 * console shell's `FreeNavEntry` carries both optionally, which is the third way these two shells
 * differ in shape and another reason they do not share a core.
 */
export const isGroup = (entry) => Array.isArray(entry.children) && entry.children.length > 0;
/** A group is current when any of its children is. */
export const holdsCurrent = (entry, pathname) => (entry.children ?? []).some((child) => child.href !== undefined && isCurrent(pathname, child.href));
/**
 * Which groups start open: every group holding the current route.
 *
 * Computed rather than remembered, so a deep link opens the right group in the first paint. Returns
 * a `Set` because that is what the renderer holds, and converting on every read would be a cost paid
 * per row.
 */
export function initialOpen(nav, pathname) {
    const open = new Set();
    for (const section of nav) {
        for (const entry of section.items) {
            if (holdsCurrent(entry, pathname))
                open.add(entry.label);
        }
    }
    return open;
}
/**
 * Open a closed group, close an open one, and respect the mode.
 *
 * A flyout shows one at a time: opening a second closes the first, which is how a menu behaves.
 * Inline lets several stay open, matching the expanded rail. Returns a new `Set` so a renderer
 * holding it in framework state re-renders.
 */
export function toggleGroup(open, label, flyout) {
    if (flyout)
        return open.has(label) ? new Set() : new Set([label]);
    const next = new Set(open);
    if (next.has(label))
        next.delete(label);
    else
        next.add(label);
    return next;
}
/** Whether a group's children are showing. */
export const isExpanded = (open, label) => open.has(label);
/** A dragged width, held inside the bounds. */
export const clampWidth = (px) => Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, px));
/**
 * A width restored from storage, or `null` when it is not usable.
 *
 * `null` rather than the default, so a caller can tell "nothing saved" from "saved and out of
 * range" if it ever needs to. `Number("")` is `0` and `Number(null)` is `0`, both of which fail the
 * bounds check, so a missing key needs no separate branch.
 */
export function storedWidth(raw) {
    const px = Number(raw);
    return px >= SIDEBAR_MIN_WIDTH && px <= SIDEBAR_MAX_WIDTH ? px : null;
}
/** The sidebar's rendered width for the current state. */
export const sidebarWidth = (width, collapsed) => collapsed ? SIDEBAR_COLLAPSED_WIDTH : width;
