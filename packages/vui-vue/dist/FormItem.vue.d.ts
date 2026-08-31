/**
 * One field: the wrapper that owns the ids everything below it points at.
 *
 * **This is a deliberately smaller family than React's, and the difference is the form library.**
 * React's `form.tsx` is `react-hook-form`'s `FormProvider` and `Controller` plus shadcn's wiring, so
 * its `FormLabel` and `FormMessage` read the error out of that library's state. Vue has no equivalent
 * dependency here and adding one would need an ADR, so **the error is a prop**: pass it from
 * vee-validate, from your own `reactive`, from wherever. What VUI contributes is the layout, the id
 * derivation and the aria wiring, and that is what this ports.
 */
type __VLS_Props = {
    /** Falsy means valid. Supplied by whatever owns your form state. */
    error?: string;
    class?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
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
