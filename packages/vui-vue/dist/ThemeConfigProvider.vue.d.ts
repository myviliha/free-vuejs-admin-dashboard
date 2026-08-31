import { type ThemeConfig } from "@viliha/vui-core";
import { type ThemeSource } from "./theme-context";
/**
 * Applies a theme to the document and manages the two layers: the organization sets the brand, and each
 * person overrides the parts they care about.
 *
 * With no `source` the user's theme is kept in `localStorage`, which is the same trade React's makes:
 * it works with no backend, and it does not follow anyone to another browser.
 */
type __VLS_Props = {
    /** The organization's theme. Everyone in it starts here. */
    orgTheme?: ThemeConfig;
    /** Your API. Omit to keep the user's theme in this browser only. */
    source?: ThemeSource;
    /** localStorage key used when there is no `source`. */
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
