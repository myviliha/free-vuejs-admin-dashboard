import { type AsyncOptionSource } from "./use-async-options";
/**
 * Searchable single-select. The popover leads with a filter input, so it scales to the long lists a
 * plain `Select` does not: an FK picker, a country list. Pass static `options`, or a `source` for
 * async lazy loading (fetch on open, debounced server search, single-record label resolve).
 *
 * **Built on Reka's `Combobox`, which is a real divergence from React and the right one.** React
 * hand-rolls the popover: a `getBoundingClientRect`, a flip decision, a portal and inline `left` /
 * `top` / `maxHeight` styles. Reka owns positioning, the focus trap, the typeahead and the keyboard
 * loop, so this component is the markup and the async policy and nothing else. Same classes, same
 * look, different DOM, and the behaviour comes from a primitive that is tested rather than from a
 * hundred lines here.
 */
export interface ComboboxOption {
    value: string;
    label: string;
}
type __VLS_Props = {
    /** Static options. Omit when using `source`. */
    options?: ComboboxOption[];
    /** Async option source. Takes over from `options`; nothing is fetched on mount. */
    source?: AsyncOptionSource;
    /** Changing this invalidates the async cache and reloads on next open. Wire it to a cascade. */
    resetKey?: string;
    id?: string;
    ariaLabel?: string;
    disabled?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    loadingText?: string;
    errorText?: string;
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
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
    loadingText: string;
    errorText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
