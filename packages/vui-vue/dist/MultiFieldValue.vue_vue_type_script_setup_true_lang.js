import MissingValue_default from "./MissingValue.js";
import Skeleton_default from "./Skeleton.js";
import { useAsyncOptions } from "./use-async-options.js";
import Tooltip_default from "./Tooltip.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderList, toDisplayString, unref, withCtx } from "vue";
import { RECORD_CHIP, RECORD_CHIPS_SKELETON, RECORD_CHIP_MORE, RECORD_CHIP_ROW } from "@viliha/vui-core";
//#region src/MultiFieldValue.vue?vue&type=script&setup=true&lang.ts
/**
* Read display for a `multiple` field: resolves each value's label (batched through the field's
* `resolveOptions`, or a static `options` array) and shows up to `maxChipsInCell` chips, then `+N` with
* the full list in a tooltip.
*
* Same rule as the single value, and it is the rule worth keeping: a skeleton until the labels land,
* and a value that never resolved is **dropped rather than shown as an id**.
*/
var MultiFieldValue_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MultiFieldValue",
	props: {
		field: {},
		values: {},
		row: {}
	},
	setup(__props) {
		const props = __props;
		const source = computed(() => props.field.loadOptions ? {
			loadOptions: ({ search, signal }) => props.field.loadOptions({
				search,
				signal,
				values: props.row
			}),
			resolveOptions: props.field.resolveOptions,
			resolveOption: props.field.resolveOption
		} : void 0);
		const resetKey = computed(() => (props.field.dependsOn ?? []).map((k) => String(props.row[k] ?? "")).join(" "));
		const { options, resolving } = useAsyncOptions({
			source,
			open: false,
			search: "",
			value: () => props.values,
			resetKey
		});
		const resolvedLabels = computed(() => {
			const staticOpts = Array.isArray(props.field.options) ? props.field.options : [];
			return props.values.map((v) => options.value.find((o) => o.value === v)?.label ?? staticOpts.find((o) => o.value === v)?.label);
		});
		const pending = computed(() => resolving.value && resolvedLabels.value.some((l) => l === void 0));
		const labels = computed(() => resolvedLabels.value.filter((l) => l !== void 0));
		const max = computed(() => props.field.maxChipsInCell ?? 3);
		const shown = computed(() => labels.value.slice(0, max.value));
		const extra = computed(() => labels.value.length - shown.value.length);
		return (_ctx, _cache) => {
			return !__props.values.length ? (openBlock(), createBlock(MissingValue_default, { key: 0 })) : pending.value ? (openBlock(), createBlock(Skeleton_default, {
				key: 1,
				class: normalizeClass(unref(RECORD_CHIPS_SKELETON))
			}, null, 8, ["class"])) : !labels.value.length ? (openBlock(), createBlock(MissingValue_default, { key: 2 })) : (openBlock(), createElementBlock("span", {
				key: 3,
				class: normalizeClass(unref(RECORD_CHIP_ROW))
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(shown.value, (l, i) => {
				return openBlock(), createElementBlock("span", {
					key: i,
					class: normalizeClass(unref(RECORD_CHIP))
				}, toDisplayString(l), 3);
			}), 128)), extra.value > 0 ? (openBlock(), createBlock(Tooltip_default, {
				key: 0,
				content: labels.value.join(", ")
			}, {
				default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(RECORD_CHIP_MORE)) }, "+" + toDisplayString(extra.value), 3)]),
				_: 1
			}, 8, ["content"])) : createCommentVNode("", true)], 2));
		};
	}
});
//#endregion
export { MultiFieldValue_vue_vue_type_script_setup_true_lang_default as default };

