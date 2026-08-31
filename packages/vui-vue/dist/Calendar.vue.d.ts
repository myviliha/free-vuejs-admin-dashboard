type __VLS_Props = {
    class?: string;
    weekdayFormat?: "narrow" | "short";
    /**
     * The earliest selectable day. Greys out everything before it **in the calendar**, so an
     * impossible choice is not offered rather than being refused after the fact.
     *
     * Declared rather than left to attribute fallthrough: Reka's root accepts `min-value` either way,
     * and a prop that works only because nobody declared it is a promise nobody made.
     */
    minValue?: Date;
};
type __VLS_ModelProps = {
    /**
     * The calendar, on Reka's headless one (`PD-025`, `D21`, `D23`).
     *
     * ## Why this needed a dependency
     *
     * Reka reports a chosen day as a `DateValue` and **cannot be seeded with one**: it constructs a
     * `CalendarDate` internally and exports it from none of its four public entry points, so a
     * controlled calendar had no way to say "start on this date". `@internationalized/date` supplies
     * the constructor, and it is Reka's own dependency, which is exactly the transitive-import trap
     * this repository has a check for. It is declared on `packages/vue` now, on the dev's yes.
     *
     * ## The boundary is the point
     *
     * `modelValue` is a **`Date`**, in both editions. The `DateValue` type appears nowhere in a
     * consumer's own types, which is what `D21` decided and what makes this a port rather than a
     * different component wearing the same name. The two conversions live in `toValue` and `fromValue`
     * below and nowhere else.
     *
     * ## The data attributes are React's, deliberately
     *
     * `CALENDAR_DAY` selects on `react-day-picker`'s vocabulary: `data-[selected-single=true]` and
     * `group-data-[focused=true]/day`. Reka emits `data-selected` and `data-focused`. `D23` says a port
     * on another primitive emits the **same** attributes rather than inventing its own, or every state
     * in that shared class string is dead in this edition. So the cell translates them.
     *
     * ## Single dates only
     *
     * Range selection is Reka's `RangeCalendarRoot`, a different component with a different model, and
     * `CALENDAR_DAY`'s `data-[range-*]` states stay unused here until that lands. Saying so beats
     * shipping a `range` prop that silently picks one day.
     */
    modelValue?: Date | undefined;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Date | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: Date | undefined) => any) | undefined;
}>, {
    weekdayFormat: "narrow" | "short";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
