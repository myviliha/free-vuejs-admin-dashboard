/**
 * Which component family each edition actually ships (`PD-013`).
 *
 * One catalogue, three consumers: the React gallery, the Vue gallery and the HTML generator all
 * read it, so they cannot disagree about what exists. Before this, React's gallery was 537
 * hand-written lines, Vue had no list at all, and the count of what Vue was missing lived as three
 * filenames inside `scripts/check-products.mjs`.
 *
 * **Declared, not derived, and that is deliberate.** Mapping a React family to its Vue counterpart
 * needs judgement a filename cannot carry: `Chart.vue` wraps `@tanstack/charts`, so it is
 * `tanstack-chart`'s port and the Recharts family has no Vue counterpart at all. Those judgements
 * live here where they can be argued with, and `scripts/check-editions.mjs` checks every one of
 * them against the filesystem and the Vue package's exports.
 *
 * Framework-free, so it reaches every edition through `@viliha/vui-core`.
 */
/** The editions with a package today. Angular and Laravel join when they have one. */
export type Edition = "react" | "vue" | "angular" | "html";
/**
 * `ships` is a real implementation. `pattern` is the HTML edition's native equivalent wearing the
 * shared classes rather than a port of the React markup. `absent` is not built, and always carries
 * a note saying what a reader needs instead.
 */
export type Availability = "ships" | "pattern" | "absent";
export interface FamilyAvailability {
    /** The module name under `packages/react/src`, which is the shared key across all three editions. */
    readonly name: string;
    readonly react: Availability;
    readonly vue: Availability;
    readonly angular: Availability;
    readonly html: Availability;
    /**
     * Which tier the family is sold in (`PD-043`).
     *
     * **Required, and that is the whole point of it being here.** The rule is "anything not named as
     * Free is Pro", and a rule whose default is invisible is a habit: a family added without a thought
     * about pricing would have been free forever because nobody remembered. Declaring it per row makes
     * the omission a type error, and `check:tiers` compares the totals against `products/*.json`, which
     * is what actually ships.
     *
     * The Free set is `PRODUCT.md` § Free and Pro's Free column, which is a named exception list rather
     * than a category: the standard layout, the standard form controls, the basic table, the basic
     * charts and the basic feedback primitives.
     */
    readonly tier: "free" | "pro";
    /** Only when Vue's export is not the PascalCase of `name`. This is where the judgement lives. */
    readonly vueExport?: string;
    /**
     * Only when the Angular family does not live in `packages/angular/src/<name>.ts`.
     *
     * Three do not, and each for a reason worth stating rather than renaming a file over:
     * `multi-combobox` shares `combobox.ts` because the two are the same picker with one difference,
     * `toggle-group` shares `toggle.ts` for the same reason, and `tanstack-chart` is in `chart.ts`
     * with the native chart directives because that file is where the charting decision is written.
     */
    readonly angularFile?: string;
    /** Required whenever `angular` is `absent`: what an Angular reader needs instead. */
    readonly angularNote?: string;
    /** Required whenever any edition is `absent`: what a reader needs instead of markup. */
    readonly note?: string;
    /**
     * The editions where this family renders nothing: a provider, a context, a hook, or a data array.
     *
     * A gallery listing one under "ships, no example here yet" promises an example that is never
     * coming. There is nothing to draw, and saying so is different from being behind.
     *
     * **Per edition, because the fact is.** `record-field` exports three components in React and
     * only `usePersistentState` and `clearPersisted` in Vue, so it draws in one edition and not the
     * other. A single flag for the family got that wrong in both directions on the first attempt.
     *
     * `scripts/check-editions.mjs` checks the `react` entries against `state: "chrome"` in the React
     * gallery, **one direction only**. The reverse does not hold: the gallery marks `code` chrome
     * because there is no HTML partial worth emitting for it, and `Code` is a real component that
     * renders `<code>` in both editions.
     */
    readonly nothingToDraw?: readonly Edition[];
}
export declare const FAMILY_AVAILABILITY: readonly FamilyAvailability[];
/** Everything the edition ships, including HTML's native patterns. */
export declare const familiesFor: (edition: Edition) => readonly FamilyAvailability[];
/** Everything it does not, each with the reason. A gallery shows these rather than omitting them. */
export declare const missingFor: (edition: Edition) => readonly FamilyAvailability[];
/** The denominator all three galleries quote, so none of them can invent its own. */
export declare const FAMILY_COUNT: number;
/**
 * The families an edition **could** ship, which is not all of them (`PD-045`).
 *
 * Seven of the sixty-eight are React plumbing with no markup at all: three providers
 * (`auth-context`, `config`, `theme-provider`), a toast runtime (`sonner`), a pass-through
 * (`code`), a layout hook (`page-chrome`), and `form`, which cannot render outside a
 * `react-hook-form` context. No static or template edition could ever ship them, and counting them
 * made the HTML edition read seven short for work nobody could do.
 *
 * So a template edition reports against this denominator and says which seven it excludes. React and
 * Vue keep 68, because for them the plumbing is the product.
 */
export declare const renderableFor: (edition: Edition) => readonly FamilyAvailability[];
/** The families no template edition can ship, with their reason on each row. */
export declare const PLUMBING_FAMILIES: readonly ["auth-context", "code", "config", "form", "page-chrome", "sonner", "theme-provider"];
/**
 * How many families a template edition is measured against.
 *
 * Derived, so adding a plumbing family moves the denominator rather than leaving a hand-typed number
 * behind. `check:inventory` holds the documents to it.
 */
export declare const RENDERABLE_COUNT: number;
