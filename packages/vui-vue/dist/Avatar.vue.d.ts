import { type AvatarSize, type AvatarStatus } from "@viliha/vui-core";
/**
 * `size` and `status` arrived with React's rather than after it (`Z-14`).
 *
 * The catalogue says this edition ships `avatar`, and a prop the demo advertises which this component
 * ignores is the catalogue over-claiming: the same gap review found on `Badge`'s `solid`. Six steps
 * because the sizes an avatar is used at are not a continuum, and the presence dot is scaled per step
 * because a 6px dot on a 64px circle is a speck and a 16px dot on a 24px one is a third of the face.
 *
 * **The dot is drawn outside the clip.** `AVATAR_ROOT` carries `overflow-hidden`, which is what crops
 * the picture into a circle and would equally crop a dot sitting on the circle's edge, so presence adds
 * a wrapper. Without a status the DOM is exactly what it always was, so no existing call site pays for
 * a feature it does not use.
 */
type __VLS_Props = {
    /** One of six steps. Omit to keep the 32px default, or keep passing a `size-*` class. */
    size?: AvatarSize;
    status?: AvatarStatus;
    /**
     * What the dot means, for anyone who cannot see it.
     *
     * A coloured dot is pure decoration to a screen reader, and "online" is not decoration.
     */
    statusLabel?: string;
    class?: string;
};
declare var __VLS_7: {}, __VLS_16: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_7) => any;
} & {
    default?: (props: typeof __VLS_16) => any;
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
