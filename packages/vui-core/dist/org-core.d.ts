/**
 * The organization contract and the two decisions the switcher makes, framework-free.
 *
 * `Organization` is a contract a host implements, like `AuthContract`: sharing it means one list of
 * organizations type-checks against either edition. `resolveCurrentId` and `resolveAddTarget` are the two
 * rules worth not writing twice, because both fail quietly rather than loudly: the first picks which
 * tenant a user is looking at, and the second decides whether the create row exists at all.
 */
import type { ThemeAwareOrgConfig } from "./config-core.js";
export type Organization = {
    id: string;
    name: string;
    /** Subscription plan name, shown on the row's second line. */
    plan?: string;
    /** Drives the icon beside the plan: a check, or a warning for anything that
     *  needs attention. */
    planStatus?: "active" | "trialing" | "past_due" | "canceled";
    /** Square mark for the row. A letter tile is used when there isn't one. */
    logoUrl?: string;
    /** This tenant's brand, handed to `ThemeConfigProvider` so switching
     *  organization repaints the app in their colours. */
    theme?: ThemeAwareOrgConfig;
};
/** What happens on a switch. Return a promise and the row shows a pending state
 *  until it settles, so a server round trip doesn't look like a dead click. */
export type SwitchHandler = (org: Organization) => void | Promise<void>;
/** The current organization: the wanted one if it still exists, else the first. */
export declare function resolveCurrentId(organizations: Organization[], wanted: string | undefined): string | undefined;
/** Where the create row points: a handler wins, then this instance's route, then the app's config. */
export declare function resolveAddTarget(onAdd: (() => void) | undefined, addHref: string | undefined, configuredHref: string | undefined): {
    onAdd?: () => void;
    href?: string;
};
