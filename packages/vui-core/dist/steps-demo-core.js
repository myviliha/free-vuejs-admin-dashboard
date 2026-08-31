/**
 * The wizard demo's steps, plans and slug rule (`PD-031`).
 *
 * **Shared because a wizard is mostly its data.** The screen is a stepper, three sections and a
 * review list, and every edition draws the same scaffold from `class-variants.ts`. What was left to
 * diverge is exactly the part a reader compares: how many steps there are, what they are called, and
 * whether the third plan is "Enterprise" or "Business". Retyping that into a `.vue` file is how two
 * demos of the same product start describing different products.
 *
 * `slugify` is here for a sharper reason than tidiness. The screen auto-fills the slug from the name
 * until the user edits it, so the two editions agree only if the transformation agrees: a rule that
 * strips punctuation in one and not the other makes the same keystrokes produce different URLs.
 *
 * Framework-free by construction, so `@viliha/vui-core` carries it. Nothing here imports a component.
 */
export const WIZARD_STEPS = [
    { label: "Organization", description: "Business details" },
    { label: "Account", description: "Your credentials" },
    { label: "Review", description: "Confirm details" },
];
export const WIZARD_PLANS = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise" },
];
/** Lower-case, punctuation to hyphens, no leading or trailing hyphen. */
export function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
/** The review step's rows, so both editions summarise the same four fields in the same order. */
export function wizardSummary(values) {
    const plan = WIZARD_PLANS.find((p) => p.value === values.plan)?.label ?? values.plan;
    return [
        ["Name", values.name || "—"],
        ["Slug", values.slug || "—"],
        ["Plan", plan],
        ["Email", values.email || "—"],
    ];
}
/* ── Register your business (`PD-035`) ────────────────────────────────────────
 *
 * The same three steps, the same three plans and the same slug rule as `/steps`, which is why they
 * are not repeated here: React had a **second** hand-written copy of all three in
 * `register-business/page.tsx`, plus a fourth copy of the review summary, and moving `/steps` to
 * this module is what made that visible. One list, four consumers.
 *
 * What is new is this screen's own copy, which `/steps` does not have.
 */
export const REGISTER_BUSINESS = {
    title: "Register Your Business",
    lead: "Create your merchant account on Vui",
    logoLabel: "Upload Logo",
    logoHint: "PNG, JPG up to 2MB",
    slugHint: "Unique identifier, auto-generated from name",
    sections: {
        basic: "Basic Information",
        credentials: "Your credentials",
        review: "Confirm details",
    },
};
/**
 * Whether the wizard may leave a step.
 *
 * Shared because it is a **rule**, not a layout: step 0 wants a name and a slug, step 1 wants an
 * email and a password, and step 2 is always satisfiable. React and Vue disagreeing here means one
 * demo lets you through an empty form and the other does not.
 */
export function canLeaveRegistrationStep(step, values) {
    if (step === 0)
        return values.name.trim() !== "" && values.slug.trim() !== "";
    if (step === 1)
        return values.email.trim() !== "" && values.password !== "";
    return true;
}
