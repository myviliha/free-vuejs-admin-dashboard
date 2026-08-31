import Combobox_default from "./Combobox.js";
import { Fragment, computed, createElementBlock, createElementVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderList, toDisplayString, unref, useModel } from "vue";
import { CASCADE_LEVEL, CASCADE_LEVEL_IN_ROW, CASCADE_LEVEL_LABEL, CASCADE_ROOT_ROW, CASCADE_ROOT_STACKED, cascadeRows, cascadeSelect, cn } from "@viliha/vui-core";
//#region src/CascadingCombobox.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["for"];
/**
* Cascading combobox for fixed, named levels: Region, then Country, then State, then City. One
* searchable `Combobox` per level; choosing one narrows the next from that node's children and
* **clears everything downstream**.
*
* **The tree walk is imported, not rewritten.** `cascadeRows` and `cascadeSelect` come from
* `@viliha/vui-core`, so the two editions cannot disagree about which levels a change clears. Getting
* that subtly wrong looks like a stale option list rather than a broken component, which is exactly
* the kind of drift a markup parity test never sees.
*/
var CascadingCombobox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CascadingCombobox",
	props: /*@__PURE__*/ mergeModels({
		levels: {},
		items: {},
		orientation: { default: "vertical" },
		class: {}
	}, {
		"modelValue": { default: () => [] },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["change"], ["update:modelValue"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		/** The selected path, one value per level. A shorter array means the deeper levels are unset. */
		const model = useModel(__props, "modelValue");
		/** Fires with the new path and the resolved node at each step of it, as React's `onValueChange` does. */
		const emit = __emit;
		const rows = computed(() => cascadeRows(props.levels, props.items, model.value));
		const rootClasses = computed(() => cn(props.orientation === "horizontal" ? CASCADE_ROOT_ROW : CASCADE_ROOT_STACKED, props.class));
		const levelClasses = computed(() => cn(CASCADE_LEVEL, props.orientation === "horizontal" && CASCADE_LEVEL_IN_ROW));
		const select = (levelIndex, next) => {
			const { path, nodes } = cascadeSelect(props.items, model.value, levelIndex, next);
			model.value = path;
			emit("change", path, nodes);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(rootClasses.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row, i) => {
				return openBlock(), createElementBlock("div", {
					key: row.level.key,
					class: normalizeClass(levelClasses.value)
				}, [createElementVNode("label", {
					for: row.level.key,
					class: normalizeClass(unref(CASCADE_LEVEL_LABEL))
				}, toDisplayString(row.level.label), 11, _hoisted_1), createVNode(Combobox_default, {
					id: row.level.key,
					"model-value": model.value[i] ?? "",
					options: row.options,
					"aria-label": row.level.label,
					disabled: !row.enabled,
					placeholder: row.level.placeholder ?? `Select ${row.level.label.toLowerCase()}…`,
					"onUpdate:modelValue": (next) => select(i, next)
				}, null, 8, [
					"id",
					"model-value",
					"options",
					"aria-label",
					"disabled",
					"placeholder",
					"onUpdate:modelValue"
				])], 2);
			}), 128))], 2);
		};
	}
});
//#endregion
export { CascadingCombobox_vue_vue_type_script_setup_true_lang_default as default };

