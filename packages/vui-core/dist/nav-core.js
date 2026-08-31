/**
 * The demo application's navigation, as data, shared by every edition.
 *
 * **Why this is not in the app that renders it.** `apps/web/reactjs` is the React demo and this tree
 * used to live inside it, described in its own comment as "single source of truth for navigation": the
 * sidebar renders it and the breadcrumbs derive from it. That was true for one edition. The moment a
 * second edition draws its own sidebar, the two demos diverge the first time anyone adds a screen, and
 * a buyer comparing two demos is exactly who notices. `CR-VP-001` makes React's demo the reference for
 * every edition, so the tree it navigates has to be the thing they share.
 *
 * **The icon is a key, not a component.** `icon: Home` cannot cross a framework boundary, so an entry
 * names its icon and each edition binds that name to its own component: React to `@radix-ui/react-icons`
 * through `DEMO_ICON_RADIX` below, and everyone else to the markup in `demo-icon-paths.ts`. Same shape as
 * the accordion's height variable in the theme, where the neutral thing is named and each edition
 * supplies the binding.
 *
 * Keys are the kebab-cased local aliases the React demo already used, generated from its import block
 * rather than retyped, which is why `building` and `building2` both exist and both resolve to
 * `CubeIcon`: that collapse is what the reference demo does today, and inventing a tidier set here
 * would have been a silent change to it.
 */
