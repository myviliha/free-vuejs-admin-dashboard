/**
 * The onboarding and sign-up fixtures, shared because two editions render them (`PD-039`).
 *
 * It lived in `apps/web/reactjs/lib`, so the Vue onboarding screen would have had to import from a
 * Next.js app or retype a plan list and thirty timezones. It has never had an import, so moving it
 * cost nothing; `@viliha/vui-core` carries it now and the React app reads it from there.
 */
/**
 * Mock constants + helpers for the sign-in / sign-up / onboarding demo.
 * No network, no real auth — everything is in-memory to showcase the flow.
 */
/** Personal/consumer email providers that are blocked at sign-up (business only). */
export declare const PUBLIC_EMAIL_DOMAINS: string[];
export type EmailCheck = {
    ok: true;
    domain: string;
} | {
    ok: false;
    reason: "format" | "public";
};
/** Validate an email and reject personal/public domains (business email only). */
export declare function checkBusinessEmail(email: string): EmailCheck;
export declare const TIMEZONES: string[];
export type OnboardingPlan = {
    id: string;
    name: string;
    price: string;
    cadence: string;
    tagline: string;
    features: string[];
    popular?: boolean;
};
export declare const PLANS: OnboardingPlan[];
export declare const TEAM_ROLES: readonly ["Admin", "Member", "Billing", "Read-only"];
export type TeamRole = (typeof TEAM_ROLES)[number];
/** A step's key, its label and its glyph key. A component cannot cross the boundary; a string can. */
export declare const ONBOARDING_STEPS: readonly [{
    readonly key: "profile";
    readonly label: "Profile";
    readonly icon: "user-circle";
}, {
    readonly key: "company";
    readonly label: "Company";
    readonly icon: "building2";
}, {
    readonly key: "token";
    readonly label: "API token";
    readonly icon: "lock";
}, {
    readonly key: "plan";
    readonly label: "Plan";
    readonly icon: "check";
}, {
    readonly key: "team";
    readonly label: "Team";
    readonly icon: "users";
}];
/** Profile wants both names, company wants a name, and the rest are satisfiable. */
export declare function canLeaveOnboardingStep(step: number, values: {
    firstName: string;
    lastName: string;
    companyName: string;
}): boolean;
/** The API token and the team invites are optional, so those two steps offer Skip. */
export declare const isSkippableOnboardingStep: (step: number) => step is 4 | 2;
/** How many characters follow the `vui_sk_` prefix. Fixed, so the field's width does not jump. */
export declare const DEMO_TOKEN_LENGTH = 20;
/**
 * A demo API token, always the same length.
 *
 * **`Math.random().toString(36).slice(2, 12)` is not always ten characters.** A random value with
 * trailing zeros in base 36, or one small enough to need fewer digits, comes out short: measured at
 * roughly 1,551 draws in 200,000, so about eight in a thousand. React's version had the same slice
 * and produced a token one or two characters short that often, which is invisible in a demo and made
 * a length assertion flaky. Padding is one call and removes both.
 *
 * ponytail: still `Math.random`, because a demo token only has to look like one. A real token is
 * minted server-side and this is the seam where that call goes.
 */
export declare function demoApiToken(): string;
export declare const ONBOARDING_COPY: {
    readonly titles: {
        readonly profile: "Set up your profile";
        readonly company: "Company information";
        readonly token: "Generate your API token";
        readonly plan: "Choose your plan";
        readonly team: "Invite your team";
    };
    readonly tokenLabel: "API token";
    readonly generate: "Generate";
    readonly popular: "Most popular";
    readonly addAnother: "Add another";
    readonly invitePlaceholder: "teammate@company.com";
    readonly defaultRole: "Member";
    readonly back: "Back";
    readonly skip: "Skip";
    readonly next: "Continue";
    readonly finish: "Finish & enter workspace";
};
/** How long the copied tick stays before reverting, in milliseconds. */
export declare const COPY_FEEDBACK_MS = 1200;
