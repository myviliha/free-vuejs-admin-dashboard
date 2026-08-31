import { type VNode } from "vue";
/**
 * One field row: a left-aligned label in column 1 and its control in column 2. **Must be a direct
 * child of `FieldGrid`.**
 *
 * Pass `error` for the theme's inline validation: the control border turns red via its
 * `aria-invalid` styling and an alert triangle carries the message in a tooltip, with no layout
 * shift and the full text announced to screen readers. The error **clears the moment the user edits
 * the field** and re-arms on the next form submit, so a page sets `error` and never clears it on
 * change. Set `multiline` when the control is a `Textarea`.
 *
 * **This is a render function rather than a template, and the honest reason is decision `D10`**,
 * which specified that shape. React's `Field` uses `cloneElement` to push the aria wiring into
 * whatever control it wraps; the Vue equivalent is `cloneVNode`, and the `mergeProps` inside it
 * chains `onInput` with the control's own handler rather than replacing it.
 *
 * A review argued that doing the clone inside a props-less child component froze the control on its
 * first vnode, because such a component fails Vue's `shouldUpdateComponent` check. **That did not
 * reproduce**: the original template version passes every test in `field-updates.test.ts`. The shape
 * stays because it is the recorded decision and it removes the question, not because it fixed a
 * proven defect. Cloning in the component's own render effect cannot go stale by construction.
 */
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        required: true;
    };
    htmlFor: StringConstructor;
    /** Show the required marker next to the label. */
    required: BooleanConstructor;
    /** Helper text under the control (hidden while an error shows). */
    hint: StringConstructor;
    /** Inline validation message. Falsy = valid. */
    error: StringConstructor;
    /** Position the alert icon at the top (for a `Textarea`) instead of centered. */
    multiline: BooleanConstructor;
    /** Extra classes on the control cell (column 2). */
    class: StringConstructor;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: StringConstructor;
        required: true;
    };
    htmlFor: StringConstructor;
    /** Show the required marker next to the label. */
    required: BooleanConstructor;
    /** Helper text under the control (hidden while an error shows). */
    hint: StringConstructor;
    /** Inline validation message. Falsy = valid. */
    error: StringConstructor;
    /** Position the alert icon at the top (for a `Textarea`) instead of centered. */
    multiline: BooleanConstructor;
    /** Extra classes on the control cell (column 2). */
    class: StringConstructor;
}>> & Readonly<{}>, {
    required: boolean;
    multiline: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
