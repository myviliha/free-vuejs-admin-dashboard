type __VLS_Props = {
    /** Inline validation message: red border plus an alert-triangle tooltip. Falsy = valid. */
    error?: string;
    /** Character shown for each hidden character in `"asterisk"` mode. */
    maskChar?: string;
    mask?: "asterisk" | "native";
    autocomplete?: string;
    class?: string;
};
type __VLS_ModelProps = {
    modelValue?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    mask: "asterisk" | "native";
    maskChar: string;
    autocomplete: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
