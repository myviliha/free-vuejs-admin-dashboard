import { companies, people } from "./crm-data-core.js";
import { employees, organizations } from "./demo-data-core.js";
import { resolvePostCodes, searchPostCodes } from "./demo-post-codes-core.js";
import { ROLES, STATUSES, TEAMS } from "./demo-user-options-core.js";
import { branches, businesses, cities, countries, currencies, departments, languages, markets, regions, } from "./mock-data-core.js";
export const BRANCHES_SCREEN = {
    title: "Branches",
    singular: "Branch",
    icon: "network",
    fields: [
        {
            key: "name",
            label: "Name",
            description: "3–20 letters.",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
            min: 3,
            max: 20,
            pattern: /^[\p{L} ]+$/u,
            patternMessage: "Letters and spaces only",
            trim: true,
        },
        {
            key: "organization",
            label: "Organization",
            icon: "building",
            editable: true,
            width: 180,
            group: "General",
            filterable: true,
            trim: true,
        },
        {
            key: "code",
            label: "Code",
            description: "1–5 letters or digits.",
            icon: "hash",
            editable: true,
            required: true,
            group: "General",
            filterable: true,
            min: 1,
            max: 5,
            pattern: /^[A-Za-z0-9]+$/,
            patternMessage: "1–5 letters or digits",
            trim: true,
        },
        {
            key: "email",
            label: "Email",
            icon: "mail",
            editable: true,
            copyable: true,
            width: 220,
            group: "General",
            format: "email",
            trim: true,
        },
        {
            key: "phone",
            label: "Phone",
            description: "US number, auto-formatted as (123) 456-7890.",
            icon: "phone",
            editable: true,
            copyable: true,
            width: 160,
            group: "General",
            format: "phone",
            trim: true,
        },
        {
            key: "city",
            label: "City",
            icon: "map-pin",
            editable: true,
            group: "General",
            filterable: true,
            trim: true,
        },
        {
            key: "isHeadquarters",
            label: "Headquarter",
            description: "Is this the organization's head office?",
            icon: "circle-dot",
            input: "checkbox", // checkbox in the Add/Edit form…
            editable: true,
            width: 150,
            group: "System",
            // …and a badge in the table (render is the read view; the checkbox wins in edit).
        },
    ],
    softDeleted: [
        {
            id: 101,
            organization: "Northwind Retail",
            name: "Boston",
            code: "BOS",
            email: "boston@northwind.example.com",
            phone: "(617) 555-0155",
            city: "Boston",
            isHeadquarters: false,
        },
        {
            id: 102,
            organization: "Northwind Retail",
            name: "Phoenix",
            code: "PHX",
            email: "phoenix@northwind.example.com",
            phone: "(602) 555-0171",
            city: "Phoenix",
            isHeadquarters: false,
        },
    ],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.organization,
        initials: (row.code || row.name).slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        organization: "",
        name: "",
        code: "",
        email: "",
        phone: "",
        city: "",
        isHeadquarters: false,
    }),
    customCells: ["isHeadquarters"],
};
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export const BRANCHES_ROWS = branches;
export const DEPARTMENTS_SCREEN = {
    title: "Departments",
    singular: "Department",
    icon: "layout-grid",
    fields: [
        {
            key: "title",
            label: "Title",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "organization",
            label: "Organization",
            icon: "building",
            editable: true,
            width: 200,
            group: "General",
            filterable: true,
        },
        {
            key: "code",
            label: "Code",
            icon: "hash",
            editable: true,
            group: "General",
            filterable: true,
        },
        {
            key: "employees",
            label: "Employees",
            icon: "users",
            // No explicit align — auto-aligns center (numeric). See RecordView.
            group: "System",
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.title,
        subtitle: row.organization,
        initials: (row.code || row.title).slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        organization: "",
        title: "",
        code: "",
        employees: 0,
    }),
    customCells: ["employees"],
};
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export const DEPARTMENTS_ROWS = departments;
export const BUSINESSES_SCREEN = {
    title: "Businesses",
    singular: "Business",
    icon: "briefcase",
    fields: [
        {
            key: "title",
            label: "Title",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "code",
            label: "Code",
            icon: "hash",
            editable: true,
            group: "General",
            filterable: true,
        },
        {
            key: "description",
            label: "Description",
            icon: "align-left",
            editable: true,
            width: 360,
            group: "General",
            filterable: true,
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.title,
        subtitle: row.code,
        initials: row.code.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        title: "",
        code: "",
        description: "",
    }),
    customCells: [],
};
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export const BUSINESSES_ROWS = businesses;
/* ── V-2b: the six screens the Vue demo was missing ─────────────────────────────────────────────── */
export const EMPLOYEES_SCREEN = {
    title: "Employees",
    singular: "Employee",
    icon: "users",
    fields: [
        {
            key: "firstName",
            label: "First name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "lastName",
            label: "Last name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "email",
            label: "Email",
            icon: "mail",
            editable: true,
            copyable: true,
            width: 240,
            group: "General",
            filterable: true,
        },
        { key: "code", label: "Code", icon: "hash", editable: true, group: "Work" },
        { key: "department", label: "Department", editable: true, group: "Work", filterable: true },
        { key: "branch", label: "Branch", icon: "network", editable: true, group: "Work" },
        {
            key: "organization",
            label: "Organization",
            icon: "building",
            editable: true,
            width: 180,
            group: "Work",
            filterable: true,
        },
        { key: "isActive", label: "Status", icon: "circle-dot", group: "System" },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: `${row.firstName} ${row.lastName}`.trim(),
        subtitle: row.email,
        initials: `${row.firstName[0] ?? ""}${row.lastName[0] ?? ""}`.toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        code: "",
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        branch: "",
        organization: "",
        isActive: true,
    }),
    customCells: ["isActive"],
};
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export const EMPLOYEES_ROWS = employees;
/**
 * The status badge's label and variant, per organization status.
 *
 * Data, not markup, so both editions read it and only the `<Badge>` call differs. The same trick as
 * `getPrimary`: the decision is shared and the element is bound.
 */
