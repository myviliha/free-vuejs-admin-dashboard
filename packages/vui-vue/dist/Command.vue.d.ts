type __VLS_Props = {
    class?: string;
};
type __VLS_ModelProps = {
    /**
     * A filtered, keyboard-driven list: the surface a palette or a picker is built out of.
     *
     * **React's wraps `cmdk`; this wraps Reka's `Listbox`, and no new dependency was added.** That was
     * `D15`: Reka ships the primitive, so the Vue edition needs no `cmdk` equivalent. The behaviour comes
     * from the primitive in both cases, which is the point of `D2`, and the markup differs because the two
     * primitives differ.
     *
     * `CommandPalette` does not use this component in either edition. It is its own thing and depends on
     * no list primitive at all.
     *
     * **The filtering is this component's, not the primitive's.** Reka's `Listbox` stores a search term
     * and highlights the first row; it does not narrow the list, which `cmdk` does. See
     * `command-context.ts` for what closes that gap and why the first version of this port silently
     * filtered nothing.
     */
    modelValue?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
