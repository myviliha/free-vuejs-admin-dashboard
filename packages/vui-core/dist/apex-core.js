import { DASHBOARD_TARGET, MONTHLY_SALES, STATISTICS } from "./demo-tables-core.js";
export function apexBase() {
    return {
        chart: {
            fontFamily: "inherit",
            toolbar: { show: false },
            /*
             * Render inside the height we asked for.
             *
             * ApexCharts adds `parentHeightOffset` outside `height`, 15px by default, so a chart told to be
             * 180 tall occupies 195. Two consequences, and the second is the one that made it visible: the
             * card **grows 15px when the chart finishes loading**, which is layout shift under the reader's
             * hands, and the HTML edition's static export reserves the placeholder's 180 while the running
             * app renders 195, so every chart card in that edition sat 15px short of the reference and
             * everything below it moved. Zero makes the rendered block exactly the height the placeholder
             * already reserves (`PD-146`).
             */
            parentHeightOffset: 0,
            // The reference's charts zoom and pan, and this is the library that gives us both for free.
            zoom: { enabled: true, type: "x", autoScaleYaxis: true },
            animations: { enabled: true, speed: 800 },
            background: "transparent",
        },
        dataLabels: { enabled: false },
        grid: {
            borderColor: "var(--border)",
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            padding: { left: 0, right: 0 },
        },
        legend: { show: false },
        tooltip: { theme: "light", x: { show: true } },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: "var(--muted-foreground)", fontSize: "12px" } },
            tooltip: { enabled: false },
        },
        yaxis: {
            labels: { style: { colors: "var(--muted-foreground)", fontSize: "12px" } },
        },
    };
}
/** The brand, and the same hue mixed toward the card for a second series. */
export const APEX_COLORS = [
    "var(--primary)",
    "color-mix(in oklab, var(--primary) 45%, var(--card))",
];
/** The twelve month labels every chart on these pages uses for its x axis. */
export const APEX_MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
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
export function barChartOptions() {
    const base = apexBase();
    const bar = {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
    };
    const bars = {
        ...base,
        chart: { ...base.chart, type: "bar" },
        colors: [...APEX_COLORS],
        plotOptions: { bar },
        stroke: { show: true, width: 4, colors: ["transparent"] },
        xaxis: { ...base.xaxis, categories: [...APEX_MONTHS] },
        tooltip: { ...base.tooltip, y: { formatter: (value) => `${value}` } },
    };
    const grouped = {
        ...bars,
        plotOptions: { bar: { ...bar, columnWidth: "55%" } },
        legend: { show: true, position: "top", horizontalAlign: "left" },
    };
    const stacked = {
        ...grouped,
        chart: { ...base.chart, type: "bar", stacked: true },
        plotOptions: { bar: { ...bar, columnWidth: "45%" } },
    };
    return { bars, grouped, stacked };
}
/** The monthly sales bar chart on the dashboard: narrower columns, no legend. */
export function monthlySalesOptions(months) {
    const base = apexBase();
    return {
        ...base,
        chart: { ...base.chart, type: "bar" },
        colors: [APEX_COLORS[0]],
        plotOptions: {
            bar: { columnWidth: "38%", borderRadius: 5, borderRadiusApplication: "end" },
        },
        xaxis: { ...base.xaxis, categories: [...months] },
        tooltip: { ...base.tooltip, y: { formatter: (value) => `${value}` } },
    };
}
/** The bar-chart page's two series, as the reference lists them. */
export const BAR_SALES = [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112];
export const BAR_REFUNDS = [12, 28, 15, 22, 14, 16, 21, 9, 17, 30, 21, 8];
/** The line-chart page's two series. */
export const LINE_SERIES = [
    { name: "Sales", data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235] },
    { name: "Revenue", data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140] },
];
/** The line-chart page's two readings of the same data: a gradient area, and a smooth line. */
export function lineChartOptions() {
    const base = apexBase();
    const area = {
        ...base,
        chart: { ...base.chart, type: "area" },
        colors: [...APEX_COLORS],
        stroke: { curve: "straight", width: [2, 2] },
        fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
        markers: { size: 0, strokeColors: "var(--card)", strokeWidth: 2, hover: { size: 6 } },
        xaxis: { ...base.xaxis, type: "category", categories: [...APEX_MONTHS] },
        tooltip: { ...base.tooltip, shared: true, intersect: false },
    };
    const line = {
        ...area,
        chart: { ...base.chart, type: "line" },
        stroke: { curve: "smooth", width: [3, 3] },
        fill: { type: "solid", opacity: 0 },
        // Markers on, because this is the reading where each month's value is the point.
        markers: { size: 4, strokeColors: "var(--card)", strokeWidth: 2, hover: { size: 7 } },
        legend: { show: true, position: "top", horizontalAlign: "left" },
    };
    return { area, line };
}
/** The dashboard's statistics area chart, over whichever range is selected. */
export function statisticsOptions(categories) {
    const base = apexBase();
    return {
        ...base,
        chart: { ...base.chart, type: "area" },
        colors: [...APEX_COLORS],
        stroke: { curve: "straight", width: [2, 2] },
        fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
        markers: { size: 0, strokeColors: "var(--card)", strokeWidth: 2, hover: { size: 6 } },
        xaxis: { ...base.xaxis, type: "category", categories: [...categories] },
        tooltip: { ...base.tooltip, shared: true, intersect: false },
    };
}
/** The dashboard's radial gauge: a half circle with a 78% hollow and one value label. */
export function monthlyTargetOptions() {
    const base = apexBase();
    return {
        ...base,
        chart: { ...base.chart, type: "radialBar", sparkline: { enabled: true } },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: { size: "78%" },
                track: { background: "var(--muted)", strokeWidth: "100%", margin: 4 },
                dataLabels: {
                    name: { show: false },
                    value: {
                        fontSize: "36px",
                        fontWeight: 700,
                        offsetY: -36,
                        color: "var(--foreground)",
                        formatter: (value) => `${value}%`,
                    },
                },
            },
        },
        fill: { type: "solid", colors: [APEX_COLORS[0]] },
        stroke: { lineCap: "round" },
        labels: ["Target"],
        colors: [APEX_COLORS[0]],
    };
}
/**
 * ISO date helpers, shared because both editions' date fields speak ISO on the wire.
 *
 * `toISODate` builds the string from local parts rather than `toISOString`, which converts to UTC
 * first: east of Greenwich that turns an evening into tomorrow, so a date picked on the 5th saved as
 * the 6th. A date with no time has no timezone and should not be given one.
 */
