/**
 * The CRM fixtures: companies, people and opportunities.
 *
 * Moved here from `apps/web/reactjs/lib/crm-data.ts` so both editions read one set of rows. While
 * it lived in the app, a Vue CRM screen had to either import from a Next.js app or retype the
 * fixtures, and retyped fixtures are two demos that quietly show different customers.
 *
 * Framework-free by construction: `packages/core/scripts/build.mjs` fails the build on a React or
 * Vue import here.
 */
/**
 * In-memory CRM mock data (companies, people, opportunities) with light
 * relations (people belong to a company; opportunities link a company).
 * Swap this for a real data/API layer when you wire up a backend.
 */
export interface Company {
    id: number;
    name: string;
    domain: string;
    industry: string;
    employees: number;
    city: string;
    country: string;
}
export declare const companies: Company[];
export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    company: string;
    city: string;
}
export declare const people: Person[];
export declare const OPPORTUNITY_STAGES: readonly ["Lead", "Qualified", "Proposal", "Negotiation", "Won"];
export type OpportunityStage = (typeof OPPORTUNITY_STAGES)[number];
export interface Opportunity {
    id: number;
    name: string;
    company: string;
    amount: number;
    stage: OpportunityStage;
    owner: string;
    closeDate: string;
}
export declare const opportunities: Opportunity[];
/** The slide-over's fields. `icon` is a glyph key, bound to a component per edition. */
export interface OpportunityFieldSpec {
    key: keyof Opportunity;
    label: string;
    icon: string;
    editable: true;
    required?: boolean;
    input?: "number" | "date";
    options?: readonly {
        value: string;
        label: string;
    }[];
}
export declare const OPPORTUNITY_FIELD_SPECS: readonly OpportunityFieldSpec[];
/** A stage's badge tone. Five stages, five tones, and both editions read the same five. */
export declare const STAGE_BADGE: Record<OpportunityStage, "muted" | "secondary" | "warning" | "default" | "success">;
/** Two initials, or `?` for a name with no letters in it. */
export declare const initials: (name: string) => string;
/** Whole dollars. Shared because two demos rounding differently is two different pipelines. */
export declare function formatCurrency(amount: number): string;
/** Name, company or owner. The same three fields in both editions, matched case-insensitively. */
export declare function filterOpportunities(rows: readonly Opportunity[], query: string): readonly Opportunity[];
/** What a card shows when a field is empty, so neither edition invents its own wording. */
export declare const OPPORTUNITY_EMPTY: {
    readonly name: "Untitled opportunity";
    readonly company: "No company";
    readonly owner: "Unassigned";
    readonly column: "No opportunities";
};
