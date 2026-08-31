/**
 * The rows every edition's tables render.
 *
 * **Four fixtures that were literals inside one React page**, which meant the Vue edition either
 * retyped forty rows of names, prices and statuses or shipped a different set. `check:parity` found
 * the second: three of the reference's five tables were simply absent, and the two that existed
 * carried their own data (`PD-123`).
 *
 * Framework-free strings and no imports, so `@viliha/vui-core` can carry it and any edition can render
 * the same table without the reference's components coming with it. Same reasoning as `DEMO_USER` and
 * `DEMO_NOTIFICATIONS`: a fixture written twice is two fixtures.
 *
 * **No real people.** Every name here is invented, and the products, tickers and campaigns are too.
 */
export const DEALS = [
    {
        id: "DE124321",
        customer: "John Doe",
        email: "john@example.com",
        product: "Software License",
        value: "$1,850.34",
        closeDate: "2024-06-15",
        status: "Complete",
    },
    {
        id: "DE124322",
        customer: "Kierra Franci",
        email: "kierra@example.com",
        product: "Software License",
        value: "$1,850.34",
        closeDate: "2024-06-15",
        status: "Complete",
    },
    {
        id: "DE124323",
        customer: "Emerson Workman",
        email: "emerson@example.com",
        product: "Software License",
        value: "$1,850.34",
        closeDate: "2024-06-15",
        status: "Pending",
    },
    {
        id: "DE124324",
        customer: "Chance Philips",
        email: "chance@example.com",
        product: "Software License",
        value: "$1,850.34",
        closeDate: "2024-06-15",
        status: "Complete",
    },
    {
        id: "DE124325",
        customer: "Terry Geidt",
        email: "terry@example.com",
        product: "Software License",
        value: "$1,850.34",
        closeDate: "2024-06-15",
        status: "Complete",
    },
];
export const TRADES = [
    {
        id: "t1",
        name: "Bought VLHA",
        date: "Nov 23, 01:00 PM",
        price: "$2,567.88",
        category: "Finance",
        status: "Success",
    },
    {
        id: "t2",
        name: "Bought ORBT",
        date: "Nov 22, 09:00 PM",
        price: "$2,567.88",
        category: "Technology",
        status: "Pending",
    },
    {
        id: "t3",
        name: "Sold KLST",
        date: "Oct 12, 03:54 PM",
        price: "$6,754.99",
        category: "Finance",
        status: "Success",
    },
    {
        id: "t4",
        name: "Bought FNBR",
        date: "Sep 09, 02:00 AM",
        price: "$1,445.41",
        category: "Social Media",
        status: "Success",
    },
    {
        id: "t5",
        name: "Sold AMZO",
        date: "Feb 05, 08:00 PM",
        price: "$5,698.55",
        category: "E-commerce",
        status: "Failed",
    },
];
export const CAMPAIGNS = [
    {
        id: "c1",
        creator: "Wilson Gouse",
        headline: "Grow your brand by...",
        channel: "Messaging",
        status: "Success",
    },
    {
        id: "c2",
        creator: "Terry Franci",
        headline: "Make Better Ideas...",
        channel: "Social",
        status: "Pending",
    },
    {
        id: "c3",
        creator: "Alena Franci",
        headline: "Increase your website tra...",
        channel: "Search",
        status: "Success",
    },
    {
        id: "c4",
        creator: "Jocelyn Kenter",
        headline: "Digital Marketing that...",
        channel: "Photo",
        status: "Failed",
    },
    {
        id: "c5",
        creator: "Brandon Philips",
        headline: "Self branding",
        channel: "Social",
        status: "Success",
    },
    {
        id: "c6",
        creator: "James Lipshutz",
        headline: "Increase your website tra...",
        channel: "Search",
        status: "Success",
    },
];
export const PRODUCTS = [
    {
        id: "p1",
        name: "TailGrids",
        category: "UI Kit",
        country: "United States",
        flag: "🇺🇸",
        cr: "Dashboard",
        value: "$12,499",
    },
    {
        id: "p2",
        name: "GrayGrids",
        category: "Templates",
        country: "Singapore",
        flag: "🇸🇬",
        cr: "Dashboard",
        value: "$5,498",
    },
    {
        id: "p3",
        name: "Uideck",
        category: "Templates",
        country: "United Kingdom",
        flag: "🇬🇧",
        cr: "Dashboard",
        value: "$4,521",
    },
    {
        id: "p4",
        name: "FormBold",
        category: "SaaS",
        country: "Egypt",
        flag: "🇪🇬",
        cr: "Dashboard",
        value: "$13,843",
    },
    {
        id: "p5",
        name: "NextAdmin",
        category: "Dashboard",
        country: "Finland",
        flag: "🇫🇮",
        cr: "Dashboard",
        value: "$7,523",
    },
    {
        id: "p6",
        name: "Form Builder",
        category: "SaaS",
        country: "Belgium",
        flag: "🇧🇪",
        cr: "Dashboard",
        value: "$1,377",
    },
    {
        id: "p7",
        name: "AyroUI",
        category: "UI Kit",
        country: "Bangladesh",
        flag: "🇧🇩",
        cr: "Dashboard",
        value: "$599",
    },
];
/**
 * The dashboard's own figures.
 *
 * **Two metric cards, not four.** The Vue edition had invented a Revenue and a Growth card, which is
 * how `check:parity` reported "$92,480" and "18.2%" as copy the reference does not have. Shared for the
 * same reason the tables are: a fixture written twice is two fixtures (`PD-127`).
 *
 * `icon` is a `DEMO_ICON_PATHS` key rather than a component, so this stays framework-free.
 */