export function isNavGroup(entry) {
    return entry.children !== undefined;
}
export const NAV_TREE = [
    // Everyday screens. The first section has no title by convention.
    {
        items: [
            { label: "Home", href: "/dashboard", icon: "home", color: "text-blue-500" },
            { label: "Charts", href: "/charts", icon: "bar-chart3", color: "text-fuchsia-500" },
            { label: "Calendar", href: "/calendar", icon: "calendar", color: "text-rose-500" },
        ],
    },
    {
        title: "Communication",
        items: [
            { label: "Notifications", href: "/notifications", icon: "bell", color: "text-rose-500" },
            { label: "Chat", href: "/chat", icon: "chat-bubble", color: "text-sky-500" },
            { label: "Support", href: "/support", icon: "help-circle", color: "text-emerald-500" },
        ],
    },
    {
        title: "UI kit",
        items: [
            { label: "Components", href: "/components", icon: "blocks", color: "text-indigo-500" },
            { label: "Data Table", href: "/data-table/basic", icon: "table", color: "text-amber-500" },
            // The Pro one. The route keeps its name because a persistKey, the docs and the e2e route
            // list all point at it; the label is what tells the two apart.
            { label: "Record View", href: "/data-table", icon: "table", color: "text-orange-500" },
            { label: "Forms", href: "/forms", icon: "form-input", color: "text-teal-500" },
            { label: "Steps", href: "/steps", icon: "steps", color: "text-violet-500" },
        ],
    },
    {
        title: "Records",
        items: [
            { label: "Organizations", href: "/organizations", icon: "building2", color: "text-blue-500" },
            { label: "Branches", href: "/branches", icon: "network", color: "text-violet-500" },
            { label: "Departments", href: "/departments", icon: "layout-grid", color: "text-amber-500" },
            { label: "Employees", href: "/employees", icon: "users", color: "text-cyan-500" },
            { label: "Markets", href: "/markets", icon: "map-pin", color: "text-rose-500" },
            { label: "Businesses", href: "/businesses", icon: "briefcase", color: "text-emerald-500" },
        ],
    },
    {
        title: "Workspace",
        items: [
            {
                label: "Organization",
                icon: "building2",
                color: "text-emerald-500",
                children: [
                    {
                        label: "Profile",
                        href: "/organization/profile",
                        icon: "contact",
                        color: "text-emerald-500",
                    },
                ],
            },
            {
                label: "CRM",
                icon: "user-circle",
                color: "text-indigo-500",
                children: [
                    { label: "Companies", href: "/crm/companies", icon: "building", color: "text-blue-500" },
                    { label: "People", href: "/crm/people", icon: "contact", color: "text-sky-500" },
                    {
                        label: "Opportunities",
                        href: "/crm/opportunities",
                        icon: "target",
                        color: "text-orange-500",
                    },
                ],
            },
            {
                label: "System",
                icon: "settings",
                color: "text-slate-500",
                children: [
                    { label: "Regions", href: "/system/regions", icon: "globe", color: "text-teal-500" },
                    { label: "Countries", href: "/system/countries", icon: "flag", color: "text-red-500" },
                    { label: "Cities", href: "/system/cities", icon: "landmark", color: "text-amber-500" },
                    {
                        label: "Currencies",
                        href: "/system/currencies",
                        icon: "coins",
                        color: "text-green-500",
                    },
                    {
                        label: "Languages",
                        href: "/system/languages",
                        icon: "languages",
                        color: "text-purple-500",
                    },
                ],
            },
        ],
    },
    // Standalone screens: these live outside the app shell (their own header and
    // footer), which is why they are grouped rather than mixed into the sections
    // above. Both groups collapse, so the sidebar stays short.
    {
        title: "Screens",
        items: [
            {
                label: "Auth",
                icon: "lock",
                color: "text-rose-500",
                children: [
                    { label: "Sign in", href: "/auth/signin", icon: "log-in", color: "text-blue-500" },
                    { label: "Sign up", href: "/auth/signup", icon: "users", color: "text-emerald-500" },
                    {
                        label: "Forgot password",
                        href: "/auth/forgot-password",
                        icon: "help-circle",
                        color: "text-amber-500",
                    },
                    {
                        label: "Reset password",
                        href: "/auth/reset-password",
                        icon: "lock",
                        color: "text-violet-500",
                    },
                    {
                        label: "Verify code",
                        href: "/auth/verify",
                        icon: "badge-check",
                        color: "text-teal-500",
                    },
                    {
                        label: "Sign in (split)",
                        href: "/auth/signin-split",
                        icon: "log-in",
                        color: "text-indigo-500",
                    },
                    {
                        label: "Sign up (split)",
                        href: "/auth/signup-split",
                        icon: "users",
                        color: "text-cyan-500",
                    },
                ],
            },
            {
                label: "Errors",
                icon: "alert-triangle",
                color: "text-slate-500",
                children: [
                    {
                        label: "Unauthorized",
                        href: "/errors/unauthorized",
                        icon: "lock",
                        color: "text-amber-500",
                    },
                    {
                        label: "Forbidden",
                        href: "/errors/forbidden",
                        icon: "no-access",
                        color: "text-orange-500",
                    },
                    {
                        label: "Not found",
                        href: "/errors/not-found",
                        icon: "search",
                        color: "text-slate-500",
                    },
                    {
                        label: "Server error",
                        href: "/errors/server-error",
                        icon: "alert-triangle",
                        color: "text-red-500",
                    },
                    {
                        label: "Maintenance",
                        href: "/errors/maintenance",
                        icon: "settings",
                        color: "text-sky-500",
                    },
                ],
            },
        ],
    },
];
/**
 * Icon key to `@radix-ui/react-icons` export name.
 *
 * Strings rather than imports, because this module is framework-free by contract: the core build fails
 * if it picks up a `react` import. The React demo maps these names to components; the generator for
 * `demo-icon-paths.ts` reads the same table so both editions draw the same glyph.
 */
