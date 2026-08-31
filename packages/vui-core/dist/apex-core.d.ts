/**
 * The chart options every edition draws from.
 *
 * **ApexCharts is the renderer in both editions, and this is why that is possible.** The library core
 * is framework-free: `react-apexcharts` is a thin wrapper over `new ApexCharts(el, options).render()`,
 * and a Vue component can call the same constructor. What makes the two charts identical is not that
 * they use the same library, it is that they build the same **options object**, so the bar radius, the
 * grid dash, the tooltip theme and the 800ms draw animation are one definition rather than two that
 * happen to agree today.
 *
 * The dev put it plainly on 2026-08-26: the charts "should be fixed to the core, the exact design and
 * animation". A second charting library imitating the first cannot be exact, and every difference it
 * leaves is one nobody can fix without reading both libraries (`PD-128`).
 *
 * Framework-free on purpose: plain objects and no imports, so `@viliha/vui-core` can carry it and the
 * type is structural rather than borrowed from `apexcharts` itself, which neither package depends on.
 */
/** One series: a name and its numbers. Matches Apex's own shape without importing its types. */
export type ApexSeries = {
    name: string;
    data: number[];
}[];
/**
 * The house defaults, so twelve charts do not each decide what a grid line looks like.
 *
 * Everything here reads a theme token rather than a hex, which is what keeps an ApexCharts canvas
 * following the same theme as the components around it. Apex takes colours as strings and resolves
 * them at draw time, so `var(--token)` works and retints on a theme change.
 */
/**
 * The shape callers spread from, declared structurally.
 *
 * `ApexCharts.ApexOptions` is the honest type and it lives in the `apexcharts` package, which this one
 * does not depend on and should not: a framework-free options module that pulls in a charting library
 * to describe itself has stopped being framework-free. Each group is `Record<string, unknown>` so a
 * caller can spread `base.chart` and add to it, which is exactly what every call site does.
 */
export interface ApexBaseOptions {
    chart: Record<string, unknown>;
    dataLabels: Record<string, unknown>;
    grid: Record<string, unknown>;
    legend: Record<string, unknown>;
    tooltip: Record<string, unknown>;
    xaxis: Record<string, unknown>;
    yaxis: Record<string, unknown>;
}
export declare function apexBase(): ApexBaseOptions;
/** The brand, and the same hue mixed toward the card for a second series. */
export declare const APEX_COLORS: string[];
/** The twelve month labels every chart on these pages uses for its x axis. */
export declare const APEX_MONTHS: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/**
 * Every chart's options, built once and read by both editions.
 *
 * **These lived inside React's page components**, which meant the Vue edition had to reproduce them in
 * a different library and could only ever approximate. Here they are one definition, so the two
 * editions are the same renderer over the same object and there is nothing left to diverge.
 *
 * `Record<string, unknown>` rather than `ApexCharts.ApexOptions`: the type lives in the `apexcharts`
 * package and this module does not depend on it, for the reason `ApexBaseOptions` gives.
 */
export declare function barChartOptions(): {
    bars: Record<string, unknown>;
    grouped: Record<string, unknown>;
    stacked: Record<string, unknown>;
};
/** The monthly sales bar chart on the dashboard: narrower columns, no legend. */
export declare function monthlySalesOptions(months: readonly string[]): Record<string, unknown>;
/** The bar-chart page's two series, as the reference lists them. */
export declare const BAR_SALES: number[];
export declare const BAR_REFUNDS: number[];
/** The line-chart page's two series. */
export declare const LINE_SERIES: ApexSeries;
/** The line-chart page's two readings of the same data: a gradient area, and a smooth line. */
export declare function lineChartOptions(): {
    area: Record<string, unknown>;
    line: Record<string, unknown>;
};
/** The dashboard's statistics area chart, over whichever range is selected. */
export declare function statisticsOptions(categories: readonly string[]): Record<string, unknown>;
/** The dashboard's radial gauge: a half circle with a 78% hollow and one value label. */
export declare function monthlyTargetOptions(): Record<string, unknown>;
/**
 * ISO date helpers, shared because both editions' date fields speak ISO on the wire.
 *
 * `toISODate` builds the string from local parts rather than `toISOString`, which converts to UTC
 * first: east of Greenwich that turns an evening into tomorrow, so a date picked on the 5th saved as
 * the 6th. A date with no time has no timezone and should not be given one.
 */
