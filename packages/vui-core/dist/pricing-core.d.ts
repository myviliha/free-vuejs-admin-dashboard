/**
 * The pricing screen's copy, shared so two editions cannot quote different prices (`PD-032`).
 *
 * **Why a segment type here when `legal-core.ts` refused one.** That module flattens a bold lead-in
 * into the sentence and says why: the emphasis was styling, and keeping it would have meant "a
 * markup language in a data file". The same test gives the opposite answer here. A link to
 * `/docs/free-and-pro` is not decoration, it is where the reader goes to check a claim about what
 * they are paying for, and `RecordView` in a code voice is naming a symbol rather than shouting.
 * Dropping either would change what the answer says, not how it looks.
 *
 * So the format is three shapes and no more: a plain string, a link, and a code span. Not a node
 * tree, no nesting, no attributes. If a fourth is ever wanted, that is the moment to ask whether the
 * copy belongs in a data file at all.
 *
 * **Nothing here is reviewed licence text.** These answers state a licence family, a refund window
 * and a per-developer term, and no lawyer has read any of it: see `PD-030` and
 * `Q-LC-01`…`Q-LC-06`. This module moves the words so the editions cannot disagree about them. It
 * does not make them true, and an agent must not reword them.
 */
/** A run of copy: plain text, a link, or a symbol in a code voice. */
export type CopySegment = string | {
    text: string;
    href: string;
} | {
    code: string;
};
export interface PricingFaq {
    q: string;
    a: readonly CopySegment[];
}
export interface PricingTier {
    /** The headline: a price, or a word where there is no price yet. */
    amount: string;
    cadence?: string;
    perk: string;
    href: string;
    cta: string;
    featured?: boolean;
    bullets: readonly string[];
}
/**
 * Pro's commercial defaults.
 *
 * **The env override is per edition, the numbers are not.** React reads a checkout URL from
 * `process.env.NEXT_PUBLIC_PRO_CHECKOUT_URL` at build time and Vite has no such thing, which is why
 * the tier builders take these as arguments. But review pointed out that leaving the *values* in two
 * hand-written config files reintroduces exactly the divergence this module exists to stop, one file
 * later: two demos quoting different prices, with only a comment binding them. Both apps spread this.
 */
export declare const PRO_DEFAULTS: {
    readonly available: false;
    readonly price: "$149";
    readonly cadence: "one-time, per developer";
    readonly contactEmail: "hello@viliha.com";
};
export declare const PRICING_TITLE = "Pricing";
export declare const PRICING_LEAD = "VUI is free and MIT licensed, the data table included. Pro is the record workflow and the premium blocks, for teams whose data lives on a server and who want someone to ask.";
/**
 * The tiers, minus the two values that cannot be shared.
 *
 * Pro's price, cadence, checkout URL and contact address come from each app's own config, because
 * React reads them from `process.env.NEXT_PUBLIC_*` at build time and Vite cannot. Same split as the
 * site chrome in `PD-023`: the shape is shared, the values are per edition. `proTier` and `teamTier`
 * take them as arguments rather than importing them, which is what keeps this module framework-free.
 */
export declare const FREE_TIER: PricingTier;
export declare function proTier(pro: {
    available: boolean;
    price: string;
    cadence: string;
    checkoutUrl: string;
}): PricingTier;
export declare function teamTier(contactEmail: string): PricingTier;
/** The note under the tiers. Pro is designated and not on sale, and the page says so plainly. */
export declare const PRICING_NOT_ON_SALE: readonly CopySegment[];
export declare const PRICING_NOT_ON_SALE_LEAD = "Pro is not on sale yet.";
export declare const PRICING_FAQ: readonly PricingFaq[];
export declare const PRICING_SPONSOR: readonly CopySegment[];
/** Narrowing helpers, so a renderer is a three-branch `v-if` rather than a type dance. */
export declare const isLink: (s: CopySegment) => s is {
    text: string;
    href: string;
};
export declare const isCode: (s: CopySegment) => s is {
    code: string;
};