export const DASHBOARD_METRICS = [
    { label: "Customers", value: "3,782", delta: "11.01%", up: true, icon: "users" },
    { label: "Orders", value: "5,359", delta: "9.05%", up: false, icon: "box" },
];
/** The radial gauge's value, as a percentage. */
export const DASHBOARD_TARGET = 75.55;
/** The three figures under the gauge. */
export const DASHBOARD_TARGET_FOOTER = [
    { label: "Target", value: "$20K", up: false },
    { label: "Revenue", value: "$20K", up: true },
    { label: "Today", value: "$20K", up: true },
];
/** The bar chart's twelve months, shared so the two dashboards are one dataset drawn twice. */
export const MONTHLY_SALES = [
    { month: "Jan", sales: 168 },
    { month: "Feb", sales: 385 },
    { month: "Mar", sales: 201 },
    { month: "Apr", sales: 298 },
    { month: "May", sales: 187 },
    { month: "Jun", sales: 195 },
    { month: "Jul", sales: 291 },
    { month: "Aug", sales: 110 },
    { month: "Sep", sales: 215 },
    { month: "Oct", sales: 390 },
    { month: "Nov", sales: 280 },
    { month: "Dec", sales: 112 },
];
/** The area chart's twelve months, two series. */
export const STATISTICS = [
    { month: "Jan", sales: 180, revenue: 40 },
    { month: "Feb", sales: 190, revenue: 30 },
    { month: "Mar", sales: 170, revenue: 50 },
    { month: "Apr", sales: 160, revenue: 40 },
    { month: "May", sales: 175, revenue: 55 },
    { month: "Jun", sales: 165, revenue: 40 },
    { month: "Jul", sales: 170, revenue: 70 },
    { month: "Aug", sales: 205, revenue: 100 },
    { month: "Sep", sales: 230, revenue: 110 },
    { month: "Oct", sales: 210, revenue: 120 },
    { month: "Nov", sales: 240, revenue: 150 },
    { month: "Dec", sales: 235, revenue: 140 },
];
/** The two countries in the demographics card. `flag` names a drawing, never a shipped image. */
export const DASHBOARD_COUNTRIES = [
    { name: "USA", flag: "usa", customers: 2379, share: 79 },
    { name: "France", flag: "france", customers: 589, share: 23 },
];
/**
 * The five rows of the dashboard's recent-orders table.
 *
 * `image` names a file in each app's `public/products/`, not a path, so an edition served under a
 * different base still finds it.
 */
export const DASHBOARD_ORDERS = [
    {
        id: "1",
        image: "macbook",
        product: "MacBook Pro 13”",
        variants: 2,
        price: "$2399.00",
        category: "Laptop",
        status: "Delivered",
    },
    {
        id: "2",
        image: "watch",
        product: "Apple Watch Ultra",
        variants: 1,
        price: "$879.00",
        category: "Watch",
        status: "Pending",
    },
    {
        id: "3",
        image: "iphone",
        product: "iPhone 15 Pro Max",
        variants: 2,
        price: "$1869.00",
        category: "SmartPhone",
        status: "Delivered",
    },
    {
        id: "4",
        image: "ipad",
        product: "iPad Pro 3rd Gen",
        variants: 2,
        price: "$1699.00",
        category: "Electronics",
        status: "Canceled",
    },
    {
        id: "5",
        image: "airpods",
        product: "AirPods Pro 2nd Gen",
        variants: 1,
        price: "$240.00",
        category: "Accessories",
        status: "Delivered",
    },
];
/**
 * The four social marks, drawn monochrome, **each with its own viewBox**.
 *
 * A shared `0 0 24 24` box at one size does not make them one size. Measured: Facebook's glyph occupies
 * 7 by 14.5 of that box, X and LinkedIn 19 by 18, Instagram 19.6 square, so `size-6` on all four
 * rendered heights differing by a quarter. Each box is tightened to its own mark's bounds and the svg
 * is given a **height** with width left to follow, so every glyph is the same height and the widths
 * vary the way real logos do.
 *
 * `box` is `minX minY width height` in the original 24-unit coordinates. One path each: enough to
 * recognise, and nobody's colour logo redistributed in a download (`SD-006`).
 */
