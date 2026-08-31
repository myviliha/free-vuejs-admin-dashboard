/** Four months, rising then dipping, so a line has a shape rather than a slope. */
export const CHART_DEMO_ROWS = [
    { month: "Jan", revenue: 42_000 },
    { month: "Feb", revenue: 58_000 },
    { month: "Mar", revenue: 76_000 },
    { month: "Apr", revenue: 61_000 },
];
/** The accessible name both editions give the chart, so a screen reader hears the same thing. */
export const CHART_DEMO_LABEL = "Revenue by month";
export const CHART_REVENUE = [
    { month: "Jan", revenue: 18_600, expenses: 12_400 },
    { month: "Feb", revenue: 30_500, expenses: 13_900 },
    { month: "Mar", revenue: 23_700, expenses: 9_800 },
    { month: "Apr", revenue: 27_300, expenses: 15_200 },
    { month: "May", revenue: 41_900, expenses: 18_100 },
    { month: "Jun", revenue: 38_400, expenses: 16_700 },
];
export const CHART_DEALS = [
    { stage: "Lead", deals: 42 },
    { stage: "Qualified", deals: 31 },
    { stage: "Proposal", deals: 24 },
    { stage: "Negotiation", deals: 15 },
    { stage: "Won", deals: 9 },
];
/**
 * Traffic by source, each with its palette slot.
 *
 * `var(--chart-N)` rather than a hex: `theme.css` maps the tokens onto those names, so a chart
 * follows light mode, dark mode and a per-tenant brand with no colour prop anywhere.
 */
export const CHART_TRAFFIC = [
    { name: "Direct", value: 4_200, color: "var(--chart-1)" },
    { name: "Referral", value: 3_100, color: "var(--chart-2)" },
    { name: "Organic", value: 5_400, color: "var(--chart-3)" },
    { name: "Social", value: 2_200, color: "var(--chart-4)" },
    { name: "Email", value: 1_600, color: "var(--chart-5)" },
];
/** The four cards, in order, with the caption under each title. */
export const CHART_CARDS = [
    { id: "area", title: "Revenue vs. expenses", description: "Last 6 months" },
    { id: "bar", title: "Deals by stage", description: "Current pipeline" },
    { id: "line", title: "Trend", description: "Revenue vs. expenses over time" },
    { id: "pie", title: "Traffic sources", description: "Sessions this month" },
];
/** Which palette slot each series takes, so the two editions colour the same series alike. */
export const CHART_SERIES_COLOR = {
    areaRevenue: "var(--chart-1)",
    areaExpenses: "var(--chart-3)",
    barDeals: "var(--chart-2)",
    lineRevenue: "var(--chart-1)",
    lineExpenses: "var(--chart-4)",
};
