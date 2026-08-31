import { type OrgSwitcherConfig } from "@viliha/vui-core";
/**
 * The organization switcher: the brand block at the top of the sidebar, and the list it opens.
 *
 * The design is fixed so every install reads the same way. What a host supplies is the logic:
 * `OrgProvider` owns switching, `onAdd` or `addHref` decides where "Add organization" goes, and
 * `VuiProvider`'s `orgSwitcher` section sets the labels and whether the plan line and Add row appear.
 *
 * **Renders nothing without an `OrgProvider` above it**, which is React's behaviour: a sidebar with no
 * tenant list should not crash, it should not show a switcher.
 */
type __VLS_Props = {
    /** The product name, above the current organization. */
    productName: string;
    collapsed?: boolean;
    onAdd?: () => void;
    addHref?: string;
    /**
     * Client-side navigation for `addHref`, for example a router push. Without it the link navigates
     * normally, which works and costs a full page load. Modifier-clicks always fall through.
     */
    onNavigate?: (href: string) => void;
    /** Per-instance overrides, falling back to `VuiProvider`'s `orgSwitcher` section. */
    config?: OrgSwitcherConfig;
    class?: string;
};
declare var __VLS_14: {}, __VLS_22: {
    organization: import("@viliha/vui-core").Organization;
};
type __VLS_Slots = {} & {
    logo?: (props: typeof __VLS_14) => any;
} & {
    'plan-status'?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    collapsed: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
