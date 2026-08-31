type __VLS_Props = {
    align?: "start" | "center" | "end";
    /**
     * Which side of the trigger the panel opens on. Reka supports all four; this wrapper did not
     * expose it, so a rail flyout had no way to open beside its icon and the free demo's collapsed
     * sidebar shipped with no submenu at all (`PD-116`).
     *
     * React's `Dropdown` calls the same idea `placement` and offers `bottom` and `right`, because it
     * computes placement itself through `anchorPosition`. Here Reka does it, so all four are free.
     */
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    class?: string;
};
declare var __VLS_14: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    side: "top" | "right" | "bottom" | "left";
    sideOffset: number;
    align: "start" | "center" | "end";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
