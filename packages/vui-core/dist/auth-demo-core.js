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
export const PUBLIC_EMAIL_DOMAINS = [
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "ymail.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "msn.com",
    "icloud.com",
    "me.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
    "gmx.com",
    "mail.com",
    "zoho.com",
];
const EMAIL_RE = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
/** Validate an email and reject personal/public domains (business email only). */
export function checkBusinessEmail(email) {
    const match = email.trim().toLowerCase().match(EMAIL_RE);
    const domain = match?.[1];
    if (!domain)
        return { ok: false, reason: "format" };
    if (PUBLIC_EMAIL_DOMAINS.includes(domain)) {
        return { ok: false, reason: "public" };
    }
    return { ok: true, domain };
}
export const TIMEZONES = [
    "UTC",
    "America/Los_Angeles",
    "America/New_York",
    "Europe/London",
    "Europe/Paris",
    "Asia/Singapore",
    "Asia/Ho_Chi_Minh",
    "Asia/Tokyo",
    "Australia/Sydney",
];
export const PLANS = [
    {
        id: "free",
        name: "Free",
        price: "$0",
        cadence: "forever",
        tagline: "Get started, no credit card required.",
        features: ["10k API calls / mo", "1 project", "Community support"],
    },
    {
        id: "growth",
        name: "Growth",
        price: "$0",
        cadence: "during beta",
        tagline: "Most teams start here.",
        features: ["1M API calls / mo", "Unlimited projects", "Email support", "Webhooks"],
        popular: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        cadence: "contact us",
        tagline: "SAML SSO, SLAs, and audit logs.",
        features: ["Unlimited calls", "SAML / SSO", "Audit log export", "Dedicated support"],
    },
];
export const TEAM_ROLES = ["Admin", "Member", "Billing", "Read-only"];
/* ── The onboarding wizard (`PD-039`) ─────────────────────────────────────────
 *
 * Five steps, an icon key each, and the two rules that decide the footer. Shared because the footer
 * is where an edition's behaviour shows: which steps you may skip and which will not let you past.
 */
/** A step's key, its label and its glyph key. A component cannot cross the boundary; a string can. */
export const ONBOARDING_STEPS = [
    { key: "profile", label: "Profile", icon: "user-circle" },
    { key: "company", label: "Company", icon: "building2" },
    { key: "token", label: "API token", icon: "lock" },
    { key: "plan", label: "Plan", icon: "check" },
    { key: "team", label: "Team", icon: "users" },
];
/** Profile wants both names, company wants a name, and the rest are satisfiable. */
export function canLeaveOnboardingStep(step, values) {
    if (step === 0)
        return values.firstName.trim() !== "" && values.lastName.trim() !== "";
    if (step === 1)
        return values.companyName.trim() !== "";
    return true;
}
/** The API token and the team invites are optional, so those two steps offer Skip. */
export const isSkippableOnboardingStep = (step) => step === 2 || step === 4;
/** How many characters follow the `vui_sk_` prefix. Fixed, so the field's width does not jump. */
export const DEMO_TOKEN_LENGTH = 20;
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
export function demoApiToken() {
    let body = "";
    while (body.length < DEMO_TOKEN_LENGTH)
        body += Math.random().toString(36).slice(2);
    return `vui_sk_${body.slice(0, DEMO_TOKEN_LENGTH)}`;
}
export const ONBOARDING_COPY = {
    titles: {
        profile: "Set up your profile",
        company: "Company information",
        token: "Generate your API token",
        plan: "Choose your plan",
        team: "Invite your team",
    },
    tokenLabel: "API token",
    generate: "Generate",
    popular: "Most popular",
    addAnother: "Add another",
    invitePlaceholder: "teammate@company.com",
    defaultRole: "Member",
    back: "Back",
    skip: "Skip",
    next: "Continue",
    finish: "Finish & enter workspace",
};
/** How long the copied tick stays before reverting, in milliseconds. */
export const COPY_FEEDBACK_MS = 1_200;
