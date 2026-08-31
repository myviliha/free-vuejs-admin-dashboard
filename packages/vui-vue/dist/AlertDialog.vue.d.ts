type __VLS_Props = {
    size?: "default" | "sm" | "lg";
    class?: string;
};
type __VLS_ModelProps = {
    /**
     * Confirmation dialog, the same shell as the React one. Self-contained like `Dialog.vue`: root,
     * portal, scrim and panel in one file, which is the convention `z-layers.test.ts` checks, because a
     * backdrop split across two files is a backdrop nobody can assert on.
     *
     * Reka owns the focus trap, the scroll lock and the aria wiring. **Escape and outside-click do not
     * dismiss it**, which is the difference from `Dialog`: a confirmation has to be answered.
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
    size: "default" | "sm" | "lg";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
