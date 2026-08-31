/**
 * The standard page frame, as a component instead of markup every page copies: a full-height
 * column, a 48px action header holding the breadcrumb trail and that page's actions, then the
 * single scrolling content region.
 *
 * What varies is the content of the slots, not the frame. React takes the regions as props;
 * here they are named slots (`breadcrumbs`, `actions`, `footer`) and the body is the default
 * slot, which is the same shape in this framework's idiom.
 */
type __VLS_Props = {
    /** Drop the standard `flex flex-col gap-4 p-4` body wrapper and lay it out yourself. */
    bare?: boolean;
    /** Hide the header entirely, for a page with nothing to put in it. */
    hideHeader?: boolean;
    class?: string;
    headerClass?: string;
    contentClass?: string;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {};
type __VLS_Slots = {} & {
    breadcrumbs?: (props: typeof __VLS_1) => any;
} & {
    actions?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
} & {
    footer?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    bare: boolean;
    hideHeader: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
