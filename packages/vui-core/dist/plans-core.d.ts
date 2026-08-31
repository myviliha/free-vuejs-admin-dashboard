/**
 * The pricing plans, shared because every edition renders them.
 *
 * The documentation's free-and-pro page, the React pricing screen and the Vue one all read this. It
 * lived in `@repo/web-chrome` until 2026-08-23, which is a React package, so the Vue pricing screen
 * would have had to import React or retype a price list. Two copies of a price list is the one
 * duplication nobody notices until a customer does, and `@repo/web-chrome/plans` re-exports this so
 * no existing consumer had to move.
 *
 * Framework-free by construction, which it already was: this file has never had an import.
 */
export type Plan = "free" | "pro";
export type PlanEntry = {
    /** Grouping shown as the first column. */
    area: "Theme" | "Layout" | "Components" | "Data" | "Tooling" | "Support";
    item: string;
    plan: Plan;
    /** One line of detail. Says "planned" where Pro is not built yet. */
    note: string;
};
export declare const PLAN_MATRIX: PlanEntry[];
export declare const PLAN_LABEL: Record<Plan, string>;
/**
 * The one-sentence promise, quoted in the docs, the README and the demo.
 *
 * It used to end "so nothing free today can move behind the paywall later", and on 2026-08-17
 * `RecordView` did exactly that. The half of the promise that is enforceable by npm rather than by
 * us is the half that survives, and it is the half worth making: what you installed is yours.
 * Overstating it once is why this constant now says less and means it.
 */
export declare const PLAN_PLEDGE = "Every version already published is MIT permanently, so anything you have installed stays yours under the licence it shipped with, forever, including RecordView up to 1.66. What changes is where new work goes.";
export declare const PLAN_AREAS: ("Support" | "Components" | "Data" | "Theme" | "Layout" | "Tooling")[];
export declare function planCounts(): Record<Plan, number>;