export const toISODate = (date) => [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
].join("-");
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
export const todayISO = () => toISODate(new Date());
export const fromISODate = (value) => {
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d)
        return undefined;
    return new Date(y, m - 1, d);
};
/** How a date reads on a field: `dd/mm/yyyy`, which is the reference's. */
export const formatDayFirst = (date) => [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
].join("/");
/** The four event levels the calendar offers, and the ring colour each one draws when selected. */
export const CALENDAR_LEVELS = ["Danger", "Success", "Primary", "Warning"];
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
export const CALENDAR_LEVEL_RING = {
    Danger: "peer-checked:border-destructive",
    Success: "peer-checked:border-success",
    Primary: "peer-checked:border-primary",
    Warning: "peer-checked:border-warning",
};
export const CHART_SPECS = {
    "bar-single": () => ({
        type: "bar",
        height: 180,
        series: [{ name: "Sales", data: BAR_SALES }],
        options: barChartOptions().bars,
        ariaLabel: "Sales across twelve months",
    }),
    "bar-grouped": () => ({
        type: "bar",
        height: 280,
        series: [
            { name: "Sales", data: BAR_SALES },
            { name: "Refunds", data: BAR_REFUNDS },
        ],
        options: barChartOptions().grouped,
        ariaLabel: "Sales and refunds across twelve months",
    }),
    "bar-stacked": () => ({
        type: "bar",
        height: 280,
        series: [
            { name: "Sales", data: BAR_SALES },
            { name: "Refunds", data: BAR_REFUNDS },
        ],
        options: barChartOptions().stacked,
        ariaLabel: "Sales and refunds stacked across twelve months",
    }),
    "line-area": () => ({
        type: "area",
        height: 310,
        series: LINE_SERIES,
        options: lineChartOptions().area,
        ariaLabel: "Sales and revenue over twelve months",
    }),
    "line-plain": () => ({
        type: "line",
        height: 310,
        series: LINE_SERIES,
        options: lineChartOptions().line,
        ariaLabel: "Sales and revenue as lines",
    }),
};
/*
 * The dashboard's three. Their data lives in `demo-tables-core`, which is the only import this file
 * has: both modules are framework-free and both ship in `@viliha/vui-core`, so the chart and the
 * table it sits beside cannot disagree about a number.
 */
