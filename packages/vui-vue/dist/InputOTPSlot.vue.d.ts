/**
 * One cell. React's equivalent is a `div` reading its character out of the `input-otp` package's
 * context; this is a real `input`, which is what Reka gives every cell, so the caret and the mobile
 * keyboard are the browser's job rather than the component's.
 *
 * **`data-active` is set here because Reka does not set it.** The shared class string styles the
 * focused cell entirely through `data-[active=true]:` variants (border, ring, `z-10`) and carries
 * `outline-none`, so without this attribute a focused cell in the Vue edition has **no focus
 * indicator at all**: the variants never fire and the browser's own ring is suppressed. Reka emits
 * `data-disabled` and `data-complete`, never `data-active`. A class-parity test cannot see this,
 * because the string is byte-identical either way.
 */
type __VLS_Props = {
    index: number;
    class?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