export const DEMO_ICON_RADIX = {
    // Not navigation: the dashboard's stat tile draws a trend arrow, and the record screens label their
    // fields. Both need the same glyph in both editions for the same reason the sidebar does. This table is
    // the demos' icon binding rather than the sidebar's, which is why it is `DEMO_` and not `NAV_`.
    "align-left": "TextAlignLeftIcon",
    bolt: "LightningBoltIcon",
    // The time field's trigger, which every edition draws (`PD-160`).
    clock: "ClockIcon",
    factory: "ArchiveIcon",
    "circle-dot": "DotFilledIcon",
    hash: "CodeIcon",
    mail: "EnvelopeClosedIcon",
    phone: "MobileIcon",
    "arrow-down-right": "ArrowBottomRightIcon",
    "arrow-down": "ArrowDownIcon",
    "arrow-left": "ArrowLeftIcon",
    "arrow-right": "ArrowRightIcon",
    "arrow-up": "ArrowUpIcon",
    "dots-horizontal": "DotsHorizontalIcon",
    "dots-vertical": "DotsVerticalIcon",
    // The password-recovery pair: an opened envelope for "we sent it", a tick for "it worked".
    "mail-open": "EnvelopeOpenIcon",
    "check-circle": "CheckCircledIcon",
    // The wizard: a bare tick for a completed step, a rocket for the plan section, rows for the page.
    // The appearance switch: light, dark, follow the system.
    sun: "SunIcon",
    moon: "MoonIcon",
    desktop: "DesktopIcon",
    // Copying the onboarding API token.
    copy: "CopyIcon",
    // The chat screen: a new thread, an attached file, and dismissing a chip.
    pencil: "Pencil1Icon",
    file: "FileIcon",
    close: "Cross2Icon",
    // Send a reply on the support desk.
    send: "PaperPlaneIcon",
    // The logo upload on the registration wizard.
    image: "ImageIcon",
    // The kanban board: add a card, delete one, and the drag handle on each.
    plus: "PlusIcon",
    trash: "TrashIcon",
    grip: "DragHandleDots2Icon",
    check: "CheckIcon",
    rocket: "RocketIcon",
    rows: "RowsIcon",
    "arrow-up-right": "ArrowTopRightIcon",
    "alert-triangle": "ExclamationTriangleIcon",
    "badge-check": "CheckCircledIcon",
    /**
     * The Pro sidebar's AI Assistant group (`PD-220`).
     *
     * **The only genuinely new glyph the fix needed.** Six of that sidebar's seventeen groups named
     * keys no icon table held, so all six drew the generic `Box` fallback; five of the six turned out
     * to be things this vocabulary already had under its own names, and `nav.ts` now uses those
     * (`briefcase`, `chat-bubble`, `help-circle`, `map-pin`, `rows`). Adding synonyms for them was the
     * first attempt and was wrong: six keys aliasing six existing glyphs is six more names for the
     * same pictures, and it put `map` on the globe this table already spends on `globe`.
     *
     * A wand rather than `coins`, which is what `TokensIcon` means here, and rather than `bolt`, which
     * is already the vocabulary's word for that glyph.
     */
    ai: "MagicWandIcon",
    "bar-chart3": "BarChartIcon",
    bell: "BellIcon",
    blocks: "MixIcon",
    briefcase: "BackpackIcon",
    building: "CubeIcon",
    building2: "CubeIcon",
    camera: "CameraIcon",
    calendar: "CalendarIcon",
    "chat-bubble": "ChatBubbleIcon",
    coins: "TokensIcon",
    contact: "IdCardIcon",
    flag: "BookmarkIcon",
    "form-input": "Pencil2Icon",
    /**
     * The free demo's sidebar needs its own keys (`Z-14`), and they are listed rather than counted:
     * this docblock said "three" above six of them, and two more went in afterwards.
     *
     * `FREE_NAV` keys its icons the way this table does rather than by Radix export name, so one
     * vocabulary serves the paid Vue app, both free demos and anything after them. The alternative was a
     * second naming scheme in the free nav and a per-edition map from one to the other, which is a
     * translation layer for no gain.
     */
    box: "BoxIcon",
    // `chevron-down` and `minus` are the shell's disclosure indicators; `plus` was already here. The two
    // `expander` styles the six layouts offer need all three. `info`, `input` and `layout` below are
    // sidebar and page icons, not indicators, and were previously swept into the same sentence.
    "chevron-down": "ChevronDownIcon",
    "chevron-right": "ChevronRightIcon",
    info: "InfoCircledIcon",
    input: "InputIcon",
    layout: "LayoutIcon",
    minus: "MinusIcon",
    "mixer-horizontal": "MixerHorizontalIcon",
    globe: "GlobeIcon",
    "help-circle": "QuestionMarkCircledIcon",
    home: "HomeIcon",
    landmark: "HomeIcon",
    languages: "TextIcon",
    "layout-grid": "DashboardIcon",
    lock: "LockClosedIcon",
    "log-in": "EnterIcon",
    "log-out": "ExitIcon",
    // The sidebar toggle. One icon that rotates rather than two that swap, so both editions of the
    // free demo draw the same arrow going in and coming out.
    "pin-left": "PinLeftIcon",
    "map-pin": "SewingPinFilledIcon",
    network: "Share2Icon",
    // Markets' radius. Added with `MARKETS_SCREEN` (V-2b): without a key here the Vue screen would
    // have drawn some other glyph beside a field React labels with a ruler.
    ruler: "RulerHorizontalIcon",
    "no-access": "CrossCircledIcon",
    search: "MagnifyingGlassIcon",
    settings: "GearIcon",
    steps: "RowsIcon",
    table: "TableIcon",
    target: "TargetIcon",
    upload: "UploadIcon",
    "user-circle": "AvatarIcon",
    users: "PersonIcon",
};
/**
 * Every group's parent path mapped to its first child.
 *
 * A group parent has no index page, so a breadcrumb or link for one would 404. Derived from the tree so
 * that adding a group needs no second edit. Lifted verbatim from the React demo's `SECTION_INDEX`.
 */
