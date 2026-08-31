import { type RowId } from "@viliha/vui-core";
import { type Component } from "vue";
import type { Crumb } from "./Breadcrumbs.vue";
import type { RecordField } from "./record-field";
declare const __VLS_export: <T extends {
    id: RowId;
}>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<{
        /** The record to show. `null` renders the loading skeleton. */
        data: T | null;
        /** Fields, grouped into sections with each field's `group` (any title). */
        fields: RecordField<T>[];
        /** Header and initials for the record. */
        getPrimary: (row: T) => {
            title: string;
            initials: string;
            subtitle?: string;
        };
        /** Collection title: the breadcrumb parent and the form heading. */
        title?: string;
        /** Singular noun for the default breadcrumb ("Update {singular}"). */
        singular?: string;
        /**
         * The header glyph, as a component. React's `ProfileForm` takes one and forwards it; the `#icon`
         * slot below is the other way in, and passing neither leaves `RecordForm`'s own default.
         */
        icon?: Component;
        /** Intro text for the "About" panel beside the form. */
        formDescription?: string;
        /** Section layout: 1 or 2 columns. Default 2. */
        columns?: 1 | 2;
        /** Navigate Home from the breadcrumb. */
        onHome?: () => void;
        /** Breadcrumb override (defaults to Home › {title} › {record}). */
        crumbs?: Crumb[];
        /** Force the loading skeleton. Defaults to `data == null`. */
        loading?: boolean;
    } & {
        onSave?: ((row: T) => any) | undefined;
        onExit?: (() => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        icon?: (props: {
            class: "size-3.5";
        }) => any;
    } & {
        'action-icon'?: (props: {
            action: import("@viliha/vui-core").FormAction<Record<string, unknown>>;
        }) => any;
    };
    emit: ((evt: "save", row: T) => void) & ((evt: "exit") => void);
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