export const ORGANIZATION_STATUS_BADGE = {
    active: { label: "Active", variant: "success" },
    trial: { label: "Trial", variant: "warning" },
    suspended: { label: "Suspended", variant: "destructive" },
};
export const ORGANIZATIONS_SCREEN = {
    title: "Organizations",
    singular: "Organization",
    icon: "building2",
    formDescription: "Organizations are the top-level tenants in the system. Each one groups its branches, departments and employees, and owns its billing and locale settings. Fill in the details below to create or update a record.",
    fields: [
        {
            key: "name",
            label: "Name",
            description: "The organization's legal or trading name, shown across the app.",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
            min: 2,
            max: 60,
            trim: true,
        },
        {
            key: "url",
            label: "Domain",
            description: "Primary web domain, e.g. acme.com, used to group users and match emails.",
            icon: "globe",
            editable: true,
            copyable: true,
            width: 200,
            group: "General",
            filterable: true,
            pattern: /^[a-z0-9.-]+\.[a-z]{2,}$/i,
            patternMessage: "Enter a domain like acme.com",
            trim: true,
        },
        {
            key: "email",
            label: "Email",
            description: "Main contact address for billing and account notices.",
            icon: "mail",
            editable: true,
            required: true,
            copyable: true,
            width: 220,
            group: "General",
            filterable: true,
            format: "email",
            trim: true,
        },
        {
            key: "country",
            label: "Country",
            description: "Headquarters country. Drives default currency, tax and locale.",
            icon: "map-pin",
            editable: true,
            group: "General",
            filterable: true,
            trim: true,
        },
        {
            key: "branches",
            label: "Branches",
            description: "Number of physical or regional offices under this organization.",
            icon: "network",
            group: "System",
        },
        {
            key: "employees",
            label: "Employees",
            description: "Approximate headcount. Used for reporting and plan sizing.",
            icon: "users",
            group: "System",
        },
        {
            key: "status",
            label: "Status",
            description: "Account lifecycle: Trial while evaluating, Active once live, Suspended to disable access.",
            icon: "circle-dot",
            group: "System",
            filterable: { control: "select" },
            options: [
                { value: "active", label: "Active" },
                { value: "trial", label: "Trial" },
                { value: "suspended", label: "Suspended" },
            ],
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.url,
        initials: row.initials || row.name.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        name: "",
        url: "",
        email: "",
        countryCode: "",
        country: "",
        branches: 0,
        employees: 0,
        status: "trial",
        initials: "",
        updated: "just now",
    }),
    // `branches` and `employees` are tabular-nums spans; `status` is a badge.
    customCells: ["branches", "employees", "status"],
    // …and `status`'s form control is a radio group rather than the default select, which is the
    // reference demo showing off `renderInput`. An edition that shipped the select would be showing a
    // different screen.
    customInputs: ["status"],
};
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export const ORGANIZATIONS_ROWS = organizations;
/**
 * A market's centre as one string, or an em dash when it has no coordinates.
 *
 * Shared because it is a formatting decision (four decimal places, comma-separated, dash for null) and
 * two editions formatting the same number differently is the drift this file exists to stop.
 */
