/**
 * The record screens' fixture data, shared by every edition.
 *
 * Moved from `apps/web/reactjs/lib/mock-data.ts` when the Vue demo started building the same screens.
 * Same argument as `demo-data-core.ts`: a demo whose branch list reads differently in two editions looks
 * like two products, and this file had **zero imports**, so moving it cost nothing.
 */
// ── Records ────────────────────────────────────────────────────────────────
// Northwind Retail's US branches — US phone numbers so the Branches form can
// demo email + US-phone format validation and the Headquarter checkbox.
export const branches = [
    {
        id: 1,
        organization: "Northwind Retail",
        name: "Seattle",
        code: "SEA",
        email: "seattle@northwind.example.com",
        phone: "(206) 555-0110",
        city: "Seattle",
        isHeadquarters: true,
    },
    {
        id: 2,
        organization: "Northwind Retail",
        name: "Portland",
        code: "PDX",
        email: "portland@northwind.example.com",
        phone: "(503) 555-0134",
        city: "Portland",
        isHeadquarters: false,
    },
    {
        id: 3,
        organization: "Northwind Retail",
        name: "San Francisco",
        code: "SFO",
        email: "sf@northwind.example.com",
        phone: "(415) 555-0177",
        city: "San Francisco",
        isHeadquarters: false,
    },
    {
        id: 4,
        organization: "Northwind Retail",
        name: "Austin",
        code: "AUS",
        email: "austin@northwind.example.com",
        phone: "(512) 555-0188",
        city: "Austin",
        isHeadquarters: false,
    },
    {
        id: 5,
        organization: "Northwind Retail",
        name: "Denver",
        code: "DEN",
        email: "denver@northwind.example.com",
        phone: "(303) 555-0143",
        city: "Denver",
        isHeadquarters: false,
    },
    {
        id: 6,
        organization: "Northwind Retail",
        name: "Chicago",
        code: "CHI",
        email: "chicago@northwind.example.com",
        phone: "(312) 555-0166",
        city: "Chicago",
        isHeadquarters: false,
    },
    {
        id: 7,
        organization: "Northwind Retail",
        name: "New York",
        code: "NYC",
        email: "ny@northwind.example.com",
        phone: "(212) 555-0199",
        city: "New York",
        isHeadquarters: false,
    },
    {
        id: 8,
        organization: "Northwind Retail",
        name: "Miami",
        code: "MIA",
        email: "miami@northwind.example.com",
        phone: "(305) 555-0122",
        city: "Miami",
        isHeadquarters: false,
    },
];
export const departments = [
    { id: 1, organization: "Northwind Retail", title: "Operations", code: "OPS", employees: 84 },
    { id: 2, organization: "Northwind Retail", title: "Merchandising", code: "MER", employees: 41 },
    { id: 3, organization: "Sakura Foods", title: "Supply Chain", code: "SCM", employees: 58 },
    { id: 4, organization: "Alpine Logistics", title: "Fleet", code: "FLT", employees: 33 },
    { id: 5, organization: "Coral Bay Resorts", title: "Guest Services", code: "GST", employees: 96 },
    { id: 6, organization: "Nordic Wear", title: "Retail", code: "RET", employees: 72 },
    { id: 7, organization: "Lagos Digital", title: "Engineering", code: "ENG", employees: 27 },
    { id: 8, organization: "Meridian Media", title: "Editorial", code: "EDT", employees: 45 },
];
export const markets = [
    {
        id: 1,
        organization: "Northwind Retail",
        name: "Pacific Northwest",
        centerLatitude: 47.6062,
        centerLongitude: -122.3321,
        radiusMiles: 150,
        postCodes: ["98101", "98052", "97201"],
    },
    {
        id: 2,
        organization: "Sakura Foods",
        name: "Kansai",
        centerLatitude: 34.6937,
        centerLongitude: 135.5023,
        radiusMiles: 60,
        postCodes: [],
    },
    {
        id: 3,
        organization: "Alpine Logistics",
        name: "DACH Core",
        centerLatitude: null,
        centerLongitude: null,
        radiusMiles: null,
        postCodes: [],
    },
    {
        id: 4,
        organization: "Coral Bay Resorts",
        name: "Greater Sydney",
        centerLatitude: -33.8688,
        centerLongitude: 151.2093,
        radiusMiles: 90,
        postCodes: [],
    },
    {
        id: 5,
        organization: "Nordic Wear",
        name: "Mälardalen",
        centerLatitude: 59.3293,
        centerLongitude: 18.0686,
        radiusMiles: 75,
        postCodes: [],
    },
    {
        id: 6,
        organization: "Lagos Digital",
        name: "Lagos Metro",
        centerLatitude: 6.5244,
        centerLongitude: 3.3792,
        radiusMiles: 40,
        postCodes: [],
    },
];
export const businesses = [
    {
        id: 1,
        title: "Retail",
        code: "RETAIL",
        description: "Brick-and-mortar and online consumer sales.",
    },
    {
        id: 2,
        title: "Food & Beverage",
        code: "FNB",
        description: "Food production, distribution, and hospitality.",
    },
    {
        id: 3,
        title: "Logistics",
        code: "LOGISTICS",
        description: "Freight, fleet, and last-mile delivery.",
    },
    {
        id: 4,
        title: "Media",
        code: "MEDIA",
        description: "Publishing, broadcast, and digital content.",
    },
    {
        id: 5,
        title: "Hospitality",
        code: "HOSPITALITY",
        description: "Hotels, resorts, and travel services.",
    },
    {
        id: 6,
        title: "Technology",
        code: "TECH",
        description: "Software, platforms, and IT services.",
    },
];
export const regions = [
    { id: 1, name: "Americas", code: "AMER" },
    { id: 2, name: "Europe, Middle East & Africa", code: "EMEA" },
    { id: 3, name: "Asia-Pacific", code: "APAC" },
];
export const countries = [
    { id: 1, name: "United States", code: "US", region: "Americas" },
    { id: 2, name: "Argentina", code: "AR", region: "Americas" },
    { id: 3, name: "United Kingdom", code: "GB", region: "Europe, Middle East & Africa" },
    { id: 4, name: "Switzerland", code: "CH", region: "Europe, Middle East & Africa" },
    { id: 5, name: "Sweden", code: "SE", region: "Europe, Middle East & Africa" },
    { id: 6, name: "Nigeria", code: "NG", region: "Europe, Middle East & Africa" },
    { id: 7, name: "Japan", code: "JP", region: "Asia-Pacific" },
    { id: 8, name: "Australia", code: "AU", region: "Asia-Pacific" },
];
export const cities = [
    { id: 1, name: "Seattle", state: "Washington", country: "United States" },
    { id: 2, name: "Portland", state: "Oregon", country: "United States" },
    { id: 3, name: "Osaka", state: "Osaka", country: "Japan" },
    { id: 4, name: "Tokyo", state: "Tokyo", country: "Japan" },
    { id: 5, name: "Zürich", state: "Zürich", country: "Switzerland" },
    { id: 6, name: "Cairns", state: "Queensland", country: "Australia" },
    { id: 7, name: "Stockholm", state: "Stockholm", country: "Sweden" },
    { id: 8, name: "Lagos", state: "Lagos", country: "Nigeria" },
];
export const currencies = [
    { id: 1, name: "US Dollar", code: "USD", symbol: "$" },
    { id: 2, name: "Euro", code: "EUR", symbol: "€" },
    { id: 3, name: "British Pound", code: "GBP", symbol: "£" },
    { id: 4, name: "Japanese Yen", code: "JPY", symbol: "¥" },
    { id: 5, name: "Swiss Franc", code: "CHF", symbol: "Fr" },
    { id: 6, name: "Swedish Krona", code: "SEK", symbol: "kr" },
    { id: 7, name: "Australian Dollar", code: "AUD", symbol: "A$" },
    { id: 8, name: "Nigerian Naira", code: "NGN", symbol: "₦" },
];
export const languages = [
    { id: 1, name: "English", code: "en" },
    { id: 2, name: "Japanese", code: "ja" },
    { id: 3, name: "German", code: "de" },
    { id: 4, name: "Swedish", code: "sv" },
    { id: 5, name: "Spanish", code: "es" },
    { id: 6, name: "French", code: "fr" },
];
