import { type FormAction, type FormActionOutcome, type RowId } from "@viliha/vui-core";
import type { RecordFormProps } from "./record-form-props";
declare const __VLS_export: <T extends {
    id: RowId;
}>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<(RecordFormProps<T> & {
        /** `"panel"` = slide-over (default); `"page"` = full-page form. */ layout?: "panel" | "page";
    }) & {
        onCancel?: (() => any) | undefined;
        onSave?: ((row: T, then?: FormActionOutcome | undefined) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        'action-icon'?: (props: {
            action: FormAction<Record<string, unknown>>;
        }) => any;
    } & {
        icon?: (props: {
            class: "size-3.5";
        }) => any;
    } & {
        'action-icon'?: (props: {
            action: FormAction<Record<string, unknown>>;
        }) => any;
    };
    emit: ((evt: "cancel") => void) & ((evt: "save", row: T, then?: FormActionOutcome | undefined) => void);
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
