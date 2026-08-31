/**
 * The rows every edition's chart example draws (`PD-022`).
 *
 * **One list, because the family's whole claim is that a chart definition is framework-neutral.**
 * `tanstack-chart.tsx` says so and the docs page repeats it, and yet the first version of the two
 * gallery examples retyped the same four rows in `packages/react/gallery/family-examples.tsx` and
 * `apps/web/vuejs/src/gallery-examples.ts`. Nothing compared them: changing February in one left
 * both galleries drawing four points and the same twenty-one SVG shapes, so a parity check by shape
 * count passed while the two editions showed different revenue.
 *
 * The *definition* cannot live here, because `defineChart` is `@tanstack/charts`' own API and this
 * module is framework-free by construction (`packages/core/scripts/build.mjs` fails the build on a
 * framework import). The data can, and the data is the part that was diverging. Same split as
 * `demo-icon-paths.ts`: the shared thing is what crosses the boundary, and each edition binds it
 * with its own library call.
 */
export interface ChartDemoPoint {
    month: string;
    revenue: number;
}
/** Four months, rising then dipping, so a line has a shape rather than a slope. */
export declare const CHART_DEMO_ROWS: readonly ChartDemoPoint[];
/** The accessible name both editions give the chart, so a screen reader hears the same thing. */
export declare const CHART_DEMO_LABEL = "Revenue by month";
export interface RevenuePoint {
    month: string;
    revenue: number;
    expenses: number;
}
export declare const CHART_REVENUE: readonly RevenuePoint[];
export declare const CHART_DEALS: readonly {
    stage: string;
    deals: number;
}[];
/**
 * Traffic by source, each with its palette slot.
 *
 * `var(--chart-N)` rather than a hex: `theme.css` maps the tokens onto those names, so a chart
 * follows light mode, dark mode and a per-tenant brand with no colour prop anywhere.
 */
export declare const CHART_TRAFFIC: readonly {
    name: string;
    value: number;
    color: string;
}[];
/** The four cards, in order, with the caption under each title. */
export declare const CHART_CARDS: readonly [{
    readonly id: "area";
    readonly title: "Revenue vs. expenses";
    readonly description: "Last 6 months";
}, {
    readonly id: "bar";
    readonly title: "Deals by stage";
    readonly description: "Current pipeline";
}, {
    readonly id: "line";
    readonly title: "Trend";
    readonly description: "Revenue vs. expenses over time";
}, {
    readonly id: "pie";
    readonly title: "Traffic sources";
    readonly description: "Sessions this month";
}];
/** Which palette slot each series takes, so the two editions colour the same series alike. */
export declare const CHART_SERIES_COLOR: {
    readonly areaRevenue: "var(--chart-1)";
    readonly areaExpenses: "var(--chart-3)";
    readonly barDeals: "var(--chart-2)";
    readonly lineRevenue: "var(--chart-1)";
    readonly lineExpenses: "var(--chart-4)";
};
