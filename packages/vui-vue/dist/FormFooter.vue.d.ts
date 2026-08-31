import { type FormAction, type FormActionContext } from "@viliha/vui-core";
declare const __VLS_export: <T>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<{
        actions: FormAction<T>[];
        ctx: FormActionContext<T>;
        /** Perform one action: validate if it needs to, act, then close unless the action returned false. */
        run: (action: FormAction<T>) => void | Promise<void>;
        class?: string;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        actionRequiresValid: <T_1, Icon = unknown>(action: FormAction<T_1, Icon>) => boolean;
    }>) => void;
    attrs: any;
    slots: {
        icon?: (props: {
            action: FormAction<T>;
        }) => any;
    } & {
        icon?: (props: {
            action: FormAction<T>;
        }) => any;
    };
    emit: {};
}>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
