import { type CellValue, type DataField, type DataSort } from "@viliha/vui-core";
/**
 * The free data table, Vue edition.
 *
 * **It reimplements nothing.** `filterRows`, `sortRows`, `pageRows`, `pageList` and `asText` are
 * imported from `@viliha/vui-core`, which is generated from the same file React's table composes,
 * so the two cannot disagree about a clamp, an empty-value ordering or a search match. This
 * component is the markup and the state, and that is all it should ever be.
 *
 * The column API mirrors React's: `value` is separate from the rendered cell on purpose, so a
 * column whose cell is a badge sorts by its datum rather than its markup. In Vue the cell is a
 * scoped slot rather than a render function, which is the same idea in this framework's idiom.
 */
export interface Column<Row> extends DataField<Row> {
    header: string;
    sortable?: boolean;
    align?: "start" | "center" | "end";
    class?: string;
    hidden?: boolean;
}
declare const __VLS_export: <T extends Record<string, unknown>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<{
        data: readonly T[];
        columns: readonly Column<T>[];
        rowId?: (row: T, index: number) => string;
        caption?: string;
        search?: boolean;
        searchPlaceholder?: string;
        pageSize?: number;
        selectable?: boolean;
        columnToggle?: boolean;
        defaultSort?: DataSort;
        loading?: boolean;
        empty?: string;
        class?: string;
    } & {
        onSelectionChange?: ((rows: T[]) => any) | undefined;
        onRowClick?: ((row: T) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        [x: `cell-${string}`]: ((props: {
            row: T;
            value: CellValue;
        }) => any) | undefined;
    };
    emit: ((evt: "selectionChange", rows: T[]) => void) & ((evt: "rowClick", row: T) => void);
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
