/**
 * A horizontal, numbered step indicator for multi-step forms. Presentational and controlled:
 * pass the steps and the current index. Completed steps fill with the brand primary and a
 * check, the current step is ringed, upcoming steps are muted. All colour comes from tokens.
 */
export interface Step {
    /** Short title shown under the marker. */
    label: string;
    /** Optional secondary line under the label. */
    description?: string;
}
type __VLS_Props = {
    steps: Step[];
    /** Zero-based index of the active step. */
    current: number;
    class?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
