type __VLS_Props = {
    label?: string;
    dismissible?: boolean;
    /**
     * The close control in the corner (default on).
     *
     * **Standard, not per caller** (`Z-10`, `PD-079`). Escape and a backdrop click already dismiss, and
     * neither is discoverable: a reader looking for the way out looks for an X. This edition had none at
     * all, so a dialog here had no visible way out while the catalogue said the family shipped. Turn it
     * off for a dialog that must be *answered* rather than dismissed, and pair that with
     * `:dismissible="false"` or the X is the only thing missing rather than the only way out.
     */
    showClose?: boolean;
    class?: string;
};
type __VLS_ModelProps = {
    /**
     * Sectioned modal dialog, the same shell as the React one: centred panel, themed scrim, entrance
     * animation, Escape and backdrop click to close. Compose it with DialogHeader, DialogBody and
     * DialogFooter.
     *
     * Reka owns the focus trap, the scroll lock and the aria wiring, which the React component hand-rolls;
     * the classes are shared so both look identical.
     */
    "open"?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_47: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_47) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:open"?: ((value: boolean | undefined) => any) | undefined;
}>, {
    dismissible: boolean;
    showClose: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