export declare const toISODate: (date: Date) => string;
/**
 * Today, as `YYYY-MM-DD`. **The one place a date field learns what day it is** (`PD-159`).
 *
 * Every picker in the product opens on today with today chosen, so a reader sees where the month is
 * without hunting for it, and the field carries a sensible value rather than a placeholder.
 *
 * **Call it from an effect, never from initial state.** These editions are exported statically, so a
 * value computed while rendering is baked at *build* time: a demo built in August and opened in
 * September would render one date on the server and another on the client, which is a hydration
 * mismatch and the class of bug this repository has already shipped twice (`PD-141`, `PD-153`).
 * `date-range.tsx` set the pattern before this existed, and its comment is the reason why.
 */
export declare const todayISO: () => string;
export declare const fromISODate: (value: string) => Date | undefined;
/** How a date reads on a field: `dd/mm/yyyy`, which is the reference's. */
export declare const formatDayFirst: (date: Date) => string;
/** The four event levels the calendar offers, and the ring colour each one draws when selected. */
export declare const CALENDAR_LEVELS: readonly ["Danger", "Success", "Primary", "Warning"];
/**
 * **Conditioned on the real input, not on a framework's state** (`PD-190`).
 *
 * These carry their `peer-checked:` variant rather than a bare `border-*`, and the reason is a bug
 * that shipped: the swatch used to be styled from a React ternary, and the calendar's own script had
 * a second copy that hard-coded the thick coloured ring on **every** option. In an exported page the
 * ternary resolves once, at build time, so all four swatches read as selected and the one control
 * whose job is to show which colour you picked showed all of them picked.
 *
 * Written out in full rather than composed as `peer-checked:${ring}`, because Tailwind generates a
 * class only when it can see the literal string in the source.
 */
export declare const CALENDAR_LEVEL_RING: Record<(typeof CALENDAR_LEVELS)[number], string>;
/**
 * Every chart in the free demo, by name, as one spec each.
 *
 * **This exists so the HTML edition can draw the same charts rather than a third configuration.**
 * The dev's call on 2026-08-26: TailAdmin's HTML edition bundles ApexCharts and ours should draw
 * charts too, which supersedes the "structure, not behaviour" line `PD-139` drew for this edition
 * (`PD-147`). Its pages are the React edition's markup with the framework stripped, so there is no
 * component left to ask what to render: the mount point names a chart and the browser looks it up
 * here.
 *
 * A registry rather than a serialised config in the markup, because these options carry formatter
 * **functions** and JSON cannot hold one. A name survives the round trip and a closure does not.
 *
 * Every edition resolves through this, so a chart cannot differ between them by construction, which
 * is the same reason `PD-128` put the options in this file to begin with.
 */
export interface ChartSpec {
    type: string;
    height: number;
    series: unknown;
    options: Record<string, unknown>;
    ariaLabel: string;
}
export declare const CHART_SPECS: Record<string, () => ChartSpec>;
/**
 * A four-stop ramp of the primary, for a stack that needs four distinguishable bands.
 *
 * `APEX_COLORS` is two, which is all a sales-and-refunds chart ever needed. Four series stacked in
 * two colours is two series wearing a disguise, so the ramp exists rather than four hex values: it
 * is mixed from `--primary` against `--card`, so a rethemed build gets its own ramp and the darkest
 * band stays the brand colour instead of somebody else's blue (`PD-066`'s argument, applied to
 * charts).
 */
export declare const APEX_RAMP: string[];
/** Thirty days, as the reference labels them: the numbers 1 to 30. */
export declare const ANALYTICS_DAYS: string[];
/** The reference's thirty daily visitor figures, read off its chart. */
export declare const ANALYTICS_VISITORS: number[];
