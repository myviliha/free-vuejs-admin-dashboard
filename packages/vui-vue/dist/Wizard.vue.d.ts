import { type Step } from "./Steps.vue";
/**
 * A stepped shell: the stepper pinned at the top, the active step as the only scrolling region, and a
 * Back / Next footer.
 *
 * React takes `footer` as a node prop and `backLabel`/`nextLabel` as nodes; here all three are slots,
 * which is how a Vue caller passes markup. The default footer is what most callers want and is what the
 * slots fall back to.
 */
type __VLS_Props = {
    steps: Step[];
    /** Zero-based index of the active step. */
    current: number;
    backDisabled?: boolean;
    nextDisabled?: boolean;
    hideFooter?: boolean;
    class?: string;
};
declare var __VLS_6: {}, __VLS_8: {}, __VLS_18: {}, __VLS_28: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
} & {
    footer?: (props: typeof __VLS_8) => any;
} & {
    back?: (props: typeof __VLS_18) => any;
} & {
    next?: (props: typeof __VLS_28) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    back: () => any;
    next: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onBack?: (() => any) | undefined;
    onNext?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
