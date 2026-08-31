/**
 * The six shell layouts, as data.
 *
 * **Why data and not six components.** The dev asked for TailAdmin's `layout-one`..`layout-six` in
 * every edition, free and pro. Six React components would have to be written six more times for Vue,
 * Angular and the HTML edition, and the second port is where they start to disagree. What actually
 * differs between the six is a handful of independent choices about the sidebar and the header, so
 * that is what this module holds: each edition renders the same eight fields its own way, and a
 * seventh layout is a row here rather than a component anywhere.
 *
 * Framework-free by construction, so it reaches every edition through `@viliha/vui-core`.
 *
 * **Measured, not invented.** Each preset is read off a full-window screenshot of the reference
 * (`PD-065`). Where a choice was not visible in the shot it takes the value the other presets share,
 * and the field says so rather than the preset guessing.
 */
/** How a nav parent shows that it opens. */
export type Expander = "none" | "chevron" | "plus-minus";
/** How the current item is marked. */
export type ActiveMark = "pill" | "text" | "left-bar";
/** What closes the page. `compact` is the one-line copyright and legal strip. */
/**
 * **One value, and that is the point rather than an oversight.**
 *
 * This was `"none" | "compact"` and the `"none"` arm had no consumer: three layouts took it on
 * reasoning borrowed from a documentation site's prev/next footer, which this product does not render,
 * so it silently dropped the licence line off every page under them. The docblock then argued the arm
 * should stay "because a real docs consumer will want it", while the test asserting the fix forbade
 * it, which is two statements about one decision shipped together. `E-03` settles that: the arm comes
 * back when something needs it, with the layout that needs it.
 */
export type ShellFooter = "compact";
/** What sits above the navigation. */
export type SidebarBrand = "wordmark" | "wordmark-version" | "icon";
/** How a group's label is set. */
export type GroupHeading = "uppercase" | "sentence" | "none";
export interface ShellLayout {
    /** Stable key, used in the URL and in `data-layout`. */
    id: string;
    /** What a person picking a layout sees. */
    label: string;
    /** One line on what it is for, shown under the label in the picker. */
    hint: string;
    /** Sidebar width in pixels when expanded. A rail layout states its rail width here. */
    width: number;
    brand: SidebarBrand;
    /** A search field inside the sidebar, above the navigation. */
    sidebarSearch: boolean;
    /** Icons beside nav items. Documentation layouts drop them; application layouts keep them. */
    navIcons: boolean;
    heading: GroupHeading;
    expander: Expander;
    /** A vertical rule down the left of an open submenu. */
    submenuRule: boolean;
    active: ActiveMark;
    /** The right end of the header bar. */
    headerEnd: "account" | "cta";
    /**
     * The footer, which is chrome and so belongs to the layout.
     *
     * Every layout closes with the one-line strip: a page that simply stops reads unfinished on a short
     * screen, and it is where the licence belongs, which a free MIT download has to state somewhere a
     * reader will actually see.
     *
     * **The three documentation layouts took `none` and that was wrong here.** The reasoning was that a
     * docs page ends in its own prev/next footer and two footers is one too many, which is true of a
     * documentation *site* and not of this demo: nothing here renders a prev/next footer, so choosing
     * one of those three layouts silently dropped the licence line off every page. A borrowed
     * justification for a feature the product does not have. The axis stays, because a real docs
     * consumer of the shell will want it; nothing in this demo selects it.
     */
    footer: ShellFooter;
}
/**
 * The six.
 *
 * They are ordered as the reference orders them, so "layout three" means the same thing in a
 * conversation about either product.
 */
export declare const SHELL_LAYOUTS: readonly ShellLayout[];
export declare const DEFAULT_LAYOUT = "one";
export declare const layoutById: (id: string | null | undefined) => ShellLayout;
/** `true` when the layout is the icon-only rail, which has no room for labels or submenus. */
export declare const isRail: (layout: ShellLayout) => boolean;
