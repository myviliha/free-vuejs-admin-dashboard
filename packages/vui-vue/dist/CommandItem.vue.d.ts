/**
 * One row.
 *
 * **Nothing is mapped here, and that is deliberate.** `COMMAND_ITEM` styles the highlighted row in
 * both vocabularies: `data-[selected=true]:` for `cmdk` and `data-[highlighted]:` for Reka. Emitting
 * `cmdk`'s attribute from this component was the first attempt and it cannot work, because a variant
 * only matches the element its class is on and only the primitive knows which row is highlighted. So
 * the shared string accepts both, which is the general remedy `D23` records.
 */
type __VLS_Props = {
    value: string;
    /** Extra text the search matches, beyond `value`. `cmdk` calls this `keywords`. */
    keywords?: string;
    disabled?: boolean;
    class?: string;
};
declare var __VLS_8: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_8) => any;
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
