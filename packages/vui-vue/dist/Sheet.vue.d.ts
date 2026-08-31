type __VLS_Props = {
    side?: "top" | "right" | "bottom" | "left";
    class?: string;
};
type __VLS_ModelProps = {
    /**
     * A sheet is a dialog pinned to an edge, and the edge is data rather than four class strings, which
     * is how React does it too. Self-contained like `Dialog.vue` so the scrim lives in one file.
     */
    "open"?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_25: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_25) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:open"?: ((value: boolean | undefined) => any) | undefined;
}>, {
    side: "top" | "right" | "bottom" | "left";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
