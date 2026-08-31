/**
 * One component rather than five: a tooltip is always trigger plus bubble, and
 * the React version is the same shape. Pass the trigger as the default slot and
 * the text as `content` (or the `content` slot for markup).
 *
 * It is a light surface with a border, like every other floating panel. Never a
 * dark bubble: that reads as a second design system on top of this one.
 */
type __VLS_Props = {
    content?: string;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    delayDuration?: number;
    class?: string;
};
declare var __VLS_20: {}, __VLS_34: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    content?: (props: typeof __VLS_34) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    side: "top" | "right" | "bottom" | "left";
    sideOffset: number;
    delayDuration: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
