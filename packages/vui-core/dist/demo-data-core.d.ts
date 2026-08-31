/**
 * The demo applications' fixture data, shared by every edition.
 *
 * **Why it is here and not in the app.** This was `apps/web/reactjs/lib/demo-data.ts`, and while one
 * edition had a demo that was the right place for it. `CR-VP-001` makes the React demo the reference
 * every other edition's demo has to match, and a demo whose customer list reads differently in two
 * editions looks like two products rather than one design system. So the rows move next to the
 * navigation tree they are navigated by, and each edition imports them.
 *
 * Framework-free by construction: types and array literals, no imports at all, which is why moving it
 * cost nothing. `apps/web/reactjs/lib/demo-data.ts` now re-exports this so nothing that imported it
 * had to change.
 */
export type OrganizationStatus = "active" | "trial" | "suspended";
export interface DemoOrganization {
    id: number;
    name: string;
    url: string;
    email: string;
    countryCode: string;
    country: string;
    branches: number;
    employees: number;
    status: OrganizationStatus;
    /** Fallback initials for the avatar. */
    initials: string;
    /** Relative "created/updated" label for the recent list. */
    updated: string;
}
export interface DemoEmployee {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    branch: string;
    organization: string;
    isActive: boolean;
}
export interface DemoMarket {
    id: number;
    name: string;
    organization: string;
    radiusMiles: number | null;
}
export interface RegionBreakdown {
    region: string;
    organizations: number;
}
export declare const organizations: DemoOrganization[];
export declare const employees: DemoEmployee[];
export declare const markets: DemoMarket[];
export declare const regionBreakdown: RegionBreakdown[];
export declare const stats: {
    organizations: {
        label: string;
        value: number;
        delta: string;
        trend: "up";
    };
    employees: {
        label: string;
        value: number;
        delta: string;
        trend: "up";
    };
    activeMarkets: {
        label: string;
        value: number;
        delta: string;
        trend: "up";
    };
    branches: {
        label: string;
        value: number;
        delta: string;
        trend: "flat";
    };
};
/**
 * The dashboard's one-line summary, shown in the page's action region.
 *
 * Copy rather than data, and shared for the same reason: it is a sentence the demo says about the
 * product, so it has to say the same sentence in every edition.
 */
export declare const DASHBOARD_SUMMARY = "Overview of organizations, teams, and markets across the platform.";
