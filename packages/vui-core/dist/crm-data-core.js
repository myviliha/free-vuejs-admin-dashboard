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
export const companies = [
    {
        id: 1,
        name: "Northwind Retail",
        domain: "northwind.example.com",
        industry: "Retail",
        employees: 340,
        city: "Seattle",
        country: "United States",
    },
    {
        id: 2,
        name: "Sakura Foods",
        domain: "sakura.example.jp",
        industry: "Food & Beverage",
        employees: 210,
        city: "Osaka",
        country: "Japan",
    },
    {
        id: 3,
        name: "Alpine Logistics",
        domain: "alpine.example.ch",
        industry: "Logistics",
        employees: 96,
        city: "Zürich",
        country: "Switzerland",
    },
    {
        id: 4,
        name: "Lagos Digital",
        domain: "lagosdigital.example.ng",
        industry: "Technology",
        employees: 54,
        city: "Lagos",
        country: "Nigeria",
    },
    {
        id: 5,
        name: "Meridian Media",
        domain: "meridian.example.uk",
        industry: "Media",
        employees: 178,
        city: "London",
        country: "United Kingdom",
    },
    {
        id: 6,
        name: "Nordic Wear",
        domain: "nordicwear.example.se",
        industry: "Retail",
        employees: 133,
        city: "Stockholm",
        country: "Sweden",
    },
    {
        id: 7,
        name: "Coral Bay Resorts",
        domain: "coralbay.example.au",
        industry: "Hospitality",
        employees: 264,
        city: "Cairns",
        country: "Australia",
    },
    {
        id: 8,
        name: "Pampas Commerce",
        domain: "pampas.example.ar",
        industry: "Retail",
        employees: 71,
        city: "Buenos Aires",
        country: "Argentina",
    },
];
export const people = [
    {
        id: 1,
        firstName: "Ava",
        lastName: "Bennett",
        email: "ava.bennett@northwind.example.com",
        phone: "+1 206 555 0110",
        jobTitle: "Head of Ops",
        company: "Northwind Retail",
        city: "Seattle",
    },
    {
        id: 2,
        firstName: "Haruto",
        lastName: "Tanaka",
        email: "haruto.tanaka@sakura.example.jp",
        phone: "+81 6 6555 0177",
        jobTitle: "Supply Lead",
        company: "Sakura Foods",
        city: "Osaka",
    },
    {
        id: 3,
        firstName: "Lena",
        lastName: "Fischer",
        email: "lena.fischer@alpine.example.ch",
        phone: "+41 44 555 0143",
        jobTitle: "Fleet Manager",
        company: "Alpine Logistics",
        city: "Zürich",
    },
    {
        id: 4,
        firstName: "Chidi",
        lastName: "Okafor",
        email: "chidi.okafor@lagosdigital.example.ng",
        phone: "+234 1 555 0122",
        jobTitle: "CTO",
        company: "Lagos Digital",
        city: "Lagos",
    },
    {
        id: 5,
        firstName: "Mia",
        lastName: "Nguyen",
        email: "mia.nguyen@coralbay.example.au",
        phone: "+61 7 5555 0166",
        jobTitle: "Guest Director",
        company: "Coral Bay Resorts",
        city: "Cairns",
    },
    {
        id: 6,
        firstName: "Erik",
        lastName: "Lindqvist",
        email: "erik.lindqvist@nordicwear.example.se",
        phone: "+46 8 555 0199",
        jobTitle: "Retail Lead",
        company: "Nordic Wear",
        city: "Stockholm",
    },
    {
        id: 7,
        firstName: "Sofia",
        lastName: "Rossi",
        email: "sofia.rossi@meridian.example.uk",
        phone: "+44 20 5555 0188",
        jobTitle: "Editor",
        company: "Meridian Media",
        city: "London",
    },
    {
        id: 8,
        firstName: "Diego",
        lastName: "Alvarez",
        email: "diego.alvarez@pampas.example.ar",
        phone: "+54 11 5555 0133",
        jobTitle: "Sales Manager",
        company: "Pampas Commerce",
        city: "Buenos Aires",
    },
];
export const OPPORTUNITY_STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Won"];
export const opportunities = [
    {
        id: 1,
        name: "Enterprise plan",
        company: "Northwind Retail",
        amount: 48000,
        stage: "Negotiation",
        owner: "Ava Bennett",
        closeDate: "2026-08-15",
    },
    {
        id: 2,
        name: "Signals add-on",
        company: "Sakura Foods",
        amount: 12000,
        stage: "Proposal",
        owner: "Haruto Tanaka",
        closeDate: "2026-07-30",
    },
    {
        id: 3,
        name: "Pilot expansion",
        company: "Alpine Logistics",
        amount: 8000,
        stage: "Qualified",
        owner: "Lena Fischer",
        closeDate: "2026-09-01",
    },
    {
        id: 4,
        name: "Platform migration",
        company: "Lagos Digital",
        amount: 26000,
        stage: "Lead",
        owner: "Chidi Okafor",
        closeDate: "2026-09-20",
    },
    {
        id: 5,
        name: "Seasonal campaign",
        company: "Coral Bay Resorts",
        amount: 15500,
        stage: "Won",
        owner: "Mia Nguyen",
        closeDate: "2026-06-28",
    },
    {
        id: 6,
        name: "Retail rollout",
        company: "Nordic Wear",
        amount: 21000,
        stage: "Proposal",
        owner: "Erik Lindqvist",
        closeDate: "2026-08-05",
    },
    {
        id: 7,
        name: "Content personalization",
        company: "Meridian Media",
        amount: 33000,
        stage: "Qualified",
        owner: "Sofia Rossi",
        closeDate: "2026-08-22",
    },
    {
        id: 8,
        name: "Growth tier",
        company: "Pampas Commerce",
        amount: 9500,
        stage: "Lead",
        owner: "Diego Alvarez",
        closeDate: "2026-09-10",
    },
    {
        id: 9,
        name: "Renewal + upsell",
        company: "Northwind Retail",
        amount: 18000,
        stage: "Won",
        owner: "Ava Bennett",
        closeDate: "2026-06-15",
    },
];
export const OPPORTUNITY_FIELD_SPECS = [
    { key: "name", label: "Name", icon: "target", editable: true, required: true },
    { key: "company", label: "Company", icon: "building2", editable: true },
    { key: "amount", label: "Amount", icon: "coins", editable: true, input: "number" },
    {
        key: "stage",
        label: "Stage",
        icon: "align-left",
        editable: true,
        options: OPPORTUNITY_STAGES.map((s) => ({ value: s, label: s })),
    },
    { key: "owner", label: "Owner", icon: "user-circle", editable: true },
    { key: "closeDate", label: "Close date", icon: "calendar", editable: true, input: "date" },
];
/** A stage's badge tone. Five stages, five tones, and both editions read the same five. */
export const STAGE_BADGE = {
    Lead: "muted",
    Qualified: "secondary",
    Proposal: "warning",
    Negotiation: "default",
    Won: "success",
};
/** Two initials, or `?` for a name with no letters in it. */
export const initials = (name) => name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";
/** Whole dollars. Shared because two demos rounding differently is two different pipelines. */
export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}
/** Name, company or owner. The same three fields in both editions, matched case-insensitively. */
export function filterOpportunities(rows, query) {
    const q = query.trim().toLowerCase();
    if (!q)
        return rows;
    return rows.filter((o) => o.name.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q) ||
        o.owner.toLowerCase().includes(q));
}
/** What a card shows when a field is empty, so neither edition invents its own wording. */
export const OPPORTUNITY_EMPTY = {
    name: "Untitled opportunity",
    company: "No company",
    owner: "Unassigned",
    column: "No opportunities",
};
