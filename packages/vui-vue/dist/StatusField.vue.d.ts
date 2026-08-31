/**
 * Validation state on the control, with the message on an icon inside it (`PD-081`).
 *
 * **`cloneVNode` is how this works, and it is the only real difference from React.** React clones its
 * child with `cloneElement` to add the state border and the two ARIA attributes; Vue's equivalent
 * takes the same class and attrs over the default slot's first node. So the call site is identical in
 * both editions: wrap the control, pass `state` and `message`, and nothing about the control changes.
 *
 * The slot is expected to hold **one** element. More than one and there is no single control to mark,
 * so the first is decorated and the rest pass through untouched, which is what React's
 * `isValidElement` check amounts to.
 *
 * **The two glyphs are inlined**, because this package has no icon dependency and every other
 * component here draws its own path. They are Radix's `check-circled` and `info-circled` at the
 * 15-unit box the rest of the set uses, so the shapes match React's exactly rather than approximately.
 */
type __VLS_Props = {
    /** `undefined` is the valid case, and it draws nothing. */
    state?: "error" | "success";
    /** Required whenever `state` is set: a coloured border with no explanation is a dead end. */
    message?: string;
    /**
     * Also print the message under the control, in the state's colour.
     *
     * Off by default, which is the house convention: the icon carries it and the form does not move.
     * On for the field a reader must not have to go looking for, a sign-up form's one blocking field
     * being the usual one.
     */
    messageBelow?: boolean;
    class?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
