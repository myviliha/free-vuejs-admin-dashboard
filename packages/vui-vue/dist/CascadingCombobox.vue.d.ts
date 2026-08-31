import { type CascadeLevel, type CascadeNode } from "@viliha/vui-core";
/**
 * Cascading combobox for fixed, named levels: Region, then Country, then State, then City. One
 * searchable `Combobox` per level; choosing one narrows the next from that node's children and
 * **clears everything downstream**.
 *
 * **The tree walk is imported, not rewritten.** `cascadeRows` and `cascadeSelect` come from
 * `@viliha/vui-core`, so the two editions cannot disagree about which levels a change clears. Getting
 * that subtly wrong looks like a stale option list rather than a broken component, which is exactly
 * the kind of drift a markup parity test never sees.
 */
type __VLS_Props = {
    /** Ordered, named levels. One Combobox is rendered per level. */
    levels: CascadeLevel[];
    /** Hierarchical data: root nodes are level 0, a node's `children` are the next level. */
    items: CascadeNode[];
    /** Stack the levels (default) or lay them out in a row. */
    orientation?: "vertical" | "horizontal";
    class?: string;
};
type __VLS_ModelProps = {
    /** The selected path, one value per level. A shorter array means the deeper levels are unset. */
    modelValue?: string[];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string[]) => any;
    change: (path: string[], nodes: CascadeNode[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
    onChange?: ((path: string[], nodes: CascadeNode[]) => any) | undefined;
}>, {
    orientation: "vertical" | "horizontal";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
