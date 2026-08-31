import { type AsyncOptionSource } from "./use-async-options";
export interface SelectOption {
    value: string;
    label: string;
}
type __VLS_Props = {
    /** Static options. Omit when using `source` or the slot. */
    options?: SelectOption[];
    /** Async option source: loaded on open, and a set value's label resolved by one record. */
    source?: AsyncOptionSource;
    /** Changing this invalidates the async cache and reloads on next open. Wire it to a cascade. */
    resetKey?: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
    ariaLabel?: string;
    loadingText?: string;
    errorText?: string;
    class?: string;
};
type __VLS_ModelProps = {
    /**
     * Trigger plus listbox in one component, the shape the React select has: a
     * select is never used without both, so composing four elements per usage buys
     * nothing.
     *
     * **Three ways to give it options, and they are React's three.** A static `options` array, an async
     * `source` (loaded on open, no search box — reach for `Combobox` when the list needs one), or the
     * default slot with your own `SelectItem`s. The slot was the only one until wave 6, which made the
     * record form unportable: its choice fields hand a select an array or a loader, never markup.
     */
    modelValue?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_48: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_48) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {
    loadingText: string;
    errorText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