/*
 * The three the reference ships a screen for and this had no spec for (`PD-202`).
 *
 * **ApexCharts already draws all three**, so nothing was installed: `pie`, `radar` and `radialBar`
 * are types it supports, and the work is a spec each rather than a library. They are declared here
 * beside the others because `CHART_SPECS` is the one place a chart is named, and a chart drawn from
 * a page's own options would be a second opinion about how this product draws charts.
 *
 * **Each carries an `ariaLabel` saying what it shows.** A chart is a picture to a screen reader
 * unless something tells it otherwise, and "chart" is not that something.
 */
CHART_SPECS["pie"] = () => ({
    type: "pie",
    height: 320,
    series: [44, 28, 18, 10],
    options: {
        labels: ["Americas", "EMEA", "APAC", "Other"],
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
    },
    ariaLabel: "Share of organizations by region",
});
CHART_SPECS["radar"] = () => ({
    type: "radar",
    height: 320,
    series: [{ name: "This quarter", data: [80, 64, 72, 58, 90, 66] }],
    options: {
        labels: ["Speed", "Support", "Price", "Features", "Reliability", "Docs"],
        legend: { position: "bottom" },
    },
    ariaLabel: "Product scores across six measures",
});
CHART_SPECS["radial"] = () => ({
    type: "radialBar",
    height: 320,
    series: [72, 58, 41],
    options: {
        labels: ["Retirement", "Real estate", "Emergency fund"],
        legend: { position: "bottom", show: true },
    },
    ariaLabel: "Progress towards three savings targets",
});
CHART_SPECS["monthly-sales"] = () => ({
    type: "bar",
    height: 250,
    series: [{ name: "Sales", data: MONTHLY_SALES.map((row) => row.sales) }],
    options: monthlySalesOptions(MONTHLY_SALES.map((row) => row.month)),
    ariaLabel: "Monthly sales across twelve months",
});
/*
 * The default range only. The running app switches this between monthly, quarterly and annual, and a
 * static page has no state to switch: it draws what the app draws on arrival, which is the monthly
 * series.
 */
CHART_SPECS.statistics = () => ({
    type: "area",
    height: 310,
    series: [
        { name: "Sales", data: STATISTICS.map((row) => row.sales) },
        { name: "Revenue", data: STATISTICS.map((row) => row.revenue) },
    ],
    options: statisticsOptions(STATISTICS.map((row) => row.month)),
    ariaLabel: "Statistics: sales and revenue across twelve months",
});
CHART_SPECS["monthly-target"] = () => ({
    type: "radialBar",
    height: 290,
    series: [DASHBOARD_TARGET],
    options: monthlyTargetOptions(),
    ariaLabel: `Monthly target, ${DASHBOARD_TARGET} per cent reached`,
});
/* ── The analytics dashboard's four ───────────────────────────────────────────────────────────── */
/**
 * A four-stop ramp of the primary, for a stack that needs four distinguishable bands.
 *
 * `APEX_COLORS` is two, which is all a sales-and-refunds chart ever needed. Four series stacked in
 * two colours is two series wearing a disguise, so the ramp exists rather than four hex values: it
 * is mixed from `--primary` against `--card`, so a rethemed build gets its own ramp and the darkest
 * band stays the brand colour instead of somebody else's blue (`PD-066`'s argument, applied to
 * charts).
 */
export const APEX_RAMP = [
    "var(--primary)",
    "color-mix(in oklab, var(--primary) 72%, var(--card))",
    "color-mix(in oklab, var(--primary) 46%, var(--card))",
    "color-mix(in oklab, var(--primary) 22%, var(--card))",
];
/** Thirty days, as the reference labels them: the numbers 1 to 30. */
export const ANALYTICS_DAYS = Array.from({ length: 30 }, (_, day) => String(day + 1));
/** The reference's thirty daily visitor figures, read off its chart. */
export const ANALYTICS_VISITORS = [
    160, 380, 195, 293, 181, 188, 285, 103, 208, 385, 273, 106, 117, 205, 264, 184, 303, 109, 85, 374,
    106, 217, 287, 165, 285, 104, 109, 284, 375, 306,
];
/**
 * Visitor analytics of the last thirty days.
 *
 * **Its own spec rather than `bar-single`**, which is twelve months of one series at 180px. Pointing
 * the analytics panel at that drew a year where the card's own subtitle says thirty days, which is
 * the chart disagreeing with the sentence above it.
 */
