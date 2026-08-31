/**
 * The initials under the picture, and they are **always rendered**, as React's are.
 *
 * This wrapped Reka's `AvatarFallback`, which is a state machine: it shows the fallback while the
 * image loads and removes it once the image succeeds. React's is a plain element that stays put, with
 * `AVATAR_IMAGE` carrying `absolute inset-0 z-10` so the picture simply covers it. Both draw the same
 * thing and only one of them keeps the initials in the document, which `check:parity` caught as "JD"
 * missing from every page of the Vue edition (`PD-120`).
 *
 * **The reference's model is the one kept**, and not only because it is the reference. The image is
 * `alt=""`, decorative by design, so the initials are what names the avatar for a screen reader; under
 * Reka's model a loaded avatar had no accessible name at all. It also means no flash: there is no
 * moment where the fallback is swapped out and the picture swapped in.
 *
 * The trade is that a slow image leaves the initials visible underneath rather than a blank circle,
 * which is the better failure anyway, and it is what `avatar.tsx` documents.
 */
type __VLS_Props = {
    class?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
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
