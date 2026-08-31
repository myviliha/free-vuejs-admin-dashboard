import type { Company, Person } from "./crm-data-core.js";
import type { DemoEmployee, DemoOrganization, OrganizationStatus } from "./demo-data-core.js";
import type { User, UserStatus } from "./demo-user-options-core.js";
import type { Branch, Business, City, Country, Currency, Department, Language, Market, Region } from "./mock-data-core.js";
import type { FieldRules } from "./record-field-core.js";
/**
 * The record screens, as data, shared by every edition.
 *
 * A record screen is almost entirely a description: a title, a list of field rules, some fixtures and two
 * small pure functions. Only two things in it are framework-bound, and they are the two this type leaves
 * out: an `icon`, which is a component, and a `render`, which returns a node.
 *
 * So the description lives here and each edition binds those two. React binds icon keys to
 * `@radix-ui/react-icons` and attaches its renders by field key; the Vue demo binds the same keys to the
 * markup in `demo-icon-paths.ts`. That is the same shape as the navigation tree, and for the same reason:
 * while these lived inside the React screens the Vue demo could only copy them, and a copy of forty field
 * rules diverges the first time somebody changes a validation message.
 *
 * `FieldRules<T>` already omitted `render`, `renderInput` and `icon` from `RecordField<T>`, which is what
 * made this a rename rather than a redesign.
 */
/** A field's rules, plus the **name** of its icon. Never a component. */
export interface SharedField<T> extends FieldRules<T> {
    icon?: string;
}
/** Everything a record screen is, minus the two things only an edition can supply. */
export interface RecordScreenSpec<T> {
    title: string;
    singular: string;
    /** An icon key, bound per edition. */
    icon: string;
    fields: SharedField<T>[];
    /**
     * Rows that are already in the trash.
     *
     * Seeded so the Trash view is not empty on first open, which is the state most worth showing and the
     * one a reviewer never sees otherwise. A real backend owns this.
     */
    softDeleted: T[];
    /** The row's identity in a list: what a card or a table's first column shows. */
    getPrimary: (row: T) => {
        title: string;
        initials: string;
        subtitle?: string;
    };
    /**
     * A blank row for the Add form. Pure, so both editions add the same shape.
     *
     * Optional because a server-paginated screen has no Add form: `USERS_SCREEN` reads through a fetcher
     * and the backend owns creation.
     */
    makeEmptyRow?: () => T;
    /** Field keys whose read view is a custom cell, so each edition knows what it must supply. */
    customCells: string[];
    /**
     * Field keys whose **form control** is custom, which is a different list from `customCells`.
     *
     * A field can have a custom read view and the default input (`isHeadquarters` is a badge and a
     * checkbox), or both (`status` on organizations is a badge and a radio group). Splitting the two lists
     * is what lets each binder throw for exactly what it is missing.
     */
    customInputs?: string[];
    /**
     * Where the rows come from, and it is in the spec rather than left to the edition on purpose.
     *
     * `fetcher` means the screen is server-paginated: one page at a time, sorted and filtered by the
     * server. An edition that quietly shipped it from fixtures would look identical on a demo screenshot
     * and be a different screen, which is exactly the drift `CR-DP-001` calls unfinished work.
     */
    source?: "fixtures" | "fetcher";
    /** Prose above the Add/Edit form, when the screen has one. */
    formDescription?: string;
    /**
     * A simulated first-load delay, so the skeleton state is visible.
     *
     * Markets has one in the reference demo. It is here because a demo that skips it looks faster than
     * the screen it is meant to be identical to, and because the number is a decision rather than a
     * detail.
     */
    loadingDelayMs?: number;
}
export declare const BRANCHES_SCREEN: RecordScreenSpec<Branch>;
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export declare const BRANCHES_ROWS: Branch[];
export declare const DEPARTMENTS_SCREEN: RecordScreenSpec<Department>;
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export declare const DEPARTMENTS_ROWS: Department[];
export declare const BUSINESSES_SCREEN: RecordScreenSpec<Business>;
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export declare const BUSINESSES_ROWS: Business[];
export declare const EMPLOYEES_SCREEN: RecordScreenSpec<DemoEmployee>;
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export declare const EMPLOYEES_ROWS: DemoEmployee[];
/**
 * The status badge's label and variant, per organization status.
 *
 * Data, not markup, so both editions read it and only the `<Badge>` call differs. The same trick as
 * `getPrimary`: the decision is shared and the element is bound.
 */
export declare const ORGANIZATION_STATUS_BADGE: Record<OrganizationStatus, {
    label: string;
    variant: "success" | "warning" | "destructive";
}>;
export declare const ORGANIZATIONS_SCREEN: RecordScreenSpec<DemoOrganization>;
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export declare const ORGANIZATIONS_ROWS: DemoOrganization[];
/**
 * A market's centre as one string, or an em dash when it has no coordinates.
 *
 * Shared because it is a formatting decision (four decimal places, comma-separated, dash for null) and
 * two editions formatting the same number differently is the drift this file exists to stop.
 */
export declare function formatMarketCenter(market: Market): string;
export declare const MARKETS_SCREEN: RecordScreenSpec<Market>;
/** The rows this screen lists. Re-exported so an edition imports one thing per screen. */
export declare const MARKETS_ROWS: Market[];
/** A user's status to a badge variant. Shared for the same reason the organization one is. */
export declare const USER_STATUS_VARIANT: Record<UserStatus, "success" | "warning" | "destructive">;
export declare const USERS_SCREEN: RecordScreenSpec<User>;
/**
 * `makeEmptyRow`, or a clear failure instead of a silent one.
 *
 * The field is optional on the spec because a server-paginated screen has no Add form, but a screen
 * that opens one needs it. Both editions call this rather than each writing its own `?? throw`, and the
 * message names the screen so the error says which spec is incomplete.
 */
export declare function emptyRowFactory<T>(spec: RecordScreenSpec<T>): () => T;
/** The states of one country, which is what makes the cities screen's State field dependent. */
export declare const statesForCountry: (country?: string) => {
    value: string;
    label: string;
}[];
export declare const COUNTRIES_SCREEN: RecordScreenSpec<Country>;
export declare const REGIONS_SCREEN: RecordScreenSpec<Region>;
export declare const CITIES_SCREEN: RecordScreenSpec<City>;
export declare const CURRENCIES_SCREEN: RecordScreenSpec<Currency>;
export declare const LANGUAGES_SCREEN: RecordScreenSpec<Language>;
/** The fixture rows each screen starts from, so an edition binds one import rather than two. */
export declare const COUNTRIES_ROWS: Country[];
export declare const REGIONS_ROWS: Region[];
export declare const CITIES_ROWS: City[];
export declare const CURRENCIES_ROWS: Currency[];
export declare const LANGUAGES_ROWS: Language[];
/**
 * The three points the two-column auth routes sell, shared so the editions cannot say different
 * things on the same screen.
 *
 * The icon is a **key**, bound per edition, for the same reason a nav icon is: a component does not
 * cross a framework boundary.
 */
export declare const AUTH_SHOWCASE_EYEBROW_TEXT = "Built for real work";
export declare const AUTH_SHOWCASE_HEADLINE = "The admin surface your product deserves.";
export declare const AUTH_SHOWCASE_POINTS: readonly {
    icon: string;
    title: string;
    body: string;
}[];
export declare const COMPANIES_SCREEN: RecordScreenSpec<Company>;
export declare const PEOPLE_SCREEN: RecordScreenSpec<Person>;
export declare const COMPANIES_ROWS: Company[];
export declare const PEOPLE_ROWS: Person[];
