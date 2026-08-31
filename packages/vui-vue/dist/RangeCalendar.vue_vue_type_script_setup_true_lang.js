import { getLocalTimeZone as $ad063034c8620db8$export$aa8b41735afcabd2, today as $ad063034c8620db8$export$d0bdf45af03a6ea3 } from "./node_modules/.pnpm/@internationalized_date@3.12.3/node_modules/@internationalized/date/dist/private/queries.js";
import { CalendarDate as $2aaf608024c21ca1$export$99faa760c7908e4f } from "./node_modules/.pnpm/@internationalized_date@3.12.3/node_modules/@internationalized/date/dist/private/CalendarDate.js";
import { Fragment, computed, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderList, toDisplayString, unref, useModel, withCtx } from "vue";
import { RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNext, RangeCalendarPrev, RangeCalendarRoot } from "reka-ui";
import { BUTTON_BASE, BUTTON_SIZES, BUTTON_VARIANTS, CALENDAR_CAPTION, CALENDAR_CAPTION_LABEL_BASE, CALENDAR_CAPTION_LABEL_PLAIN, CALENDAR_CELL, CALENDAR_DAY, CALENDAR_GRID, CALENDAR_MONTH, CALENDAR_MONTHS, CALENDAR_NAV, CALENDAR_NAV_BUTTON, CALENDAR_NAV_ICON, CALENDAR_OUTSIDE_VIEW, CALENDAR_ROOT, CALENDAR_TODAY_VIEW, CALENDAR_WEEK, CALENDAR_WEEKDAY, CALENDAR_WEEKDAYS, CALENDAR_WEEKDAY_HEAD, cn } from "@viliha/vui-core";
//#region src/RangeCalendar.vue?vue&type=script&setup=true&lang.ts
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
var RangeCalendar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RangeCalendar",
	props: /*@__PURE__*/ mergeModels({
		class: {},
		weekdayFormat: { default: "short" },
		numberOfMonths: { default: 1 }
	}, {
		"modelValue": { default: () => ({}) },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const toValue = (d) => d ? new $2aaf608024c21ca1$export$99faa760c7908e4f(d.getFullYear(), d.getMonth() + 1, d.getDate()) : void 0;
		const fromValue = (v) => v?.toDate($ad063034c8620db8$export$aa8b41735afcabd2());
		const value = computed({
			get: () => ({
				start: toValue(model.value.start),
				end: toValue(model.value.end)
			}),
			set: (v) => {
				model.value = {
					start: fromValue(v?.start ?? void 0),
					end: fromValue(v?.end ?? void 0)
				};
			}
		});
		const placeholder = computed(() => toValue(model.value.start) ?? $ad063034c8620db8$export$d0bdf45af03a6ea3($ad063034c8620db8$export$aa8b41735afcabd2()));
		const isOutside = (date, month) => date.month !== month.month;
		/**
		* The day is a ghost icon button, and this port was drawing it without one.
		*
		* The reference renders `<Button variant="ghost" size="icon" className={cn(CALENDAR_DAY, ...)}>`, so
		* every day carries the button base as well as the calendar's own classes. Reka gives a plain `div`
		* with `role="button"` and this component passed `CALENDAR_DAY` alone, which left the day with no
		* `items-center`, no `justify-center` and no `rounded-md`: a selected date rendered as a hard-edged
		* square with its number in the top-left corner (`PD-145`).
		*
		* Composed from the same three constants `Button.vue` uses, so the day cannot drift from the button
		* it is supposed to be.
		*/
		const DAY_BUTTON = cn(BUTTON_BASE, BUTTON_VARIANTS.ghost, BUTTON_SIZES.icon);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RangeCalendarRoot), {
				modelValue: value.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
				"default-placeholder": placeholder.value,
				"weekday-format": __props.weekdayFormat,
				"number-of-months": __props.numberOfMonths,
				class: normalizeClass(unref(cn)(unref(CALENDAR_ROOT), _ctx.$props.class)),
				"data-slot": "calendar"
			}, {
				default: withCtx(({ weekDays, grid }) => [createElementVNode("div", { class: normalizeClass(unref(CALENDAR_MONTHS)) }, [createVNode(unref(RangeCalendarHeader), { class: normalizeClass(unref(CALENDAR_NAV)) }, {
					default: withCtx(() => [createVNode(unref(RangeCalendarPrev), {
						class: normalizeClass(unref(CALENDAR_NAV_BUTTON)),
						"aria-label": "Previous month"
					}, {
						default: withCtx(() => [(openBlock(), createElementBlock("svg", {
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true",
							class: normalizeClass(unref(cn)("vui-icon-plain", unref(CALENDAR_NAV_ICON))),
							xmlns: "http://www.w3.org/2000/svg"
						}, [..._cache[1] || (_cache[1] = [createElementVNode("path", {
							d: "M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2))]),
						_: 1
					}, 8, ["class"]), createVNode(unref(RangeCalendarNext), {
						class: normalizeClass(unref(CALENDAR_NAV_BUTTON)),
						"aria-label": "Next month"
					}, {
						default: withCtx(() => [(openBlock(), createElementBlock("svg", {
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true",
							class: normalizeClass(unref(cn)("vui-icon-plain", unref(CALENDAR_NAV_ICON))),
							xmlns: "http://www.w3.org/2000/svg"
						}, [..._cache[2] || (_cache[2] = [createElementVNode("path", {
							d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6758 5.94673 11.3594 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2))]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class"]), (openBlock(true), createElementBlock(Fragment, null, renderList(grid, (month) => {
					return openBlock(), createElementBlock("div", {
						key: month.value.toString(),
						class: normalizeClass(unref(CALENDAR_MONTH))
					}, [createVNode(unref(RangeCalendarHeading), { class: normalizeClass(unref(CALENDAR_CAPTION)) }, {
						default: withCtx(({ headingValue }) => [createElementVNode("span", { class: normalizeClass(unref(cn)(unref(CALENDAR_CAPTION_LABEL_BASE), unref(CALENDAR_CAPTION_LABEL_PLAIN))) }, toDisplayString(headingValue), 3)]),
						_: 1
					}, 8, ["class"]), createVNode(unref(RangeCalendarGrid), { class: normalizeClass(unref(CALENDAR_GRID)) }, {
						default: withCtx(() => [createVNode(unref(RangeCalendarGridHead), null, {
							default: withCtx(() => [createVNode(unref(RangeCalendarGridRow), { class: normalizeClass(unref(CALENDAR_WEEKDAYS)) }, {
								default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(weekDays, (day) => {
									return openBlock(), createBlock(unref(RangeCalendarHeadCell), {
										key: day,
										class: normalizeClass(unref(cn)(unref(CALENDAR_WEEKDAY_HEAD), unref(CALENDAR_WEEKDAY)))
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(day.slice(0, 2)), 1)]),
										_: 2
									}, 1032, ["class"]);
								}), 128))]),
								_: 2
							}, 1032, ["class"])]),
							_: 2
						}, 1024), createVNode(unref(RangeCalendarGridBody), null, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(month.rows, (week, i) => {
								return openBlock(), createBlock(unref(RangeCalendarGridRow), {
									key: `week-${i}`,
									class: normalizeClass(unref(CALENDAR_WEEK))
								}, {
									default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(week, (date) => {
										return openBlock(), createBlock(unref(RangeCalendarCell), {
											key: date.toString(),
											date,
											class: normalizeClass(unref(CALENDAR_CELL))
										}, {
											default: withCtx(() => [createVNode(unref(RangeCalendarCellTrigger), {
												day: date,
												month: month.value,
												class: normalizeClass(["group/day", unref(cn)(unref(DAY_BUTTON), unref(CALENDAR_DAY), unref(CALENDAR_OUTSIDE_VIEW), unref(CALENDAR_TODAY_VIEW))]),
												"data-outside": isOutside(date, month.value) ? "true" : void 0
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(date.day), 1)]),
												_: 2
											}, 1032, [
												"day",
												"month",
												"class",
												"data-outside"
											])]),
											_: 2
										}, 1032, ["date", "class"]);
									}), 128))]),
									_: 2
								}, 1032, ["class"]);
							}), 128))]),
							_: 2
						}, 1024)]),
						_: 2
					}, 1032, ["class"])], 2);
				}), 128))], 2)]),
				_: 1
			}, 8, [
				"modelValue",
				"default-placeholder",
				"weekday-format",
				"number-of-months",
				"class"
			]);
		};
	}
});
//#endregion
export { RangeCalendar_vue_vue_type_script_setup_true_lang_default as default };

