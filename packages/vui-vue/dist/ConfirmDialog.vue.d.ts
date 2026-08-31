type __VLS_Props = {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    /** Style the confirm button as a destructive (red) action. */
    destructive?: boolean;
};
type __VLS_ModelProps = {
    /**
     * Centered modal confirmation, before deleting something. Built on the shared `Dialog` so it stays
     * in lockstep with the header, body and footer standard, exactly as the React one is.
     *
     * React takes `open` with `onCancel`; here `open` is a model, which is how a Vue caller expects a
     * dialog to work, and cancel is an event. Two things are deliberate and match React rather than
     * being convenient:
     *
     * - **Every route out emits `cancel`**, including Escape and a backdrop click, which Reka performs
     *   by flipping the model itself. React wires `onClose={onCancel}` for the same reason. Without it a
     *   caller that clears its pending id in `@cancel` keeps a stale one after an Escape, and the next
     *   confirm acts on the wrong row.
     * - **Neither button closes the dialog.** The parent owns `open`, exactly as in React, so a confirm
     *   handler can keep the panel up with a disabled button while its request is in flight. Closing
     *   here would unmount it mid-request and re-run the entrance animation if the parent reopened to
     *   report a failure.
     */
    "open"?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_26: {};
type __VLS_Slots = {} & {
    description?: (props: typeof __VLS_26) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean) => any;
    cancel: () => any;
    confirm: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
}>, {
    confirmLabel: string;
    cancelLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