export function formatMarketCenter(market) {
    if (market.centerLatitude === null || market.centerLongitude === null)
        return "—";
    return `${market.centerLatitude.toFixed(4)}, ${market.centerLongitude.toFixed(4)}`;
}
export const MARKETS_SCREEN = {
    title: "Markets",
    singular: "Market",
    icon: "map-pin",
    // The reference demo waits before showing rows so the skeleton is visible on a first visit.
    loadingDelayMs: 900,
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "organization",
            label: "Organization",
            icon: "building",
            editable: true,
            width: 200,
            group: "General",
            filterable: true,
        },
        {
            key: "centerLatitude",
            label: "Center (lat, lng)",
            icon: "globe",
            width: 180,
            group: "System",
        },
        {
            key: "radiusMiles",
            label: "Radius",
            icon: "ruler",
            // No explicit align — auto-aligns center (numeric).
            group: "System",
        },
        {
            // Many-to-many: a searchable, async multi-select. The cell shows up to 3
            // codes then "+N"; the Add/Edit form renders removable chips.
            key: "postCodes",
            label: "Post codes",
            description: "The set of post codes this market serves — search the remote list and pick any number.",
            width: 220,
            group: "System",
            editable: true,
            multiple: true,
            input: "combobox",
            maxChipsInCell: 3,
            loadOptions: ({ search, signal }) => searchPostCodes({ search, signal }),
            resolveOptions: (values) => resolvePostCodes(values),
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.organization,
        initials: row.name.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        organization: "",
        name: "",
        centerLatitude: null,
        centerLongitude: null,
        radiusMiles: null,
        postCodes: [],
    }),
    customCells: ["centerLatitude", "radiusMiles"],
};
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export const MARKETS_ROWS = markets;
/** A user's status to a badge variant. Shared for the same reason the organization one is. */
export const USER_STATUS_VARIANT = {
    active: "success",
    invited: "warning",
    suspended: "destructive",
};
/** Capitalise a fixed set of string values into select options. */
const options = (vals) => vals.map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }));
export const USERS_SCREEN = {
    title: "Users",
    singular: "User",
    icon: "users",
    // The one screen in this set that is not fixture-backed: `listUsers` in `demo-users-core` pages
    // 10,000 rows on the server and the client never holds the table.
    source: "fetcher",
    fields: [
        // Identity column (the leading Name). Sortable so the header toggle drives a server sort.
        { key: "name", label: "Name", icon: "users", sortable: true, hideInTable: true },
        {
            key: "email",
            label: "Email",
            icon: "mail",
            copyable: true,
            sortable: true,
            width: 260,
        },
        {
            key: "role",
            label: "Role",
            icon: "lock",
            filterable: { control: "select", options: options(ROLES) },
        },
        {
            key: "team",
            label: "Team",
            icon: "briefcase",
            filterable: { control: "select", options: options(TEAMS) },
        },
        {
            key: "status",
            label: "Status",
            icon: "circle-dot",
            filterable: { control: "select", options: options(STATUSES) },
        },
        { key: "createdAt", label: "Created", icon: "calendar", sortable: true },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.email,
        initials: row.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
    }),
    customCells: ["status", "createdAt"],
};
/**
 * `makeEmptyRow`, or a clear failure instead of a silent one.
 *
 * The field is optional on the spec because a server-paginated screen has no Add form, but a screen
 * that opens one needs it. Both editions call this rather than each writing its own `?? throw`, and the
 * message names the screen so the error says which spec is incomplete.
 */
