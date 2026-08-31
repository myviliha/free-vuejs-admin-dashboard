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
/**
 * Pro's commercial defaults.
 *
 * **The env override is per edition, the numbers are not.** React reads a checkout URL from
 * `process.env.NEXT_PUBLIC_PRO_CHECKOUT_URL` at build time and Vite has no such thing, which is why
 * the tier builders take these as arguments. But review pointed out that leaving the *values* in two
 * hand-written config files reintroduces exactly the divergence this module exists to stop, one file
 * later: two demos quoting different prices, with only a comment binding them. Both apps spread this.
 */
export const PRO_DEFAULTS = {
    available: false,
    price: "$149",
    cadence: "one-time, per developer",
    contactEmail: "hello@viliha.com",
};
export const PRICING_TITLE = "Pricing";
export const PRICING_LEAD = "VUI is free and MIT licensed, the data table included. Pro is the record workflow and the premium blocks, for teams whose data lives on a server and who want someone to ask.";
/**
 * The tiers, minus the two values that cannot be shared.
 *
 * Pro's price, cadence, checkout URL and contact address come from each app's own config, because
 * React reads them from `process.env.NEXT_PUBLIC_*` at build time and Vite cannot. Same split as the
 * site chrome in `PD-023`: the shape is shared, the values are per edition. `proTier` and `teamTier`
 * take them as arguments rather than importing them, which is what keeps this module framework-free.
 */
export const FREE_TIER = {
    amount: "Free",
    perk: "Everything published today, MIT licensed, forever.",
    href: "/docs/installation",
    cta: "Get started",
    bullets: [
        "The React component library, bar the record workflow",
        "DataTable: sort, search, paginate, select, hide columns",
        "Charts, auth screens and every overlay and form control",
        "28 demo pages and the init scaffolder",
        "The theme as plain CSS for any framework",
        "Docs, requirement templates and the MCP server",
    ],
};
export function proTier(pro) {
    return {
        amount: pro.available ? pro.price : "Pro",
        cadence: pro.available ? pro.cadence : "in development",
        perk: pro.available
            ? "Premium blocks and components we build on top of the free core."
            : "RecordView ships today. Checkout is not open yet, so tell us what else you need and it goes to the front of the queue.",
        href: pro.checkoutUrl,
        cta: pro.available ? "Buy Pro" : "Register interest",
        featured: true,
        bullets: [
            "RecordView: server-backed filters, bulk actions, import and export",
            "Premium blocks: billing, roles and permissions, audit log, inbox",
            "The record workflow for Vue and Svelte",
            "Priority on bug reports",
            "Commercial license and an invoice",
        ],
    };
}
export function teamTier(contactEmail) {
    return {
        amount: "Team",
        cadence: "talk to us",
        perk: "Bigger teams, procurement, or work you want built.",
        href: `mailto:${contactEmail}?subject=VUI%20for%20teams`,
        cta: "Get in touch",
        bullets: [
            "Site license for the whole team",
            "A named counterparty for your legal review",
            "Custom blocks and framework ports, quoted",
        ],
    };
}
/** The note under the tiers. Pro is designated and not on sale, and the page says so plainly. */
export const PRICING_NOT_ON_SALE = [
    // The leading space belongs to the shared copy, not to each renderer. React wrote it as `{" "}`
    // after the bold lead, and Vue's compiler condenses a whitespace-only node containing a newline
    // away, so the lead ran straight into `RecordView`. One space in one place cannot diverge.
    " ",
    { code: "RecordView" },
    " is designated Pro and is built, but how it is delivered and priced is still being settled, so until it is, it stays in the package you already install, under the licence it already shipped with. For the rest we would rather build the blocks people actually ask for than guess and ship a list nobody wanted. Tell us which ones matter and you set the order.",
];
export const PRICING_NOT_ON_SALE_LEAD = "Pro is not on sale yet.";
export const PRICING_FAQ = [
    {
        q: "Is the free version going away?",
        a: [
            "No, and one thing did move, so here is the honest version rather than the reassuring one. On 17 August 2026 ",
            { code: "RecordView" },
            ", the server-backed record workflow, became a Pro component, and the free package gained ",
            { code: "DataTable" },
            " in its place. Everything already published stays MIT permanently, including RecordView up to 1.66: that is enforced by npm, not by us, so a lockfile you have today keeps working forever. What changed is where new work on the record workflow goes. ",
            { text: "The full breakdown", href: "/docs/free-and-pro" },
            " names the promise this broke instead of quietly rewording it.",
        ],
    },
    {
        q: "What license is Pro?",
        a: [
            "A commercial license, per developer, perpetual for the version you buy. You get the source and can use it in unlimited projects, including client work. You cannot resell or republish it. The full terms ship with the package.",
        ],
    },
    {
        q: "Do I need Pro to use VUI commercially?",
        a: [
            "No. MIT already lets you ship VUI in commercial products with no payment and no attribution requirement. Pro buys extra components and our time, not permission.",
        ],
    },
    {
        q: "What about refunds?",
        a: ["Fourteen days, no questions. Email us and we refund it."],
    },
];
export const PRICING_SPONSOR = [
    "Not buying anything and just want to help? ",
    { text: "Sponsorship", href: "/docs/sponsor" },
    " keeps the free core maintained.",
];
/** Narrowing helpers, so a renderer is a three-branch `v-if` rather than a type dance. */
export const isLink = (s) => typeof s === "object" && "href" in s;
export const isCode = (s) => typeof s === "object" && "code" in s;
