import { type Component } from "vue";
/**
 * The assembled breadcrumb trail, one style used everywhere. The **last** crumb is the
 * current page (bold, non-interactive); earlier crumbs are links (`href`) or buttons
 * (`onClick`).
 *
 * `linkComponent` is the same escape hatch React has: pass the router's link component
 * (Nuxt's `NuxtLink`, `RouterLink`) and it renders that instead of an `a`. A scoped slot
 * would be the more Vue-native shape and is deliberately not added, because it would be a
 * second API for one job.
 */
export interface Crumb {
    /**
     * **Narrower than React's, which takes a `ReactNode`.** A string, interpolated and escaped, so a
     * composed label (an icon beside the text) is not expressible in this edition yet. Adding a
     * per-crumb scoped slot would fix it and is a feature decision rather than an oversight.
     */
    label: string;
    /** Navigate via a link (rendered with `linkComponent` if given, else `a`). */
    href?: string;
    /** Navigate via a handler (rendered as a button). Ignored if `href` is set. */
    onClick?: () => void;
}
type __VLS_Props = {
    crumbs: Crumb[];
    /** Optional back button shown before the trail. Also bindable as `@back`. */
    onBack?: () => void;
    linkComponent?: Component;
    class?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
