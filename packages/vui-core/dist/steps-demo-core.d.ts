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
/** A step's label and its one-line description, in order. */
export interface WizardStepSpec {
    label: string;
    description: string;
}
export declare const WIZARD_STEPS: readonly WizardStepSpec[];
export declare const WIZARD_PLANS: readonly {
    value: string;
    label: string;
}[];
/** Lower-case, punctuation to hyphens, no leading or trailing hyphen. */
export declare function slugify(value: string): string;
/** The review step's rows, so both editions summarise the same four fields in the same order. */
export declare function wizardSummary(values: {
    name: string;
    slug: string;
    plan: string;
    email: string;
}): readonly (readonly [string, string])[];
export declare const REGISTER_BUSINESS: {
    readonly title: "Register Your Business";
    readonly lead: "Create your merchant account on Vui";
    readonly logoLabel: "Upload Logo";
    readonly logoHint: "PNG, JPG up to 2MB";
    readonly slugHint: "Unique identifier, auto-generated from name";
    readonly sections: {
        readonly basic: "Basic Information";
        readonly credentials: "Your credentials";
        readonly review: "Confirm details";
    };
};
/**
 * Whether the wizard may leave a step.
 *
 * Shared because it is a **rule**, not a layout: step 0 wants a name and a slug, step 1 wants an
 * email and a password, and step 2 is always satisfiable. React and Vue disagreeing here means one
 * demo lets you through an empty form and the other does not.
 */
export declare function canLeaveRegistrationStep(step: number, values: {
    name: string;
    slug: string;
    email: string;
    password: string;
}): boolean;
