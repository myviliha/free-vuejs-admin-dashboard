import Skeleton_default from "./Skeleton.js";
import { useAsyncOptions } from "./use-async-options.js";
import SelectContent_default from "./SelectContent.js";
import SelectItem_default from "./SelectItem.js";
import { Fragment, computed, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, unref, useModel, withCtx } from "vue";
import { SelectIcon, SelectRoot, SelectTrigger, SelectValue, SelectViewport } from "reka-ui";
import { PICKER_EMPTY, PICKER_ERROR, RECORD_VALUE_SKELETON, SELECT_TRIGGER, SELECT_TRIGGER_PLACEHOLDER, cn } from "@viliha/vui-core";
//#region src/Select.vue?vue&type=script&setup=true&lang.ts
var Select_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Select",
	props: /*@__PURE__*/ mergeModels({
		options: {},
		source: {},
		resetKey: {},
		id: {},
		placeholder: {},
		disabled: { type: Boolean },
		ariaLabel: {},
		loadingText: { default: "Loading…" },
		errorText: { default: "Couldn't load — retry" },
		class: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const open = ref(false);
		const async = useAsyncOptions({
			source: () => props.source,
			open,
			search: "",
			value: () => model.value,
			resetKey: () => props.resetKey
		});
		const isAsync = computed(() => Boolean(props.source));
		const list = computed(() => isAsync.value ? async.options.value : props.options ?? []);
		const selected = computed(() => list.value.find((o) => o.value === model.value));
		const showLoading = computed(() => isAsync.value && async.loading.value && !list.value.length);
		const showError = computed(() => isAsync.value && async.error.value && !async.loading.value);
		/**
		* While an async label resolves the trigger shimmers rather than showing the raw id, which means
		* nothing to a reader, or the placeholder, which would read as "nothing selected". React's does the
		* same and this is the same skeleton size.
		*/
		const resolvingLabel = computed(() => Boolean(model.value) && !selected.value && async.resolving.value);
		const trigger = computed(() => cn(SELECT_TRIGGER, SELECT_TRIGGER_PLACEHOLDER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => model.value = $event),
				open: open.value,
				"onUpdate:open": _cache[2] || (_cache[2] = ($event) => open.value = $event),
				disabled: __props.disabled
			}, {
				default: withCtx(() => [createVNode(unref(SelectTrigger), {
					id: __props.id,
					"aria-label": __props.ariaLabel,
					class: normalizeClass(trigger.value)
				}, {
					default: withCtx(() => [resolvingLabel.value ? (openBlock(), createBlock(Skeleton_default, {
						key: 0,
						class: normalizeClass(unref(RECORD_VALUE_SKELETON))
					}, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectValue), {
						key: 1,
						class: "truncate",
						placeholder: __props.placeholder
					}, null, 8, ["placeholder"])), createVNode(unref(SelectIcon), null, {
						default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("svg", {
							class: "vui-icon-plain size-3.5 shrink-0 text-muted-foreground",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"aria-hidden": "true"
						}, [createElementVNode("path", { d: "m6 9 6 6 6-6" })], -1)])]),
						_: 1
					})]),
					_: 1
				}, 8, [
					"id",
					"aria-label",
					"class"
				]), createVNode(SelectContent_default, null, {
					default: withCtx(() => [createVNode(unref(SelectViewport), null, {
						default: withCtx(() => [showLoading.value ? (openBlock(), createElementBlock("p", {
							key: 0,
							class: normalizeClass(unref(PICKER_EMPTY))
						}, toDisplayString(__props.loadingText), 3)) : showError.value ? (openBlock(), createElementBlock("button", {
							key: 1,
							type: "button",
							class: normalizeClass(unref(PICKER_ERROR)),
							onClick: _cache[0] || (_cache[0] = ($event) => unref(async).reload())
						}, toDisplayString(__props.errorText), 3)) : (__props.options || __props.source) && !list.value.length ? (openBlock(), createElementBlock("p", {
							key: 2,
							class: normalizeClass(unref(PICKER_EMPTY))
						}, toDisplayString(__props.placeholder), 3)) : __props.options || __props.source ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(list.value, (o) => {
							return openBlock(), createBlock(SelectItem_default, {
								key: o.value,
								value: o.value
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(o.label), 1)]),
								_: 2
							}, 1032, ["value"]);
						}), 128)) : renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 4)]),
						_: 3
					})]),
					_: 3
				})]),
				_: 3
			}, 8, [
				"modelValue",
				"open",
				"disabled"
			]);
		};
	}
});
//#endregion
export { Select_vue_vue_type_script_setup_true_lang_default as default };

