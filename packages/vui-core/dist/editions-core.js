/**
 * Which component family each edition actually ships (`PD-013`).
 *
 * One catalogue, three consumers: the React gallery, the Vue gallery and the HTML generator all
 * read it, so they cannot disagree about what exists. Before this, React's gallery was 537
 * hand-written lines, Vue had no list at all, and the count of what Vue was missing lived as three
 * filenames inside `scripts/check-products.mjs`.
 *
 * **Declared, not derived, and that is deliberate.** Mapping a React family to its Vue counterpart
 * needs judgement a filename cannot carry: `Chart.vue` wraps `@tanstack/charts`, so it is
 * `tanstack-chart`'s port and the Recharts family has no Vue counterpart at all. Those judgements
 * live here where they can be argued with, and `scripts/check-editions.mjs` checks every one of
 * them against the filesystem and the Vue package's exports.
 *
 * Framework-free, so it reaches every edition through `@viliha/vui-core`.
 */
export const FAMILY_AVAILABILITY = [
    {
        name: "accordion",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    { name: "alert", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "alert-dialog",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    {
        name: "aspect-ratio",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "auth-context",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "absent",
        vueExport: "useAuth",
        note: "html: not a rendered family: it is provider or plumbing, and there is nothing to show",
        nothingToDraw: ["react", "vue"],
    },
    {
        name: "avatar",
        react: "ships",
        vue: "ships",
        angular: "ships",
        html: "ships",
        tier: "free",
        // `size` and presence arrived in `PD-085` and were ported in `Z-14`. React and Vue add a wrapper
        // element when a status is set, because `AVATAR_ROOT` clips its own contents and would crop a dot
        // on the circle's edge.
        angularNote: "Presence is a wrapper the call site writes, `[vuiAvatarStatus]`, because an Angular directive " +
            "cannot introduce an element around its own host and the dot has to sit outside the frame's clip. " +
            "One element longer than React's and Vue's; `size` is repeated on it so the dot can scale.",
    },
    { name: "badge", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "breadcrumb",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "breadcrumbs",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    { name: "button", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "calendar",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
        note: "html: not emitted yet · vue: single dates via Calendar, ranges via RangeCalendar, which is Reka's separate primitive · angular: the same split, both hand-rolled",
    },
    { name: "card", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "cascading-combobox",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    {
        name: "chart",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "pattern",
        note: "vue: React-only by construction. Recharts is a React library, and the cross-framework answer is the TanStack chart Vue does ship · html: not emitted yet",
        angularNote: "Recharts is React-only. `tanstack-chart` is the cross-framework answer, and Angular ships its card.",
    },
    { name: "checkbox", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "code",
        react: "ships",
        vue: "ships",
        angular: "absent",
        tier: "free",
        html: "absent",
        note: "html: not a rendered family: it is provider or plumbing, and there is nothing to show",
        angularNote: "React's `Code` renders a bare `<code>` with no class of its own, so there is nothing for an edition to port.",
    },
    {
        name: "collapsible",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
        note: "html: not emitted yet",
    },
    {
        name: "combobox",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    { name: "command", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "command-palette",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "config",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "absent",
        vueExport: "ThemeConfigProvider",
        note: "html: not a rendered family: it is provider or plumbing, and there is nothing to show",
        nothingToDraw: ["react", "vue"],
    },
    {
        name: "confirm-dialog",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "data-table",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
        note: "html: not emitted yet",
    },
    { name: "dialog", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "dropdown-menu",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    {
        name: "field-grid",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "filter-field",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "pro",
        html: "ships",
    },
    {
        name: "form",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "absent",
        vueExport: "FormControl",
        note: "html: not emitted yet",
    },
    {
        name: "form-actions",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
        vueExport: "FormFooter",
        note: "html: not emitted yet",
    },
    {
        name: "hover-card",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    { name: "input", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "input-otp",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
        vueExport: "InputOTP",
        note: "html: not emitted yet",
    },
    { name: "kbd", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    { name: "label", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    { name: "menu", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "multi-combobox",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
        angularFile: "combobox",
    },
    {
        name: "org-switcher",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
        note: "html: not emitted yet",
    },
    {
        name: "organization-profile",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
        vueExport: "organizationProfileFields",
        note: "html: not emitted yet",
    },
    { name: "page", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "page-chrome",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "absent",
        vueExport: "PageChromeProvider",
        note: "html: not a rendered family: it is provider or plumbing, and there is nothing to show",
        nothingToDraw: ["react", "vue"],
    },
    {
        name: "password-input",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "popover",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    {
        name: "profile-form",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "pro",
        html: "ships",
        note: "html: not emitted yet",
    },
    /*
     * The four families added with `PD-199`, all `free`: the paid tier is the record workflow, not the
     * primitives, and putting a spinner behind a paywall would contradict the line the product sells
     * on. React first for each, with the ports to follow.
     */
    {
        name: "button-group",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "ships",
        note: "vue: not ported yet. HTML gets it from the generator, because the joining is pure CSS and needs no runtime",
        angularNote: "Not ported yet. The joining is pure CSS, so the port is markup rather than logic.",
    },
    {
        name: "carousel",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "absent",
        note: "vue: not ported yet · html: the slides render, the controls need a runtime `vui.js` has not got",
        angularNote: "Not ported yet. It needs state for the current slide, so it is a real port rather than markup.",
    },
    {
        name: "list",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "ships",
        note: "vue: not ported yet. HTML gets it from the generator: it is `ul` and `li` with the shared classes and no runtime at all",
        angularNote: "Not ported yet. Pure markup: `ul` and `li` with the shared classes.",
    },
    {
        name: "spinner",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "ships",
        note: "vue: not ported yet. HTML gets it from the generator: one element, one class, and the icon is already in the slot",
        angularNote: "Not ported yet. One element, one class, and the icon is already in the slot.",
    },
    /*
     * Extracted from `data-table.tsx`, which drew it inline, and from the free demo's tables screen,
     * which drew it again by hand (`PD-198`). React first: the ports follow, and claiming "ships" for
     * an edition that has not got it is the thing `check:editions` exists to catch.
     *
     * The comment sits outside the brace deliberately: the catalogue is read by a regular expression
     * that expects `{ name:` with nothing but whitespace between, so a comment inside the object makes
     * the entry invisible to every guard that reads it.
     */
    {
        name: "pagination",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "absent",
        note: "vue: not ported yet, and the data table draws its own pager meanwhile · html: not ported yet; `vui.js` has no pager and the exported tables page is not paged",
        angularNote: "Not ported yet. The Angular data table draws its own pager, so a paged table works; what is missing is the standalone family.",
    },
    { name: "progress", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "radio-group",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "record-field",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "pro",
        html: "ships",
        vueExport: "usePersistentState",
        note: "html: not emitted yet",
        nothingToDraw: ["vue"],
    },
    {
        name: "record-form",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "pro",
        html: "ships",
        note: "html: not emitted yet",
    },
    {
        name: "record-view",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "pro",
        html: "ships",
        note: "html: not emitted yet",
    },
    {
        name: "required-mark",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    {
        name: "scroll-area",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    { name: "select", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "pattern" },
    {
        name: "separator",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
    },
    { name: "sheet", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "pattern" },
    { name: "skeleton", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "slider",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
        note: "html: not emitted yet",
    },
    {
        name: "sonner",
        react: "ships",
        vue: "absent",
        angular: "absent",
        tier: "free",
        html: "absent",
        note: "vue: declined by D16: its only importer here is the docs page that documents it · html: not a rendered family: it is provider or plumbing, and there is nothing to show",
        nothingToDraw: ["react"],
        angularNote: "Declined for every edition by `D16`.",
    },
    { name: "steps", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "status-field",
        react: "ships",
        vue: "ships",
        angular: "ships",
        // Each edition decorates the control by the only means it has: React `cloneElement`, Vue
        // `cloneVNode`, and Angular a `querySelector` inside its own host, because `contentChild` cannot
        // see arbitrary projected DOM. The call site is the same in all three, which is the part that
        // matters; the mechanism differing is what makes it possible.
        angularNote: "Angular cannot clone projected content, so it finds the control in its own host after render " +
            "rather than taking a second directive at the call site. Same usage as React and Vue.",
        note: "The HTML edition has no port: the border and the message are static markup, but the tooltip " +
            "that carries the message needs a runtime. Put the message under the control there.",
        tier: "free",
        html: "absent",
    },
    {
        name: "video-embed",
        react: "ships",
        vue: "ships",
        angular: "ships",
        html: "absent",
        // All three move focus to the player when it mounts, because the button that asked for it stops
        // existing in the same commit: without it a keyboard user is returned to the top of the document.
        note: "The HTML edition has no port: the poster is static markup and the click that swaps it for the " +
            "player is not. Use the provider's own iframe there, and what you lose is the click-to-load, " +
            "so the player and its cookies arrive with the page rather than when a visitor asks for them.",
        tier: "free",
    },
    { name: "switch", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    { name: "table", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    { name: "tabs", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "tanstack-chart",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
        vueExport: "Chart",
        note: "html: a snapshot, unlike the other rendered partials. `renderToStaticMarkup` has no DOM to measure, so the library falls back to a 640-wide viewBox and the SVG scales rather than reflowing",
        angularFile: "chart",
    },
    { name: "textarea", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "theme-provider",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "absent",
        vueExport: "useThemeConfig",
        note: "html: not a rendered family: it is provider or plumbing, and there is nothing to show",
        nothingToDraw: ["react", "vue"],
    },
    {
        name: "toast",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
        vueExport: "Toaster",
    },
    { name: "toggle", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
    {
        name: "toggle-group",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "ships",
        angularFile: "toggle",
    },
    {
        name: "tooltip",
        react: "ships",
        vue: "ships",
        angular: "ships",
        tier: "free",
        html: "pattern",
    },
    { name: "wizard", react: "ships", vue: "ships", angular: "ships", tier: "free", html: "ships" },
];
/** Everything the edition ships, including HTML's native patterns. */
export const familiesFor = (edition) => FAMILY_AVAILABILITY.filter((f) => f[edition] !== "absent");
/** Everything it does not, each with the reason. A gallery shows these rather than omitting them. */
export const missingFor = (edition) => FAMILY_AVAILABILITY.filter((f) => f[edition] === "absent");
/** The denominator all three galleries quote, so none of them can invent its own. */
export const FAMILY_COUNT = FAMILY_AVAILABILITY.length;
/**
 * The families an edition **could** ship, which is not all of them (`PD-045`).
 *
 * Seven of the sixty-eight are React plumbing with no markup at all: three providers
 * (`auth-context`, `config`, `theme-provider`), a toast runtime (`sonner`), a pass-through
 * (`code`), a layout hook (`page-chrome`), and `form`, which cannot render outside a
 * `react-hook-form` context. No static or template edition could ever ship them, and counting them
 * made the HTML edition read seven short for work nobody could do.
 *
 * So a template edition reports against this denominator and says which seven it excludes. React and
 * Vue keep 68, because for them the plumbing is the product.
 */
export const renderableFor = (edition) => FAMILY_AVAILABILITY.filter((f) => f[edition] !== "absent" || f.note === undefined);
/** The families no template edition can ship, with their reason on each row. */
export const PLUMBING_FAMILIES = [
    "auth-context",
    "code",
    "config",
    "form",
    "page-chrome",
    "sonner",
    "theme-provider",
];
/**
 * How many families a template edition is measured against.
 *
 * Derived, so adding a plumbing family moves the denominator rather than leaving a hand-typed number
 * behind. `check:inventory` holds the documents to it.
 */
export const RENDERABLE_COUNT = FAMILY_COUNT - PLUMBING_FAMILIES.length;
