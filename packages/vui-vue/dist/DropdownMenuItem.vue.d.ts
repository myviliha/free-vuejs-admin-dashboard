type __VLS_Props = {
    disabled?: boolean;
    /**
     * Render the child element itself as the item, rather than wrapping it in one.
     *
     * **Needed the moment a menu row is a link.** Reka wires close-on-select and roving arrow-key focus
     * through this primitive's Collection, and only elements it renders are registered. A plain
     * `<a role="menuitem">` dropped inside the content looks identical, navigates correctly, and is
     * invisible to both: the free demo's rail flyout stayed open over the page it had just navigated to,
     * and arrow keys moved nothing (`PD-118`). `as-child` puts the anchor itself in the Collection, so
     * one element is both the link and the item instead of a div wrapping an anchor, which would nest
     * two interactive roles.
     */
    asChild?: boolean;
    class?: string;
};
declare var __VLS_10: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