CHART_SPECS["analytics-visitors"] = () => {
    const base = apexBase();
    return {
        type: "bar",
        height: 420,
        series: [{ name: "Visitors", data: ANALYTICS_VISITORS }],
        options: {
            ...base,
            chart: { ...base.chart, type: "bar" },
            colors: [APEX_COLORS[0]],
            // Thin columns, because thirty of them at the twelve-month width would touch.
            plotOptions: {
                bar: { columnWidth: "22%", borderRadius: 3, borderRadiusApplication: "end" },
            },
            xaxis: { ...base.xaxis, categories: ANALYTICS_DAYS },
            tooltip: { ...base.tooltip, y: { formatter: (value) => `${value}` } },
        },
        ariaLabel: "Unique visitors across the last thirty days",
    };
};
/** The live-visitor sparkline: one series, no axes, no grid. */
CHART_SPECS["analytics-active-users"] = () => {
    const base = apexBase();
    return {
        type: "area",
        height: 180,
        series: [
            {
                name: "Live visitors",
                data: [22, 24, 23, 28, 34, 40, 38, 36, 33, 31, 34, 36, 30, 28, 32, 38, 44, 52, 58, 54, 44],
            },
        ],
        options: {
            ...base,
            // `sparkline` strips the axes, grid and padding in one flag: the card wants a shape, not a
            // reading, and the three figures underneath are where the numbers are.
            chart: { ...base.chart, type: "area", sparkline: { enabled: true } },
            colors: [APEX_COLORS[0]],
            stroke: { curve: "smooth", width: 2 },
            fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0 } },
            tooltip: { ...base.tooltip, y: { formatter: (value) => `${value}` } },
        },
        ariaLabel: "Live visitors over the last hour",
    };
};
/**
 * Acquisition channels: four series stacked over eight months.
 *
 * The bars are rounded at **both** ends (`borderRadiusApplication: "around"`), which is the
 * reference's own look and the reason this is not `bar-stacked`: that one rounds the end only,
 * because two series of sales and refunds read as one column with a cap.
 */
CHART_SPECS["analytics-acquisition"] = () => {
    const base = apexBase();
    return {
        type: "bar",
        height: 320,
        series: [
            { name: "Direct", data: [44, 55, 41, 67, 22, 43, 55, 41] },
            { name: "Referral", data: [13, 23, 20, 8, 13, 27, 13, 22] },
            { name: "Organic Search", data: [11, 17, 15, 15, 21, 14, 21, 19] },
            { name: "Social", data: [21, 7, 25, 13, 22, 8, 14, 21] },
        ],
        options: {
            ...base,
            chart: { ...base.chart, type: "bar", stacked: true },
            colors: APEX_RAMP,
            plotOptions: {
                bar: { columnWidth: "40%", borderRadius: 6, borderRadiusApplication: "around" },
            },
            legend: { show: true, position: "top", horizontalAlign: "left", markers: { radius: 12 } },
            xaxis: { ...base.xaxis, categories: APEX_MONTHS.slice(0, 8) },
            tooltip: { ...base.tooltip, shared: true, intersect: false },
        },
        ariaLabel: "Acquisition channels stacked across eight months",
    };
};
/** Sessions by device: a donut, not a pie, and three slices rather than four regions. */
CHART_SPECS["analytics-devices"] = () => {
    const base = apexBase();
    return {
        type: "donut",
        height: 340,
        series: [58, 30, 12],
        options: {
            ...base,
            chart: { ...base.chart, type: "donut" },
            labels: ["Desktop", "Mobile", "Tablet"],
            colors: [APEX_RAMP[0], APEX_RAMP[1], APEX_RAMP[3]],
            // A thick ring with nothing in the middle, as the reference draws it. A total in the hole
            // would be a number this card does not otherwise state.
            plotOptions: { pie: { donut: { size: "62%" } } },
            stroke: { show: false },
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                markers: { radius: 12 },
            },
            // No grid on a donut, and the base's dashed one draws behind it.
            grid: { ...base.grid, yaxis: { lines: { show: false } } },
            tooltip: { ...base.tooltip, y: { formatter: (value) => `${value}%` } },
        },
        ariaLabel: "Sessions by device: desktop, mobile and tablet",
    };
};
