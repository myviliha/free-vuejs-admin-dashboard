/**
 * A labelled section of the list.
 *
 * **`cmdk-group-heading` on the label is load-bearing, not a leftover.** `COMMAND_GROUP` styles its
 * heading through `[&_[cmdk-group-heading]]:` variants, because React's `cmdk` puts that attribute on
 * the heading element. Reka does not, so this component emits it: a shared class string is only shared
 * if every edition emits the attributes it selects on, which is `D23` of the Vue parity spec. Without
 * it the heading renders unstyled and the parity test still passes, because the string is identical.
 *
 * **A group does not hide itself when its items are filtered out**, where `cmdk` does. Hiding on the
 * family's total match count deadlocks: the group disappears before its items mount, so they never
 * report a match and the count never recovers. Doing it properly needs a per-group registry, and a
 * heading above an empty section is the cheaper failure of the two.
 */
type __VLS_Props = {
    heading?: string;
    class?: string;
};
declare var __VLS_14: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_14) => any;
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
