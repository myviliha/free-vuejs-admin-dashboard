/**
 * The record view's two control rows: the per-record actions in the page header (import, export, the
 * overflow menu, add) and the sub-toolbar over the table (what is being listed, the selection bar, the
 * Trash toggle, Filter, Sort, Options and the pager).
 *
 * **One file, two mount points, hence `part`.** React composes both rows inside one function, but they
 * are not siblings: the action row belongs to the shell and the sub-toolbar sits inside the card. A
 * component can only have one place in the tree, so the alternative was two files that share every
 * import and the same context, which is a worse split than a prop naming which row this is.
 */
type __VLS_Props = {
    part?: "actions" | "toolbar";
    /** Whether the host passed any extra filter rows. **A forwarded slot is always present**, so the
     *  panel cannot ask `$slots` whether the host filled it: it would then never fall back to the
     *  keyword box. React tests the node itself, which is the same question asked where it can be. */
    hasFilterExtras?: boolean;
};
type __VLS_Slots = {
    /** The host's own filter rows, rendered below the `filterable` fields inside the same grid. */
    "filter-extras"?: () => unknown;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    part: "actions" | "toolbar";
    hasFilterExtras: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