export function sectionIndex(tree = NAV_TREE) {
    const map = {};
    for (const section of tree) {
        for (const entry of section.items) {
            const first = isNavGroup(entry) ? entry.children[0] : undefined;
            if (first)
                map[first.href.slice(0, first.href.lastIndexOf("/")) || "/"] = first.href;
        }
    }
    return map;
}
/**
 * Every screen the reference demo has, which is **not** the same as every screen in the sidebar.
 *
 * `NAV_TREE` is the React demo's sidebar: 38 links. The reference is its 50 routes, and the other twelve
 * are reached the way that app reaches them, through the user menu, the quick actions, the footer and
 * direct links: `/users`, `/settings`, `/organizations/new` and `/edit`, `/register-business`, `/demo`,
 * `/onboarding`, the three legal pages, the `/auth` index and the app root.
 *
 * **Keeping the two lists apart is the point.** A review of batch 1 caught that measuring parity against
 * the sidebar would report the Vue demo complete at 38 of 38 with twelve reference screens missing, and
 * that implementing them would otherwise mean adding rows to `NAV_TREE`, which would silently add rows
 * to the **shipped React sidebar** as a side effect of building the Vue one. So the sidebar stays the
 * sidebar, and this is the checklist.
 *
 * Generated by walking `apps/web/reactjs/app` for `page.tsx`, excluding the documentation site, which
 * is shared across editions and served in its own right.
 */
export const PARITY_ROUTES = [
    "/",
    "/auth",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/signin",
    "/auth/signin-split",
    "/auth/signup",
    "/auth/signup-split",
    "/auth/verify",
    "/branches",
    "/businesses",
    "/calendar",
    "/charts",
    "/chat",
    "/components",
    "/crm/companies",
    "/crm/opportunities",
    "/crm/people",
    "/dashboard",
    "/data-table",
    "/data-table/basic",
    "/demo",
    "/departments",
    "/employees",
    "/errors/forbidden",
    "/errors/maintenance",
    "/errors/not-found",
    "/errors/server-error",
    "/errors/unauthorized",
    "/forms",
    "/markets",
    "/notifications",
    "/onboarding",
    "/organization/profile",
    "/organizations",
    "/organizations/edit",
    "/organizations/new",
    "/pricing",
    "/privacy",
    "/register-business",
    "/settings",
    "/steps",
    "/support",
    "/system/cities",
    "/system/countries",
    "/system/currencies",
    "/system/languages",
    "/system/regions",
    "/terms",
    "/users",
];
/** Every reachable page in the tree, flat, in sidebar order. What a demo has to be able to render. */
export function navLinks(tree = NAV_TREE) {
    return tree.flatMap((section) => section.items.flatMap((entry) => (isNavGroup(entry) ? entry.children : [entry])));
}
/** Every icon key the tree actually uses. The guard both editions' bindings are checked against. */
export function navIconKeys(tree = NAV_TREE) {
    return [
        ...new Set(tree.flatMap((section) => section.items.flatMap((entry) => [
            entry.icon,
            ...(isNavGroup(entry) ? entry.children.map((c) => c.icon) : []),
        ]))),
    ].sort();
}
/**
 * The free demo's sidebar, shared by every edition that renders it.
 *
 * **This was `apps/web/free-react/app/nav.ts`, and it moved here the moment a second edition needed
 * it** (`Z-14`). The two free demos are one product in two frameworks, so their sidebars have to match
 * exactly: the same two headings, the same nine entries, the same six parents with a submenu. Eighty
 * lines that must stay identical, copied per edition, is the drift this repository guards against
 * everywhere else, and it would have been four copies by the time Angular and HTML arrive.
 *
 * The *structure* is what is shared. Each edition still owns how it draws a row, which is why `icon` is
 * a name rather than a component: that one decision is what makes this file framework-free enough to
 * live in `@viliha/vui-core` at all.
 *
 * **`FREE_ROUTES` is derived from this**, so a page added to the sidebar is a page the route list
 * already knows about. They were two hand-maintained lists for about an hour, which was long enough to
 * see that the second one adds nothing but a chance to disagree.
 *
 * One entry is ours rather than the reference's, and one is theirs that they do not link:
 *   - **Layouts** is the shell-layout picker (`PD-065`), a feature of this product rather than a page
 *     in theirs, and a layout nobody can reach is a layout nobody buys.
 *   - **Modals** exists in their tree and appears nowhere in their sidebar, so five of their overlay
 *     examples are unreachable unless a visitor guesses the address.
 */
