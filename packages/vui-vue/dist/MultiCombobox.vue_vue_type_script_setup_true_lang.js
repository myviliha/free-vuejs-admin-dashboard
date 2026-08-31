import Skeleton_default from "./Skeleton.js";
import { useAsyncOptions } from "./use-async-options.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, ref, renderList, toDisplayString, unref, useModel, withCtx, withKeys, withModifiers } from "vue";
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxPortal, ComboboxRoot, ComboboxTrigger, ComboboxViewport } from "reka-ui";
import { MULTI_COMBOBOX_CHEVRON, MULTI_COMBOBOX_PLACEHOLDER, MULTI_COMBOBOX_SKELETON, MULTI_COMBOBOX_STATES, MULTI_COMBOBOX_TAG, MULTI_COMBOBOX_TAGS, MULTI_COMBOBOX_TAG_LABEL, MULTI_COMBOBOX_TAG_REMOVE, MULTI_COMBOBOX_TAG_REMOVE_ICON, MULTI_COMBOBOX_TRIGGER, PICKER_EMPTY, PICKER_ERROR, PICKER_LIST, PICKER_OPTION, PICKER_OPTION_CHECK, PICKER_OPTION_LABEL, PICKER_PANEL, PICKER_SEARCH_ICON, PICKER_SEARCH_INPUT, PICKER_SEARCH_ROW, cn } from "@viliha/vui-core";
//#region src/MultiCombobox.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"aria-label",
	"onClick",
	"onKeydown"
];
var MultiCombobox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MultiCombobox",
	props: /*@__PURE__*/ mergeModels({
		options: {},
		source: {},
		resetKey: {},
		id: {},
		ariaLabel: {},
		disabled: { type: Boolean },
		invalid: { type: Boolean },
		placeholder: { default: "Select…" },
		searchPlaceholder: { default: "Search…" },
		emptyText: { default: "No matches" },
		loadingText: { default: "Loading…" },
		errorText: { default: "Couldn't load, retry" },
		class: {}
	}, {
		"modelValue": { default: () => [] },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const open = ref(false);
		const query = ref("");
		const async = useAsyncOptions({
			source: () => props.source,
			open,
			search: query,
			value: () => model.value,
			resetKey: () => props.resetKey
		});
		const isAsync = computed(() => Boolean(props.source));
		const list = computed(() => {
			if (isAsync.value) return async.options.value;
			const opts = props.options ?? [];
			const q = query.value.trim().toLowerCase();
			return q ? opts.filter((o) => o.label.toLowerCase().includes(q)) : opts;
		});
		const pool = computed(() => isAsync.value ? async.options.value : props.options ?? []);
		/** One tag per chosen value, in the order chosen, with the label if it is known yet. */
		const tags = computed(() => model.value.map((value) => ({
			value,
			label: pool.value.find((o) => o.value === value)?.label
		})));
		const showLoading = computed(() => isAsync.value && async.loading.value && list.value.length === 0);
		const showError = computed(() => isAsync.value && async.error.value && !async.loading.value);
		const triggerClasses = computed(() => cn(MULTI_COMBOBOX_TRIGGER, MULTI_COMBOBOX_STATES[props.invalid ? "invalid" : "valid"], props.class));
		const remove = (value) => {
			model.value = model.value.filter((v) => v !== value);
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ComboboxRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => model.value = $event),
				open: open.value,
				"onUpdate:open": _cache[3] || (_cache[3] = ($event) => open.value = $event),
				multiple: "",
				disabled: __props.disabled,
				"ignore-filter": isAsync.value,
				"as-child": ""
			}, {
				default: withCtx(() => [createVNode(unref(ComboboxAnchor), { "as-child": "" }, {
					default: withCtx(() => [createVNode(unref(ComboboxTrigger), {
						id: __props.id,
						tabindex: "0",
						"aria-label": __props.ariaLabel,
						class: normalizeClass(triggerClasses.value)
					}, {
						default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(MULTI_COMBOBOX_TAGS)) }, [tags.value.length === 0 ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: normalizeClass(unref(MULTI_COMBOBOX_PLACEHOLDER))
						}, toDisplayString(__props.placeholder), 3)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(tags.value, (tag) => {
							return openBlock(), createElementBlock("span", {
								key: tag.value,
								class: normalizeClass(unref(MULTI_COMBOBOX_TAG))
							}, [!tag.label && unref(async).resolving.value ? (openBlock(), createBlock(Skeleton_default, {
								key: 0,
								class: normalizeClass(unref(MULTI_COMBOBOX_SKELETON))
							}, null, 8, ["class"])) : (openBlock(), createElementBlock("span", {
								key: 1,
								class: normalizeClass(unref(MULTI_COMBOBOX_TAG_LABEL))
							}, toDisplayString(tag.label ?? "—"), 3)), createElementVNode("span", {
								role: "button",
								tabindex: "-1",
								"aria-label": `Remove ${tag.label ?? "selection"}`,
								class: normalizeClass(unref(MULTI_COMBOBOX_TAG_REMOVE)),
								onClick: withModifiers(($event) => remove(tag.value), ["stop"]),
								onKeydown: withKeys(withModifiers(($event) => remove(tag.value), ["stop"]), ["enter"])
							}, [(openBlock(), createElementBlock("svg", {
								class: normalizeClass(unref(MULTI_COMBOBOX_TAG_REMOVE_ICON)),
								xmlns: "http://www.w3.org/2000/svg",
								width: "15",
								height: "15",
								viewBox: "0 0 15 15",
								fill: "none",
								"aria-hidden": "true"
							}, [..._cache[4] || (_cache[4] = [createElementVNode("path", {
								d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
								fill: "currentColor",
								"fill-rule": "evenodd",
								"clip-rule": "evenodd"
							}, null, -1)])], 2))], 42, _hoisted_1)], 2);
						}), 128))], 2), (openBlock(), createElementBlock("svg", {
							class: normalizeClass(unref(MULTI_COMBOBOX_CHEVRON)),
							xmlns: "http://www.w3.org/2000/svg",
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true"
						}, [..._cache[5] || (_cache[5] = [createElementVNode("path", {
							d: "M4.18179 6.18181C4.35753 6.00608 4.6424 6.00608 4.81813 6.18181L7.49996 8.86363L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8181 6.18181C10.9938 6.35755 10.9938 6.64243 10.8181 6.81816L7.81813 9.81816C7.6424 9.9939 7.35753 9.9939 7.18179 9.81816L4.18179 6.81816C4.00605 6.64243 4.00605 6.35755 4.18179 6.18181Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2))]),
						_: 1
					}, 8, [
						"id",
						"aria-label",
						"class"
					])]),
					_: 1
				}), createVNode(unref(ComboboxPortal), null, {
					default: withCtx(() => [createVNode(unref(ComboboxContent), {
						class: normalizeClass(unref(PICKER_PANEL)),
						position: "popper",
						"side-offset": 4
					}, {
						default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(PICKER_SEARCH_ROW)) }, [(openBlock(), createElementBlock("svg", {
							class: normalizeClass(unref(PICKER_SEARCH_ICON)),
							xmlns: "http://www.w3.org/2000/svg",
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true"
						}, [..._cache[6] || (_cache[6] = [createElementVNode("path", {
							d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2)), createVNode(unref(ComboboxInput), {
							modelValue: query.value,
							"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event),
							"display-value": () => "",
							placeholder: __props.searchPlaceholder,
							class: normalizeClass(unref(PICKER_SEARCH_INPUT))
						}, null, 8, [
							"modelValue",
							"placeholder",
							"class"
						])], 2), createVNode(unref(ComboboxViewport), { class: normalizeClass(unref(PICKER_LIST)) }, {
							default: withCtx(() => [showLoading.value ? (openBlock(), createElementBlock("p", {
								key: 0,
								class: normalizeClass(unref(PICKER_EMPTY))
							}, toDisplayString(__props.loadingText), 3)) : showError.value ? (openBlock(), createElementBlock("button", {
								key: 1,
								type: "button",
								class: normalizeClass(unref(PICKER_ERROR)),
								onClick: _cache[1] || (_cache[1] = ($event) => unref(async).reload())
							}, toDisplayString(__props.errorText), 3)) : (openBlock(), createBlock(unref(ComboboxEmpty), {
								key: 2,
								class: normalizeClass(unref(PICKER_EMPTY))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(__props.emptyText), 1)]),
								_: 1
							}, 8, ["class"])), (openBlock(true), createElementBlock(Fragment, null, renderList(list.value, (option) => {
								return openBlock(), createBlock(unref(ComboboxItem), {
									key: option.value,
									value: option.value,
									class: normalizeClass(unref(PICKER_OPTION))
								}, {
									default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(PICKER_OPTION_LABEL)) }, toDisplayString(option.label), 3), model.value.includes(option.value) ? (openBlock(), createElementBlock("svg", {
										key: 0,
										class: normalizeClass(unref(PICKER_OPTION_CHECK)),
										xmlns: "http://www.w3.org/2000/svg",
										width: "15",
										height: "15",
										viewBox: "0 0 15 15",
										fill: "none",
										"aria-hidden": "true"
									}, [..._cache[7] || (_cache[7] = [createElementVNode("path", {
										d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
										fill: "currentColor",
										"fill-rule": "evenodd",
										"clip-rule": "evenodd"
									}, null, -1)])], 2)) : createCommentVNode("", true)]),
									_: 2
								}, 1032, ["value", "class"]);
							}), 128))]),
							_: 1
						}, 8, ["class"])]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				})]),
				_: 1
			}, 8, [
				"modelValue",
				"open",
				"disabled",
				"ignore-filter"
			]);
		};
	}
});
//#endregion
export { MultiCombobox_vue_vue_type_script_setup_true_lang_default as default };

