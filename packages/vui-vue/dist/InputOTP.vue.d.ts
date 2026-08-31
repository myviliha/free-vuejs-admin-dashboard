/**
 * **Everything a native form needs is declared and forwarded**, because `PinInputRoot` sets
 * `inheritAttrs: false` and binds leftover attrs to its wrapper div: an undeclared `name` would land
 * there and Reka's hidden submit input would be named `""`, so the field would submit nothing.
 *
 * There is no `length`. Reka counts the cells that register themselves, exactly as `input-otp`
 * counts its children, so the number of `InputOTPSlot`s is the length and a prop would only be a
 * second source of truth.
 */
type __VLS_Props = {
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    /** `otp` gets the browser's one-time-code autofill. */
    otp?: boolean;
    /** Render the value as dots, for a code that should not be shoulder-surfed. */
    mask?: boolean;
    class?: string;
};
type __VLS_ModelProps = {
    /**
     * A one-time-code field, on Reka's `PinInput`.
     *
     * **This is the one family in wave 4 whose markup cannot match React's, and the reason is the
     * primitive rather than the port.** React wraps the `input-otp` package, which renders a single
     * hidden input behind styled `div` cells and draws a fake caret; Reka renders **one real input per
     * cell** and the browser draws the caret. Both read as one field and carry the same classes on the
     * same-looking cells, so the two editions look identical, and no markup-parity assertion can hold
     * between them. `INPUT_OTP_CARET` and `INPUT_OTP_CARET_WRAP` therefore have no consumer here, which
     * is expected rather than an oversight.
     *
     * What is asserted instead: the container and cell classes come from the shared source, and typing
     * fills the cells and emits the value.
     */
    modelValue?: string[];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
