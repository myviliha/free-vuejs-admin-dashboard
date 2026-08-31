import { type UserConfigurable, type VuiConfig } from "@viliha/vui-core";
/**
 * Apply a config to everything below. Optional: without it the components use `vuiPreset`, the theme as
 * shipped.
 *
 * Pass `userConfigurable` to let the person using the app override some of it from inside the app. Their
 * choices are saved per browser and merged over the host's config, so a preconfigured theme stays
 * changeable at runtime **without the host giving up control of what may change**, which is what
 * `filterUserPreferences` enforces on the way in.
 */
type __VLS_Props = {
    config?: VuiConfig;
    userConfigurable?: UserConfigurable;
    /** localStorage key for the user's choices. */
    storageKey?: string;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    storageKey: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
