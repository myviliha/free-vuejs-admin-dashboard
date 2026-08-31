import { type AsyncOptionSource } from "./use-async-options";
/**
 * Searchable multi-select: the same panel as `Combobox`, a taller trigger, and a removable tag per
 * chosen value. Static `options` or an async `source`, exactly as the single-select takes.
 *
 * The eleven panel classes are the shared `PICKER_*` set, which the wave 4 lift created after finding
 * they had been duplicated between the two React files.
 */
export interface MultiComboboxOption {
    value: string;
    label: string;
}
type __VLS_Props = {
    options?: MultiComboboxOption[];
    source?: AsyncOptionSource;
    resetKey?: string;
    id?: string;
    ariaLabel?: string;
    disabled?: boolean;
    /** Failed its rules: the border carries it, as it does on every other control. */
    invalid?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    loadingText?: string;
    errorText?: string;
    class?: string;
};
type __VLS_ModelProps = {
    modelValue?: string[];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
}>, {
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
    loadingText: string;
    errorText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
