/**
 * The Cmd+K palette. Fully controlled and router-agnostic: the host owns `open`, supplies the
 * actions, and each action carries its own `onSelect`.
 *
 * **It depends on no command library in either edition.** React's `command` family wraps `cmdk`; this
 * one does not touch it, which is why the palette ports while `command` waits on a primitive.
 * `filterActions` and `groupActions` come from `@viliha/vui-core`, so both editions match on the same
 * fields in the same order.
 */
export interface CommandAction {
    /** Stable unique key. */
    id: string;
    label: string;
    /** Optional group heading; actions with the same group render together. */
    group?: string;
    /** Extra text matched by the search, beyond `label` and `group`. */
    keywords?: string;
    /** Extra classes for the icon slot's content. */
    iconClass?: string;
    /** Runs when the action is chosen, by Enter or by click. */
    onSelect: () => void;
}
type __VLS_Props = {
    actions: CommandAction[];
    placeholder?: string;
    /** Message when the search matches nothing. */
    emptyMessage?: string;
};
type __VLS_ModelProps = {
    "open"?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_7: {
    action: CommandAction;
};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    placeholder: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
