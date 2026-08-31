import { type Organization, type SwitchHandler } from "@viliha/vui-core";
/**
 * Owns which organization is current, and the switch.
 *
 * Out of the box, selecting one sets it and remembers it per browser, so the choice survives a reload.
 * Pass `onSwitch` when a switch means more than that (a server call to move the session, a cookie your
 * API reads). **It runs before the current organization changes, and throwing from it cancels the
 * switch**, so a failed call leaves the user where they were rather than showing them a tenant they are
 * not in. That is React's contract and it is the part worth getting right.
 */
type __VLS_Props = {
    organizations: Organization[];
    defaultOrgId?: string;
    onSwitch?: SwitchHandler;
    storageKey?: string;
    persist?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    storageKey: string;
    persist: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