export const FREE_NAV = [
    {
        // **No heading on the first group.** The reference labels it "MENU", and the dev's call on
        // 2026-08-24 is that a label reading "Menu" above the menu says nothing: the group is already the
        // top of the sidebar. "Others" stays, because that one distinguishes a second group from the first.
        heading: "",
        entries: [
            // Their Dashboard is a parent with one child, "Ecommerce", pointing at the root. It reads as
            // redundant and it is not: the Pro tier adds six siblings under it, so the shape is the free
            // tier showing you where they go.
            { label: "Dashboard", icon: "layout-grid", children: [{ href: "/", label: "Ecommerce" }] },
            { label: "Calendar", icon: "calendar", href: "/calendar" },
            { label: "User Profile", icon: "users", href: "/profile" },
            {
                label: "Forms",
                icon: "input",
                children: [{ href: "/form-elements", label: "Form Elements" }],
            },
            {
                label: "Tables",
                icon: "table",
                children: [{ href: "/basic-tables", label: "Basic Tables" }],
            },
            {
                label: "Pages",
                icon: "file",
                children: [
                    { href: "/blank", label: "Blank Page" },
                    { href: "/error-404", label: "404 Error" },
                ],
            },
            { label: "Layouts", icon: "layout", href: "/layouts" },
        ],
    },
    {
        heading: "Others",
        entries: [
            {
                label: "Charts",
                icon: "bar-chart3",
                children: [
                    { href: "/line-chart", label: "Line Chart" },
                    { href: "/bar-chart", label: "Bar Chart" },
                ],
            },
            {
                label: "UI Elements",
                icon: "box",
                children: [
                    { href: "/alerts", label: "Alerts" },
                    { href: "/avatars", label: "Avatar" },
                    { href: "/badge", label: "Badge" },
                    { href: "/buttons", label: "Buttons" },
                    { href: "/images", label: "Images" },
                    { href: "/modals", label: "Modals" },
                    { href: "/videos", label: "Videos" },
                ],
            },
            {
                label: "Authentication",
                icon: "lock",
                children: [
                    { href: "/signin", label: "Sign In" },
                    { href: "/signup", label: "Sign Up" },
                ],
            },
        ],
    },
];
/** Every href the free sidebar offers, flattened. */
export const FREE_NAV_HREFS = FREE_NAV.flatMap((group) => group.entries.flatMap((entry) => entry.href ? [entry.href] : (entry.children ?? []).map((child) => child.href)));
/**
 * Every route the **free demo** has, which is a different product from `PARITY_ROUTES` above.
 *
 * **Derived from `FREE_NAV` rather than typed.** It was a hand-written list of the same nineteen
 * addresses for about an hour, which was long enough to see that a second copy adds nothing except a
 * chance to disagree with the first. Every page in this demo is reachable from the sidebar, so the
 * sidebar *is* the route list; if that ever stops being true, this is the line that has to change and
 * say why rather than the two lists quietly diverging.
 *
 * Sorted, because callers compare it against a directory listing and neither side should have to care
 * what order a sidebar happens to be in.
 *
 * `/error-404` is included and `not-found` is not: the first is a real address in the sidebar, and the
 * second is what a framework renders for anything unmatched, from the same component. Listing both
 * would double-count one screen.
 */