export function emptyRowFactory(spec) {
    const make = spec.makeEmptyRow;
    if (!make) {
        throw new Error(`record-screens: "${spec.title}" has no makeEmptyRow, so it cannot open an Add form.`);
    }
    return make;
}
/* ── The five system screens ────────────────────────────────────────────────
 *
 * Lookup tables: countries, regions, cities, currencies and languages. They are the same shape as
 * each other and nearly the simplest shape a record screen takes, which is why they were the last
 * ones still defined **inline in the React app** against `@/lib/mock-data` while every other record
 * screen in the repo had moved here.
 *
 * That mattered more than the tidiness of it. `record-screen.ts` in the Vue app says the point of a
 * shared spec is that "the React screen supplies its own two and nothing else, so the two editions
 * cannot drift on the other twenty decisions". Five screens outside the spec are five screens where
 * a label, a width, a validation rule or a filter control can differ between editions with nothing
 * to notice. Lifting them is what makes the Vue ports ports rather than lookalikes.
 * ────────────────────────────────────────────────────────────────────────── */
/** The distinct countries in the fixture, for the cities screen's cascading filter. */
const CITY_COUNTRIES = [...new Set(cities.map((c) => c.country))]
    .sort()
    .map((c) => ({ value: c, label: c }));
/** The states of one country, which is what makes the cities screen's State field dependent. */
export const statesForCountry = (country) => [...new Set(cities.filter((c) => !country || c.country === country).map((c) => c.state))]
    .sort()
    .map((s) => ({ value: s, label: s }));
export const COUNTRIES_SCREEN = {
    title: "Countries",
    singular: "Country",
    icon: "flag",
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "code",
            label: "Code",
            icon: "hash",
            editable: true,
            group: "General",
            filterable: true,
        },
        {
            key: "region",
            label: "Region",
            icon: "globe",
            editable: true,
            width: 220,
            group: "General",
            filterable: true,
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.code,
        initials: row.code.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({ id: Date.now(), name: "", code: "", region: "" }),
    customCells: [],
};
export const REGIONS_SCREEN = {
    title: "Regions",
    singular: "Region",
    icon: "globe",
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            sortable: true,
            filterable: true,
        },
        {
            key: "code",
            label: "Code",
            icon: "hash",
            editable: true,
            group: "General",
            filterable: { control: "text", placeholder: "e.g. APAC" },
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.code,
        initials: row.code.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({ id: Date.now(), name: "", code: "" }),
    customCells: [],
};
export const CITIES_SCREEN = {
    title: "Cities",
    singular: "City",
    icon: "map-pin",
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
        },
        {
            key: "country",
            label: "Country",
            icon: "flag",
            editable: true,
            group: "General",
            input: "combobox",
            options: CITY_COUNTRIES,
            filterable: { control: "select", options: CITY_COUNTRIES },
        },
        {
            key: "state",
            label: "State",
            icon: "map-pin",
            editable: true,
            group: "General",
            input: "combobox",
            // Form: the states of the country in the current draft.
            options: (draft) => statesForCountry(draft.country),
            filterable: {
                control: "combobox",
                // Filter: the states of the country in the current filter values.
                options: (values) => statesForCountry(typeof values.country === "string" ? values.country : undefined),
            },
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: `${row.state}, ${row.country}`,
        initials: row.name.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({ id: Date.now(), name: "", state: "", country: "" }),
    customCells: [],
};
export const CURRENCIES_SCREEN = {
    title: "Currencies",
    singular: "Currency",
    icon: "coins",
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "code",
            label: "Code",
            icon: "hash",
            editable: true,
            group: "General",
            filterable: true,
        },
        {
            key: "symbol",
            label: "Symbol",
            icon: "coins",
            editable: true,
            group: "General",
            filterable: true,
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.code,
        initials: row.code.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({ id: Date.now(), name: "", code: "", symbol: "" }),
    customCells: [],
};
export const LANGUAGES_SCREEN = {
    title: "Languages",
    singular: "Language",
    icon: "languages",
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "code",
            label: "Code",
            icon: "hash",
            editable: true,
            group: "General",
            filterable: true,
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.code,
        initials: row.code.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({ id: Date.now(), name: "", code: "" }),
    customCells: [],
};
/** The fixture rows each screen starts from, so an edition binds one import rather than two. */
export const COUNTRIES_ROWS = countries;
export const REGIONS_ROWS = regions;
export const CITIES_ROWS = cities;
export const CURRENCIES_ROWS = currencies;
export const LANGUAGES_ROWS = languages;
/**
 * The three points the two-column auth routes sell, shared so the editions cannot say different
 * things on the same screen.
 *
 * The icon is a **key**, bound per edition, for the same reason a nav icon is: a component does not
 * cross a framework boundary.
 */
