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
/**
 * The six.
 *
 * They are ordered as the reference orders them, so "layout three" means the same thing in a
 * conversation about either product.
 */
export const SHELL_LAYOUTS = [
    {
        id: "one",
        label: "Application",
        hint: "The default. Grouped navigation with icons, and plus-minus disclosure.",
        width: 290,
        brand: "wordmark",
        sidebarSearch: false,
        navIcons: true,
        heading: "uppercase",
        expander: "plus-minus",
        submenuRule: true,
        active: "pill",
        headerEnd: "account",
        footer: "compact",
    },
    {
        id: "two",
        label: "Sectioned",
        hint: "Several titled sections, sentence case, chevron disclosure.",
        width: 290,
        brand: "wordmark",
        sidebarSearch: false,
        navIcons: true,
        heading: "sentence",
        expander: "chevron",
        submenuRule: false,
        active: "pill",
        headerEnd: "account",
        footer: "compact",
    },
    {
        id: "three",
        label: "Documentation",
        hint: "A version switcher and a sidebar search, over a flat list with no icons.",
        width: 290,
        brand: "wordmark-version",
        sidebarSearch: true,
        navIcons: false,
        heading: "sentence",
        expander: "none",
        submenuRule: false,
        active: "pill",
        headerEnd: "cta",
        footer: "compact",
    },
    {
        id: "four",
        label: "Documentation, collapsible",
        hint: "The same, with each section able to fold away.",
        width: 290,
        brand: "wordmark-version",
        sidebarSearch: true,
        navIcons: false,
        heading: "sentence",
        expander: "chevron",
        submenuRule: false,
        active: "text",
        headerEnd: "cta",
        footer: "compact",
    },
    {
        id: "five",
        label: "Documentation, marked",
        hint: "Sections open, and the current page marked with a rule rather than a fill.",
        width: 290,
        brand: "wordmark-version",
        sidebarSearch: false,
        navIcons: false,
        heading: "sentence",
        expander: "chevron",
        submenuRule: false,
        active: "left-bar",
        headerEnd: "cta",
        footer: "compact",
    },
    {
        id: "six",
        label: "Icon rail",
        hint: "Icons only, for a dense application where the labels are learned.",
        width: 104,
        brand: "icon",
        sidebarSearch: false,
        navIcons: true,
        heading: "none",
        expander: "none",
        submenuRule: false,
        active: "pill",
        headerEnd: "account",
        footer: "compact",
    },
];
export const DEFAULT_LAYOUT = "one";
export const layoutById = (id) => SHELL_LAYOUTS.find((layout) => layout.id === id) ??
    // Never undefined: an unknown id in a URL or in storage is a typo, not a reason to render no shell.
    SHELL_LAYOUTS.find((layout) => layout.id === DEFAULT_LAYOUT);
/** `true` when the layout is the icon-only rail, which has no room for labels or submenus. */
export const isRail = (layout) => layout.brand === "icon";
