type __VLS_Props = {
    class?: string;
    weekdayFormat?: "narrow" | "short";
    numberOfMonths?: number;
};
type __VLS_ModelProps = {
    /**
     * A calendar that selects a span of days rather than one.
     *
     * **`Calendar.vue` could not do this and said so**, in a docblock worth quoting because it made the
     * right call: "Range selection is Reka's `RangeCalendarRoot`, a different component with a different
     * model, and `CALENDAR_DAY`'s `data-[range-*]` states stay unused here until that lands. Saying so
     * beats shipping a `range` prop that silently picks one day." This is that landing. The catalogue
     * carried the gap as a note on the `calendar` row, so nothing was over-claimed while it was open.
     *
     * What forced it was the dashboard: the reference's statistics card has a date **range** picker, and
     * under an exact-replica standard the Vue edition cannot answer that with a single-date control
     * (`PD-127`).
     *
     * **The same `CALENDAR_DAY` string as the single-date calendar**, which is the point. That constant
     * was written against react-day-picker's vocabulary and carried `data-[range-start]`,
     * `data-[range-middle]` and `data-[range-end]` rules that nothing in this edition had ever set. Reka
     * spells the same three states `data-selection-start`, `data-selected` and `data-selection-end`, and
     * **sets them on the element rather than handing them to the slot**, so this component cannot
     * translate them the way `Calendar.vue` translates `data-selected-single`. `CALENDAR_DAY` carries both
     * vocabularies instead. Two editions, one set of classes, no second stylesheet.
     *
     * The model is a plain `{ start, end }` of `Date`, not Reka's `DateValue`, for the reason the
     * single-date component gives: `DateValue` appears nowhere in a consumer's own code and a component
     * that demands it makes its date library the caller's problem.
     */
    modelValue?: {
        start?: Date;
        end?: Date;
    };
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: {
        start?: Date;
        end?: Date;
    }) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: {
        start?: Date;
        end?: Date;
    }) => any) | undefined;
}>, {
    weekdayFormat: "narrow" | "short";
    numberOfMonths: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