export const AUTH_SHOWCASE_EYEBROW_TEXT = "Built for real work";
export const AUTH_SHOWCASE_HEADLINE = "The admin surface your product deserves.";
export const AUTH_SHOWCASE_POINTS = [
    {
        icon: "bolt",
        title: "Ready on first load",
        body: "The shell paints immediately and data fills in, so the app never shows an empty screen while it waits.",
    },
    {
        icon: "lock",
        title: "Your identity provider",
        body: "Email, SSO or a one-time code. The screens are ours; the auth engine stays yours.",
    },
    {
        icon: "badge-check",
        title: "Accessible by default",
        body: "Keyboard paths, visible focus and contrast that holds up in both light and dark.",
    },
];
/* ── CRM: companies and people ──────────────────────────────────────────────
 *
 * The last two record screens outside the shared spec. Their fixtures moved from
 * `apps/web/reactjs/lib/crm-data.ts` to `crm-data-core.ts` in the same change, because a Vue CRM
 * screen otherwise had to import from a Next.js app or retype the rows, and retyped fixtures are
 * two demos quietly showing different customers.
 * ────────────────────────────────────────────────────────────────────────── */
export const COMPANIES_SCREEN = {
    title: "Companies",
    singular: "Company",
    icon: "building2",
    fields: [
        {
            key: "name",
            label: "Name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "domain",
            label: "Domain",
            icon: "globe",
            editable: true,
            copyable: true,
            width: 210,
            group: "General",
            filterable: true,
        },
        {
            key: "industry",
            label: "Industry",
            icon: "factory",
            editable: true,
            group: "General",
            filterable: true,
        },
        {
            key: "city",
            label: "City",
            icon: "map-pin",
            editable: true,
            group: "General",
            filterable: true,
        },
        {
            key: "country",
            label: "Country",
            icon: "map-pin",
            editable: true,
            group: "General",
            filterable: true,
        },
        // No explicit align: a numeric count auto-aligns. The cell is `tabular-nums`, per edition.
        { key: "employees", label: "Employees", icon: "users", group: "System" },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: row.name,
        subtitle: row.domain,
        initials: row.name.slice(0, 2).toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        name: "",
        domain: "",
        industry: "",
        city: "",
        country: "",
        employees: 0,
    }),
    customCells: ["employees"],
};
export const PEOPLE_SCREEN = {
    title: "People",
    singular: "Person",
    icon: "contact",
    fields: [
        {
            key: "firstName",
            label: "First name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "lastName",
            label: "Last name",
            editable: true,
            required: true,
            group: "General",
            hideInTable: true,
            filterable: true,
        },
        {
            key: "email",
            label: "Emails",
            icon: "mail",
            editable: true,
            copyable: true,
            width: 240,
            group: "General",
            filterable: true,
        },
        {
            key: "phone",
            label: "Phones",
            icon: "phone",
            editable: true,
            copyable: true,
            width: 160,
            group: "General",
        },
        {
            key: "city",
            label: "City",
            icon: "map-pin",
            editable: true,
            group: "General",
            filterable: true,
        },
        { key: "jobTitle", label: "Job Title", icon: "briefcase", editable: true, group: "Work" },
        {
            key: "company",
            label: "Company",
            icon: "building2",
            editable: true,
            group: "Work",
            filterable: true,
        },
    ],
    softDeleted: [],
    getPrimary: (row) => ({
        title: `${row.firstName} ${row.lastName}`.trim(),
        subtitle: row.email,
        initials: `${row.firstName[0] ?? ""}${row.lastName[0] ?? ""}`.toUpperCase(),
    }),
    makeEmptyRow: () => ({
        id: Date.now(),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        jobTitle: "",
        company: "",
    }),
    customCells: [],
};
export const COMPANIES_ROWS = companies;
export const PEOPLE_ROWS = people;
