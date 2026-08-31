import { type RowId } from "@viliha/vui-core";
import type { RecordViewProps } from "./record-view-props";
declare const __VLS_export: <T extends {
    id: RowId;
}>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<RecordViewProps<T>> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        /** The header's leading node (a sidebar toggle, a back button). React reads this from the page
         *  chrome context; the Vue provider has no `titleLeading` by decision, so it is a slot here. */
        "title-leading"?: () => unknown;
        /** Extra Filter-panel rows. Compose with `FilterField` so they inherit the label │ control grid. */
        "filter-extras"?: () => unknown;
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
