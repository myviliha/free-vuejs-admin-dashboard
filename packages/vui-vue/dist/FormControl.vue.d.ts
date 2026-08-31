import { type VNode } from "vue";
/**
 * Wires the control it wraps to the row's ids, the same job React does with a Radix `Slot`.
 *
 * A render function rather than a template, for the reason `Field.vue` documents: `cloneVNode` is
 * Vue's equivalent of `cloneElement`, and doing it inside a props-less child component is a shape
 * whose update behaviour is not worth relying on. The wiring goes on the first node that can carry an
 * attribute, and every other node is returned untouched, so a caller passing a control plus a sibling
 * keeps the sibling.
 */
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<{}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[], {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