export const FREE_ROUTES = [...FREE_NAV_HREFS].sort();
/**
 * The sidebar promo card's copy, shared by every edition of the free demo.
 *
 * Two sentences and a button label would normally not be worth a constant, except that the first
 * sentence carries **a count**. A number in prose ages: families ship, the free tier grows, and one
 * of the copies gets updated. React's and Vue's already disagreed about the heading's classes when
 * this was two literals, which is the same drift `check:shared-classes` catches for class strings and
 * cannot catch for prose.
 *
 * `FREE_FAMILY_COUNT` is stated rather than derived, deliberately: `editions-core.ts` counts what the
 * *library* ships across every tier, and this is what the *free download* ships, which is a smaller
 * and separately-decided number. Deriving it would make the card claim the paid catalogue.
 */
export const FREE_FAMILY_COUNT = 64;
/** The promo card's three strings. The href is `/signup`, the only paid-tier door the demo has. */
export const FREE_UPGRADE = {
    heading: "Built on one design system",
    body: `${FREE_FAMILY_COUNT} free component families. Pro adds the server-backed record workflow.`,
    cta: "Upgrade to Pro",
    href: "/signup",
};
/**
 * The one demo identity, so no screen in any edition disagrees about who is signed in.
 *
 * It was `apps/web/free-react/app/demo-user.ts`, read by five React screens, and the Vue edition
 * wrote the name, the address and the avatar path out again across three files. Two editions, eight
 * places, one person: the next time the placeholder changes, seven of them get missed.
 *
 * **The portrait is a supplied illustration, not a photograph, and that is the better default for a
 * template.** A stock photo of a real person dates, has to be licensed by whoever redistributes the
 * download, and puts a stranger's face on a buyer's product until they remember to change it. An
 * illustrated avatar carries none of that and still shows what the component does with a real image
 * rather than initials.
 *
 * `AvatarFallback` stays underneath everywhere this is used: if the file is missing the initials show
 * through rather than a broken-image glyph, which is the degradation `avatar.tsx` documents.
 */
export const DEMO_USER = {
    name: "John Doe",
    email: "john@example.com",
    initials: "JD",
    photo: "/images/user/avatar.svg",
    role: "Team Manager",
    place: "Singapore",
};
/**
 * The account menu's rows, and the notification list.
 *
 * **All the account links point at `/profile`**, which is honest about a demo having one screen
 * behind them rather than inventing four routes that 404. `icon` is a `DEMO_ICON_RADIX` key for the
 * same reason `FreeNavEntry.icon` is: a component reference here would make this file React-only.
 */
export const DEMO_ACCOUNT_LINKS = [
    { href: "/profile", label: "Edit profile", icon: "users" },
    { href: "/profile", label: "Account settings", icon: "settings" },
    { href: "/profile", label: "Support", icon: "info" },
];
/**
 * The notification rows.
 *
 * **The times are fixed strings, not computed.** "5 min ago" from a timestamp would be a different
 * sentence on the server and in the browser, which is the hydration bug the calendar page already
 * had; and in a static export it would be relative to whenever the page was built, which is worse
 * than a label that never claimed to be live.
 */
export const DEMO_NOTIFICATIONS = [
    { name: "Terry Franci", online: true, when: "5 min ago" },
    { name: "Alena Franci", online: true, when: "8 min ago" },
    { name: "Jocelyn Kenter", online: true, when: "15 min ago" },
    { name: "Brandon Philips", online: false, when: "1 hr ago" },
];
/**
 * Initials from a display name, for an `AvatarFallback`.
 *
 * `words` caps how many are taken. Omitted it takes them all, which is what the account menu wants;
 * a table row wants two, because "MacBook Pro 13 inch" as four letters is not initials any more.
 */
export const initialsOf = (name, words) => name
    .split(" ")
    .slice(0, words ?? Number.POSITIVE_INFINITY)
    .map((part) => part[0])
    .join("");
