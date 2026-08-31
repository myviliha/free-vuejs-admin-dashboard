/**
 * Where a floating panel goes, given the trigger's rectangle (`PD-049`).
 *
 * **This arithmetic was written twice before it was shared, and the second copy is what moved it
 * here.** React's `dropdown-menu.tsx` measures the trigger and sets `top` plus either `left` or
 * `right`; its comment records exactly why, and it is the kind of reason that should not have to be
 * rediscovered per edition:
 *
 * > Rendered in place it was clipped by any scrolling ancestor (a form's scroll region, a section
 * > card) and sat under the slide-over, so it was either invisible or unclickable exactly where it
 * > mattered.
 *
 * So the panel is fixed-positioned against the viewport, and this is the sum that puts it there.
 * Framework-free on purpose: it takes a rectangle and the viewport size and returns numbers, so a
 * React effect, a Vue watcher and an Angular signal can each call it without any of them owning it.
 *
 * `align: "end"` anchors the panel's right edge to the trigger's right, which is what a toolbar
 * button at the end of a row needs; `"start"` anchors left to left.
 */
export interface AnchorRect {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
}
export interface AnchorViewport {
    readonly width: number;
    readonly height: number;
}
/**
 * The default gap between the trigger and the panel, in pixels. React's is 4 and this is that 4.
 *
 * A caller can pass its own via `options.gap`. Four is right for a menu hanging off a toolbar button
 * inside a page; it is wrong for a control in a fixed header, where the panel is expected to start
 * at the header's own bottom edge rather than partway up it. That distance is a property of the
 * chrome and not of this function, so the chrome supplies it.
 */
export declare const ANCHOR_GAP = 4;
export interface AnchorPosition {
    readonly top: number;
    readonly left?: number;
    readonly right?: number;
    /** Which side of the trigger the panel ended up on, for `data-side` and its slide-in animation. */
    readonly side: "top" | "bottom" | "left" | "right";
}
/**
 * Place a panel below the trigger, or above it when below does not fit.
 *
 * **The flip needs the panel's height, and a caller who does not know it yet passes 0.** That is not
 * a placeholder for laziness: on the first frame the panel has not been laid out, so its height is
 * genuinely unknown, and guessing one would flip a panel that had no need to flip. With 0 the answer
 * is "below", which is where it would have gone anyway, and the second pass corrects it once the
 * element can measure itself.
 */
export declare function anchorPosition(trigger: AnchorRect, viewport: AnchorViewport, options?: {
    align?: "start" | "end";
    /**
     * Which side of the trigger the panel wants. `"bottom"` is a menu under a toolbar button;
     * `"right"` is a flyout beside a control in a vertical rail, which is the collapsed sidebar.
     *
     * **Added because a rail had no way to show a submenu at all.** The free demo's collapsed sidebar
     * is 90px wide, so its groups rendered no submenu on the reasoning that there was no room for one,
     * which is true of a panel *inside* the column and irrelevant to a panel beside it. Seven of ten
     * rows were buttons that toggled state nothing rendered from (`PD-116`).
     */
    placement?: "bottom" | "right";
    panelHeight?: number;
    /** Needed only by `placement: "right"`, to decide whether the panel fits on that side. */
    panelWidth?: number;
    gap?: number;
}): AnchorPosition;
