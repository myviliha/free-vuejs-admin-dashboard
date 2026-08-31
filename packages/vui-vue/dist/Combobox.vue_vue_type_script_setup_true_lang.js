import Skeleton_default from "./Skeleton.js";
import { useAsyncOptions } from "./use-async-options.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, ref, renderList, toDisplayString, unref, useModel, withCtx } from "vue";
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxPortal, ComboboxRoot, ComboboxTrigger, ComboboxViewport } from "reka-ui";
import { COMBOBOX_CHEVRON, COMBOBOX_SKELETON, COMBOBOX_TRIGGER, COMBOBOX_VALUE, PICKER_EMPTY, PICKER_ERROR, PICKER_LIST, PICKER_OPTION, PICKER_OPTION_CHECK, PICKER_OPTION_LABEL, PICKER_PANEL, PICKER_SEARCH_ICON, PICKER_SEARCH_INPUT, PICKER_SEARCH_ROW, PICKER_SPINNER, cn } from "@viliha/vui-core";
//#region src/Combobox.vue?vue&type=script&setup=true&lang.ts
var Combobox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Combobox",
	props: /*@__PURE__*/ mergeModels({
		options: {},
		source: {},
		resetKey: {},
		id: {},
		ariaLabel: {},
		disabled: { type: Boolean },
		placeholder: { default: "Select…" },
		searchPlaceholder: { default: "Search…" },
		emptyText: { default: "No matches" },
		loadingText: { default: "Loading…" },
		errorText: { default: "Couldn't load, retry" },
		class: {}
	}, {
		"modelValue": { default: "" },
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
		const selected = computed(() => pool.value.find((o) => o.value === model.value));
		/**
		* While an async label is still resolving the trigger shimmers. It never shows the raw id, which
		* means nothing to a reader, and never the placeholder, which would read as "nothing selected".
		*/
		const resolvingLabel = computed(() => Boolean(model.value) && !selected.value && async.resolving.value);
		const showLoading = computed(() => isAsync.value && async.loading.value && list.value.length === 0);
		const showError = computed(() => isAsync.value && async.error.value && !async.loading.value);
		const triggerClasses = computed(() => cn(COMBOBOX_TRIGGER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ComboboxRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => model.value = $event),
				open: open.value,
				"onUpdate:open": _cache[3] || (_cache[3] = ($event) => open.value = $event),
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
						default: withCtx(() => [resolvingLabel.value ? (openBlock(), createBlock(Skeleton_default, {
							key: 0,
							class: normalizeClass(unref(COMBOBOX_SKELETON))
						}, null, 8, ["class"])) : (openBlock(), createElementBlock("span", {
							key: 1,
							class: normalizeClass(unref(COMBOBOX_VALUE))
						}, toDisplayString(selected.value?.label ?? __props.placeholder), 3)), (openBlock(), createElementBlock("svg", {
							class: normalizeClass(unref(COMBOBOX_CHEVRON)),
							xmlns: "http://www.w3.org/2000/svg",
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true"
						}, [..._cache[4] || (_cache[4] = [createElementVNode("path", {
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
						default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(PICKER_SEARCH_ROW)) }, [
							(openBlock(), createElementBlock("svg", {
								class: normalizeClass(unref(PICKER_SEARCH_ICON)),
								xmlns: "http://www.w3.org/2000/svg",
								width: "15",
								height: "15",
								viewBox: "0 0 15 15",
								fill: "none",
								"aria-hidden": "true"
							}, [..._cache[5] || (_cache[5] = [createElementVNode("path", {
								d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
								fill: "currentColor",
								"fill-rule": "evenodd",
								"clip-rule": "evenodd"
							}, null, -1)])], 2)),
							createVNode(unref(ComboboxInput), {
								modelValue: query.value,
								"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event),
								"display-value": () => "",
								placeholder: __props.searchPlaceholder,
								class: normalizeClass(unref(PICKER_SEARCH_INPUT))
							}, null, 8, [
								"modelValue",
								"placeholder",
								"class"
							]),
							unref(async).loading.value && list.value.length > 0 ? (openBlock(), createElementBlock("svg", {
								key: 0,
								class: normalizeClass(unref(PICKER_SPINNER)),
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2",
								"aria-hidden": "true"
							}, [..._cache[6] || (_cache[6] = [createElementVNode("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }, null, -1)])], 2)) : createCommentVNode("", true)
						], 2), createVNode(unref(ComboboxViewport), { class: normalizeClass(unref(PICKER_LIST)) }, {
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
									default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(PICKER_OPTION_LABEL)) }, toDisplayString(option.label), 3), option.value === model.value ? (openBlock(), createElementBlock("svg", {
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
export { Combobox_vue_vue_type_script_setup_true_lang_default as default };

