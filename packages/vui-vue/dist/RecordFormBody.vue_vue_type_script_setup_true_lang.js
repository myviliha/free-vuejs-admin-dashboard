import MissingValue_default from "./MissingValue.js";
import AsyncFieldValue_default from "./AsyncFieldValue.js";
import Combobox_default from "./Combobox.js";
import Input_default from "./Input.js";
import RequiredMark_default from "./RequiredMark.js";
import Tooltip_default from "./Tooltip.js";
import MultiCombobox_default from "./MultiCombobox.js";
import MultiFieldValue_default from "./MultiFieldValue.js";
import Select_default from "./Select.js";
import { useRecordForm } from "./record-form-context.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeProps, normalizeClass, openBlock, renderList, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";
import { FORM_CHECKBOX, FORM_CHECKBOX_ROW, FORM_CHECKBOX_TEXT, FORM_CONTROL_INVALID, FORM_CONTROL_WIDTH, FORM_ERROR_SR, FORM_ERROR_TEXT, FORM_FIELD_CONTROL, FORM_FIELD_DL, FORM_FIELD_ICON, FORM_FIELD_INFO, FORM_FIELD_INFO_STATES, FORM_FIELD_LABEL, FORM_FIELD_ROW, FORM_READ_VALUE, FORM_ROW_GAP, FORM_SECTION, FORM_SECTION_DESC, FORM_SECTION_TITLE, FORM_SLOT_ROW, FORM_TEXTAREA, FORM_TEXTAREA_STATES, RECORD_FIELD_GRID, RECORD_ROW_GRID, RECORD_RULE, cn, formatPhone, groupSlots, isAsyncLabeled, resetKeyOf, resolveOptions } from "@viliha/vui-core";
//#region src/RecordFormBody.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = { key: 0 };
var _hoisted_3 = [
	"checked",
	"aria-label",
	"onChange"
];
var _hoisted_4 = [
	"value",
	"aria-label",
	"aria-invalid",
	"placeholder",
	"onInput",
	"onBlur"
];
var RecordFormBody_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordFormBody",
	setup(__props) {
		const form = useRecordForm();
		const fieldsOf = (group) => form.fields.value.filter((f) => (f.group ?? "General") === group);
		const slotsOf = (group) => groupSlots(form.fields.value, form.slots.value, group);
		const value = (key) => form.draft.value[key];
		const text = (key) => String(value(key) ?? "");
		const invalid = (f) => form.errors.value.has(f.key);
		/** The message a field shows while editing. A read-only form shows none: nothing is being typed. */
		const message = (f) => form.readOnly.value ? void 0 : form.errors.value.get(f.key);
		const asyncSource = (f) => ({
			loadOptions: ({ search, signal }) => f.loadOptions({
				search,
				signal,
				values: form.draft.value
			}),
			resolveOptions: f.resolveOptions,
			resolveOption: f.resolveOption
		});
		const resetKey = (f) => resetKeyOf(f, form.draft.value);
		const options = (f) => resolveOptions(f.options, form.draft.value);
		const list = (f) => {
			const v = value(f.key);
			return Array.isArray(v) ? v : [];
		};
		const staticLabel = (f, raw) => Array.isArray(f.options) ? f.options.find((o) => o.value === raw)?.label ?? raw : raw;
		const editing = (f) => !form.readOnly.value && Boolean(f.editable);
		const showsRender = (f) => Boolean(f.render) && !(editing(f) && (f.renderInput || f.input === "checkbox"));
		const isChoice = (f) => Boolean(f.options || f.loadOptions);
		const rows = computed(() => form.rows.value);
		const placeholder = (f) => `Select ${f.label.toLowerCase()}…`;
		/**
		* **One stable component type for every render function.** `<component :is="fn">` uses the function
		* itself as the vnode type, and `isSameVNodeType` compares types by identity, so a helper that returns
		* a fresh closure each render made Vue unmount and remount the subtree on every draft change: a host's
		* `renderInput` lost focus after one character, and a stateful `formSlots` row reset while the user
		* typed in a different field. `Render` never changes identity, so the returned vnodes patch normally.
		*/
		const Render = (p) => p.fn();
		/**
		* The helpers below exist because **a template expression is parsed as plain JavaScript**, so a type
		* annotation or an `as` inside one is a compile error at runtime rather than a type error. Anything
		* that needs either is a named function here.
		*/
		const rowGrid = (count) => RECORD_ROW_GRID[Math.min(count, 3)];
		const write = (f, v) => form.setField(f.key, String(v ?? ""));
		const writeList = (f, v) => form.setField(f.key, Array.isArray(v) ? v : []);
		const toggle = (f, e) => form.setField(f.key, e.target.checked);
		const typed = (f, e) => {
			const raw = e.target.value;
			form.setField(f.key, f.format === "phone" ? formatPhone(raw) : raw);
		};
		/** A host's own control, and the read renderer: both are functions returning a node. */
		const custom = (f) => () => f.renderInput?.({
			value: text(f.key),
			onChange: (v) => form.setField(f.key, v),
			field: f,
			invalid: invalid(f)
		});
		const readRender = (f) => () => f.render?.(form.draft.value);
		const slotRender = (slot) => () => slot.render(form.ctx.value);
		const infoLabel = (f) => message(f) ? `${f.label}: ${message(f)}` : `About ${f.label}`;
		return (_ctx, _cache) => {
			return openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row, rowIndex) => {
				return openBlock(), createElementBlock("div", {
					key: `row-${rowIndex}`,
					class: normalizeClass(unref(cn)(rowGrid(row.sections.length), rowIndex > 0 && unref(FORM_ROW_GAP)))
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(row.sections, (section) => {
					return openBlock(), createElementBlock(Fragment, { key: section.group }, [fieldsOf(section.group).length ? (openBlock(), createElementBlock("section", {
						key: 0,
						class: normalizeClass(unref(FORM_SECTION))
					}, [
						createElementVNode("h3", { class: normalizeClass(unref(FORM_SECTION_TITLE)) }, toDisplayString(section.group), 3),
						section.description ? (openBlock(), createElementBlock("p", {
							key: 0,
							class: normalizeClass(unref(FORM_SECTION_DESC))
						}, toDisplayString(section.description), 3)) : createCommentVNode("", true),
						createElementVNode("dl", { class: normalizeClass(unref(cn)(unref(FORM_FIELD_DL), unref(RECORD_FIELD_GRID))) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(fieldsOf(section.group), (f) => {
							return openBlock(), createElementBlock(Fragment, { key: f.key }, [createElementVNode("div", { class: normalizeClass(unref(cn)(unref(FORM_FIELD_ROW), unref(RECORD_RULE))) }, [createElementVNode("dt", { class: normalizeClass(unref(cn)(unref(FORM_FIELD_LABEL), unref(RECORD_RULE))) }, [
								f.description || message(f) ? (openBlock(), createBlock(Tooltip_default, {
									key: 0,
									content: message(f) ?? f.description ?? ""
								}, {
									default: withCtx(() => [(openBlock(), createElementBlock("svg", {
										"aria-label": infoLabel(f),
										class: normalizeClass(unref(cn)(unref(FORM_FIELD_INFO), unref(FORM_FIELD_INFO_STATES)[message(f) ? "error" : "help"])),
										xmlns: "http://www.w3.org/2000/svg",
										width: "15",
										height: "15",
										viewBox: "0 0 15 15",
										fill: "none"
									}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
										d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",
										fill: "currentColor",
										"fill-rule": "evenodd",
										"clip-rule": "evenodd"
									}, null, -1)])], 10, _hoisted_1))]),
									_: 2
								}, 1032, ["content"])) : createCommentVNode("", true),
								f.icon ? (openBlock(), createBlock(resolveDynamicComponent(f.icon), {
									key: 1,
									class: normalizeClass(unref(FORM_FIELD_ICON))
								}, null, 8, ["class"])) : createCommentVNode("", true),
								createTextVNode(" " + toDisplayString(f.label) + " ", 1),
								f.required ? (openBlock(), createBlock(RequiredMark_default, { key: 2 })) : createCommentVNode("", true)
							], 2), createElementVNode("dd", { class: normalizeClass(unref(FORM_FIELD_CONTROL)) }, [showsRender(f) ? (openBlock(), createElementBlock("div", _hoisted_2, [createVNode(Render, { fn: readRender(f) }, null, 8, ["fn"])])) : editing(f) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [f.renderInput ? (openBlock(), createBlock(Render, {
								key: 0,
								fn: custom(f)
							}, null, 8, ["fn"])) : isChoice(f) && f.multiple ? (openBlock(), createBlock(MultiCombobox_default, mergeProps({
								key: 1,
								"model-value": list(f),
								"aria-label": f.label,
								placeholder: placeholder(f),
								invalid: invalid(f),
								class: unref(FORM_CONTROL_WIDTH)
							}, { ref_for: true }, f.loadOptions ? {
								source: asyncSource(f),
								resetKey: resetKey(f)
							} : { options: options(f) }, { "onUpdate:modelValue": (v) => writeList(f, v) }), null, 16, [
								"model-value",
								"aria-label",
								"placeholder",
								"invalid",
								"class",
								"onUpdate:modelValue"
							])) : isChoice(f) && f.input === "combobox" ? (openBlock(), createBlock(Combobox_default, mergeProps({
								key: 2,
								"model-value": text(f.key),
								"aria-label": f.label,
								placeholder: placeholder(f),
								class: unref(FORM_CONTROL_WIDTH)
							}, { ref_for: true }, f.loadOptions ? {
								source: asyncSource(f),
								resetKey: resetKey(f)
							} : { options: options(f) }, { "onUpdate:modelValue": (v) => write(f, v) }), null, 16, [
								"model-value",
								"aria-label",
								"placeholder",
								"class",
								"onUpdate:modelValue"
							])) : isChoice(f) ? (openBlock(), createBlock(Select_default, mergeProps({
								key: 3,
								"model-value": text(f.key),
								"aria-label": f.label,
								placeholder: placeholder(f),
								class: unref(FORM_CONTROL_WIDTH)
							}, { ref_for: true }, f.loadOptions ? {
								source: asyncSource(f),
								resetKey: resetKey(f)
							} : { options: options(f) }, { "onUpdate:modelValue": (v) => write(f, v) }), null, 16, [
								"model-value",
								"aria-label",
								"placeholder",
								"class",
								"onUpdate:modelValue"
							])) : f.input === "checkbox" ? (openBlock(), createElementBlock("label", {
								key: 4,
								class: normalizeClass(unref(FORM_CHECKBOX_ROW))
							}, [createElementVNode("input", {
								type: "checkbox",
								checked: Boolean(value(f.key)),
								"aria-label": f.label,
								class: normalizeClass(unref(FORM_CHECKBOX)),
								onChange: ($event) => toggle(f, $event)
							}, null, 42, _hoisted_3), createElementVNode("span", { class: normalizeClass(unref(FORM_CHECKBOX_TEXT)) }, toDisplayString(value(f.key) ? "Yes" : "No"), 3)], 2)) : f.input === "number" || f.input === "date" ? (openBlock(), createBlock(Input_default, {
								key: 5,
								type: f.input,
								"model-value": text(f.key),
								"aria-label": f.label,
								"aria-invalid": invalid(f) || void 0,
								class: normalizeClass(unref(cn)(unref(FORM_CONTROL_WIDTH), invalid(f) && unref(FORM_CONTROL_INVALID))),
								"onUpdate:modelValue": (v) => write(f, v),
								onBlur: ($event) => unref(form).blurField(f)
							}, null, 8, [
								"type",
								"model-value",
								"aria-label",
								"aria-invalid",
								"class",
								"onUpdate:modelValue",
								"onBlur"
							])) : (openBlock(), createElementBlock("textarea", {
								key: 6,
								value: text(f.key),
								"aria-label": f.label,
								"aria-invalid": invalid(f) || void 0,
								placeholder: `Add ${f.label.toLowerCase()}`,
								rows: 1,
								class: normalizeClass(unref(cn)(unref(FORM_TEXTAREA), unref(FORM_TEXTAREA_STATES)[invalid(f) ? "invalid" : "valid"])),
								onInput: ($event) => typed(f, $event),
								onBlur: ($event) => unref(form).blurField(f)
							}, null, 42, _hoisted_4))], 64)) : (openBlock(), createElementBlock("span", {
								key: 2,
								class: normalizeClass(unref(FORM_READ_VALUE))
							}, [f.displayValue ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [f.displayValue(unref(form).draft.value) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(f.displayValue(unref(form).draft.value)), 1)], 64)) : (openBlock(), createBlock(MissingValue_default, { key: 1 }))], 64)) : f.input === "checkbox" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(value(f.key) ? "Yes" : "No"), 1)], 64)) : f.multiple ? (openBlock(), createBlock(MultiFieldValue_default, {
								key: 2,
								field: f,
								values: list(f),
								row: unref(form).draft.value
							}, null, 8, [
								"field",
								"values",
								"row"
							])) : !text(f.key) ? (openBlock(), createBlock(MissingValue_default, { key: 3 })) : unref(isAsyncLabeled)(f) ? (openBlock(), createBlock(AsyncFieldValue_default, {
								key: 4,
								field: f,
								value: text(f.key),
								values: unref(form).draft.value
							}, null, 8, [
								"field",
								"value",
								"values"
							])) : (openBlock(), createElementBlock(Fragment, { key: 5 }, [createTextVNode(toDisplayString(staticLabel(f, text(f.key))), 1)], 64))], 2)), message(f) ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [unref(form).errorDisplay.value === "text" ? (openBlock(), createElementBlock("p", {
								key: 0,
								class: normalizeClass(unref(FORM_ERROR_TEXT))
							}, toDisplayString(message(f)), 3)) : (openBlock(), createElementBlock("span", {
								key: 1,
								role: "alert",
								class: normalizeClass(unref(FORM_ERROR_SR))
							}, toDisplayString(message(f)), 3))], 64)) : createCommentVNode("", true)], 2)], 2), (openBlock(true), createElementBlock(Fragment, null, renderList(slotsOf(section.group).get(f.key) ?? [], (slot) => {
								return openBlock(), createElementBlock("div", {
									key: `slot:${slot.id}`,
									class: normalizeClass(unref(cn)(unref(FORM_SLOT_ROW), unref(RECORD_RULE)))
								}, [createVNode(Render, { fn: slotRender(slot) }, null, 8, ["fn"])], 2);
							}), 128))], 64);
						}), 128)), (openBlock(true), createElementBlock(Fragment, null, renderList(slotsOf(section.group).get("") ?? [], (slot) => {
							return openBlock(), createElementBlock("div", {
								key: `slot:${slot.id}`,
								class: normalizeClass(unref(cn)(unref(FORM_SLOT_ROW), unref(RECORD_RULE)))
							}, [createVNode(Render, { fn: slotRender(slot) }, null, 8, ["fn"])], 2);
						}), 128))], 2)
					], 2)) : createCommentVNode("", true)], 64);
				}), 128))], 2);
			}), 128);
		};
	}
});
//#endregion
export { RecordFormBody_vue_vue_type_script_setup_true_lang_default as default };