export const DEMO_SOCIALS = [
    {
        name: "Facebook",
        box: "8.5 6.5 7 14.5",
        path: "M13.5 9H15V6.5h-1.5c-1.93 0-3.5 1.57-3.5 3.5v1H8.5v2.5H10V21h2.5v-7.5H15L15.5 11h-3v-1c0-.55.45-1 1-1Z",
    },
    {
        name: "X.com",
        box: "2.5 3 19 18",
        path: "M17.53 3h2.9l-6.34 7.24L21.5 21h-6.1l-4.24-5.55L6.2 21H3.3l6.6-7.55L2.5 3h6.25l3.98 5.26L17.53 3Zm-1.02 16.2h1.6L7.56 4.72h-1.7L16.51 19.2Z",
    },
    {
        name: "LinkedIn",
        box: "4.3 3 15.4 18",
        path: "M6.94 8.5H4.3V21h2.64V8.5ZM5.62 3a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32ZM19.7 13.7c0-3.05-1.63-4.47-3.8-4.47a3.28 3.28 0 0 0-2.96 1.63V8.5H10.3V21h2.64v-6.62c0-1.75.33-3.44 2.5-3.44 2.14 0 1.62 2 1.62 3.55V21h2.64v-7.3Z",
    },
    {
        name: "Instagram",
        box: "2.2 2.2 19.6 19.6",
        path: "M12 2.2c-2.66 0-2.99.01-4.04.06-1.05.05-1.77.22-2.4.46a4.8 4.8 0 0 0-1.74 1.13A4.8 4.8 0 0 0 2.7 5.6c-.24.62-.4 1.34-.46 2.39C2.2 9.03 2.2 9.36 2.2 12s.01 2.97.06 4.02c.05 1.05.22 1.77.46 2.4a4.8 4.8 0 0 0 1.13 1.74 4.8 4.8 0 0 0 1.74 1.13c.62.24 1.34.4 2.39.46 1.05.05 1.38.06 4.02.06s2.97-.01 4.02-.06c1.05-.05 1.77-.22 2.4-.46a5.1 5.1 0 0 0 2.87-2.87c.24-.62.4-1.34.46-2.39.05-1.05.06-1.38.06-4.02s-.01-2.97-.06-4.02c-.05-1.05-.22-1.77-.46-2.4a4.8 4.8 0 0 0-1.13-1.74A4.8 4.8 0 0 0 18.42 2.7c-.62-.24-1.34-.4-2.39-.46C14.98 2.2 14.65 2.2 12 2.2Zm0 1.75c2.6 0 2.9.01 3.93.06.95.04 1.46.2 1.8.33.46.18.78.39 1.12.73.34.34.55.66.73 1.11.13.35.29.86.33 1.81.05 1.03.06 1.34.06 3.93s-.01 2.9-.06 3.93c-.04.95-.2 1.46-.33 1.8-.18.46-.39.78-.73 1.12-.34.34-.66.55-1.11.73-.35.13-.86.29-1.81.33-1.03.05-1.34.06-3.93.06s-2.9-.01-3.93-.06c-.95-.04-1.46-.2-1.8-.33-.46-.18-.78-.39-1.12-.73a3.05 3.05 0 0 1-.73-1.11c-.13-.35-.29-.86-.33-1.81-.05-1.03-.06-1.34-.06-3.93s.01-2.9.06-3.93c.04-.95.2-1.46.33-1.8.18-.46.39-.78.73-1.12.34-.34.66-.55 1.11-.73.35-.13.86-.29 1.81-.33 1.03-.05 1.34-.06 3.93-.06Zm0 2.98a5.07 5.07 0 1 0 0 10.14 5.07 5.07 0 0 0 0-10.14Zm0 8.36a3.29 3.29 0 1 1 0-6.58 3.29 3.29 0 0 1 0 6.58Zm6.46-8.56a1.18 1.18 0 1 1-2.37 0 1.18 1.18 0 0 1 2.37 0Z",
    },
];
/**
 * The identity card's fields, and the address card's.
 *
 * Shared so the two editions show one person. The email here is `john.doe@example.com` where the
 * account menu shows `john@example.com`, and that is the reference's own inconsistency rather than a
 * transcription slip: it is left as it is, because the standard is to match the reference and a
 * silent correction is a difference the check would then report against it.
 */
export const DEMO_PROFILE_FIELDS = [
    { section: "Personal Information", label: "First Name", value: "John" },
    { section: "Personal Information", label: "Last Name", value: "Doe" },
    { section: "Personal Information", label: "Email address", value: "john.doe@example.com" },
    { section: "Personal Information", label: "Phone", value: "+65 8000 0000" },
    { section: "Personal Information", label: "Bio", value: "Team Manager" },
    { section: "Social Links", label: "Facebook", value: "https://facebook.com/example" },
    { section: "Social Links", label: "X.com", value: "https://x.com/example" },
    { section: "Social Links", label: "LinkedIn", value: "https://linkedin.com/company/example" },
    { section: "Social Links", label: "Instagram", value: "https://instagram.com/example" },
];
export const DEMO_ADDRESS_FIELDS = [
    { label: "Country", value: "Singapore" },
    { label: "City/State", value: "Singapore" },
    { label: "Postal Code", value: "018956" },
    { label: "TAX ID", value: "SG-2026-0001" },
];
