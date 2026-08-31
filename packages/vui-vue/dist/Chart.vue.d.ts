import { type ChartDefinition } from "@tanstack/charts/vue";
/**
 * A TanStack chart wearing the theme.
 *
 * TanStack Charts has no theme of its own: it paints with `currentColor` and
 * reads six CSS variables for the categorical palette. `vui-chart` (in
 * theme.css) maps our tokens onto those names, so the chart follows light and
 * dark mode and a per-tenant brand with no colour props here and no chart
 * config to keep in sync.
 *
 * Pass a definition built with `defineChart` from `@tanstack/charts`. This
 * component owns the frame and the colours; the definition owns the data.
 */
type __VLS_Props = {
    definition: ChartDefinition;
    /** Required: a chart with no accessible name is unusable to a screen reader. */
    ariaLabel: string;
    ariaDescription?: string;
    height?: number;
    aspectRatio?: number;
    /** Render inside a bordered card, like the rest of the design system. */
    card?: boolean;
    class?: string;
};
declare var __VLS_9: {
    defaultBody: () => import("vue").VNodeChild;
    points: readonly import("@tanstack/charts").ChartPoint<unknown, import("@tanstack/charts").ChartValue, import("@tanstack/charts").ChartValue>[];
    content: import("@tanstack/charts").ChartTooltipContent | string;
    pinned: boolean;
    dismiss: () => void;
};
type __VLS_Slots = {} & {
    tooltipBody?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    card: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
