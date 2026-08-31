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
export interface Deal {
    id: string;
    customer: string;
    email: string;
    product: string;
    value: string;
    closeDate: string;
    status: "Complete" | "Pending";
}
export declare const DEALS: readonly Deal[];
export interface Trade {
    id: string;
    name: string;
    date: string;
    price: string;
    category: string;
    status: "Success" | "Pending" | "Failed";
}
export declare const TRADES: readonly Trade[];
export interface Campaign {
    id: string;
    creator: string;
    headline: string;
    channel: string;
    status: "Success" | "Pending" | "Failed";
}
export declare const CAMPAIGNS: readonly Campaign[];
export interface Product {
    id: string;
    name: string;
    category: string;
    country: string;
    flag: string;
    cr: string;
    value: string;
}
export declare const PRODUCTS: readonly Product[];
/**
 * The dashboard's own figures.
 *
 * **Two metric cards, not four.** The Vue edition had invented a Revenue and a Growth card, which is
 * how `check:parity` reported "$92,480" and "18.2%" as copy the reference does not have. Shared for the
 * same reason the tables are: a fixture written twice is two fixtures (`PD-127`).
 *
 * `icon` is a `DEMO_ICON_PATHS` key rather than a component, so this stays framework-free.
 */
export declare const DASHBOARD_METRICS: readonly [{
    readonly label: "Customers";
    readonly value: "3,782";
    readonly delta: "11.01%";
    readonly up: true;
    readonly icon: "users";
}, {
    readonly label: "Orders";
    readonly value: "5,359";
    readonly delta: "9.05%";
    readonly up: false;
    readonly icon: "box";
}];
/** The radial gauge's value, as a percentage. */
export declare const DASHBOARD_TARGET = 75.55;
/** The three figures under the gauge. */
export declare const DASHBOARD_TARGET_FOOTER: readonly [{
    readonly label: "Target";
    readonly value: "$20K";
    readonly up: false;
}, {
    readonly label: "Revenue";
    readonly value: "$20K";
    readonly up: true;
}, {
    readonly label: "Today";
    readonly value: "$20K";
    readonly up: true;
}];
/** The bar chart's twelve months, shared so the two dashboards are one dataset drawn twice. */
export declare const MONTHLY_SALES: {
    month: string;
    sales: number;
}[];
/** The area chart's twelve months, two series. */
export declare const STATISTICS: {
    month: string;
    sales: number;
    revenue: number;
}[];
/** The two countries in the demographics card. `flag` names a drawing, never a shipped image. */
export declare const DASHBOARD_COUNTRIES: readonly [{
    readonly name: "USA";
    readonly flag: "usa";
    readonly customers: 2379;
    readonly share: 79;
}, {
    readonly name: "France";
    readonly flag: "france";
    readonly customers: 589;
    readonly share: 23;
}];
/**
 * The five rows of the dashboard's recent-orders table.
 *
 * `image` names a file in each app's `public/products/`, not a path, so an edition served under a
 * different base still finds it.
 */
export declare const DASHBOARD_ORDERS: readonly [{
    readonly id: "1";
    readonly image: "macbook";
    readonly product: "MacBook Pro 13”";
    readonly variants: 2;
    readonly price: "$2399.00";
    readonly category: "Laptop";
    readonly status: "Delivered";
}, {
    readonly id: "2";
    readonly image: "watch";
    readonly product: "Apple Watch Ultra";
    readonly variants: 1;
    readonly price: "$879.00";
    readonly category: "Watch";
    readonly status: "Pending";
}, {
    readonly id: "3";
    readonly image: "iphone";
    readonly product: "iPhone 15 Pro Max";
    readonly variants: 2;
    readonly price: "$1869.00";
    readonly category: "SmartPhone";
    readonly status: "Delivered";
}, {
    readonly id: "4";
    readonly image: "ipad";
    readonly product: "iPad Pro 3rd Gen";
    readonly variants: 2;
    readonly price: "$1699.00";
    readonly category: "Electronics";
    readonly status: "Canceled";
}, {
    readonly id: "5";
    readonly image: "airpods";
    readonly product: "AirPods Pro 2nd Gen";
    readonly variants: 1;
    readonly price: "$240.00";
    readonly category: "Accessories";
    readonly status: "Delivered";
}];
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
export declare const DEMO_SOCIALS: {
    name: string;
    path: string;
    box: string;
}[];
/** A read-only or editable field on the profile page. `section` groups them in the edit dialog. */
export interface ProfileField {
    label: string;
    value: string;
    full?: boolean;
    section?: string;
}
/**
 * The identity card's fields, and the address card's.
 *
 * Shared so the two editions show one person. The email here is `john.doe@example.com` where the
 * account menu shows `john@example.com`, and that is the reference's own inconsistency rather than a
 * transcription slip: it is left as it is, because the standard is to match the reference and a
 * silent correction is a difference the check would then report against it.
 */
export declare const DEMO_PROFILE_FIELDS: readonly ProfileField[];
export declare const DEMO_ADDRESS_FIELDS: readonly ProfileField[];
