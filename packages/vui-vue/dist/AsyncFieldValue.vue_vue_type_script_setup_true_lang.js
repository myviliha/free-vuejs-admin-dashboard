import MissingValue_default from "./MissingValue.js";
import Skeleton_default from "./Skeleton.js";
import { useAsyncOptions } from "./use-async-options.js";
import { Fragment, computed, createBlock, createElementBlock, createTextVNode, defineComponent, normalizeClass, openBlock, toDisplayString, unref } from "vue";
import { RECORD_VALUE_SKELETON } from "@viliha/vui-core";
//#region src/AsyncFieldValue.vue?vue&type=script&setup=true&lang.ts
/**
* Read-mode label for an async-id field. Resolves the set value's label through `resolveOption` (one
* record, never the whole list) and shows a skeleton until it lands — **never the raw id**, which
* means nothing to a reader. A value that resolves to nothing reads as missing.
*
* `open: false` is the whole trick, and it is React's: the composable then calls `resolveOption` and
* never `loadOptions`, so a table of fifty cells costs one batched request rather than fifty lists.
*/
var AsyncFieldValue_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AsyncFieldValue",
	props: {
		field: {},
		value: {},
		values: {}
	},
	setup(__props) {
		const props = __props;
		const source = computed(() => ({
			loadOptions: ({ search, signal }) => props.field.loadOptions({
				search,
				signal,
				values: props.values
			}),
			resolveOptions: props.field.resolveOptions,
			resolveOption: props.field.resolveOption
		}));
		const resetKey = computed(() => (props.field.dependsOn ?? []).map((k) => String(props.values[k] ?? "")).join(" "));
		const { options, resolving } = useAsyncOptions({
			source,
			open: false,
			search: "",
			value: () => props.value,
			resetKey
		});
		const label = computed(() => options.value.find((o) => o.value === props.value)?.label);
		return (_ctx, _cache) => {
			return label.value !== void 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(label.value), 1)], 64)) : unref(resolving) ? (openBlock(), createBlock(Skeleton_default, {
				key: 1,
				class: normalizeClass(unref(RECORD_VALUE_SKELETON))
			}, null, 8, ["class"])) : (openBlock(), createBlock(MissingValue_default, { key: 2 }));
		};
	}
});
//#endregion
export { AsyncFieldValue_vue_vue_type_script_setup_true_lang_default as default };

