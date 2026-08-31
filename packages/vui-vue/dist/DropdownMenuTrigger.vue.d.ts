type __VLS_Props = {
    active?: boolean;
    /**
     * Whether the trigger renders as a toolbar button at all. A bare slot for an avatar row wants no
     * chrome.
     *
     * Same prop and same meaning as React's `Dropdown`, added for parity: a header bell is a 44px
     * circle and an account row is a borderless flex row, and neither is a bordered toolbar button. Without
     * it the only way to draw those was to import `reka-ui` in the app and hand-roll the trigger, which
     * puts a Reka dependency in a consumer and loses the shared classes for everything that is not bare.
     *
     * `bare` says "not a toolbar button"; it cannot also know what the caller's trigger *is*, so the
     * caller still passes `class`.
     */
    bare?: boolean;
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
