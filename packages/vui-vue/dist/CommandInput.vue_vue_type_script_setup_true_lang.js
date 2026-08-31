import { useCommand } from "./command-context.js";
import { computed, createElementBlock, createElementVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, unref, useModel, watch } from "vue";
import { ListboxFilter } from "reka-ui";
import { COMMAND_INPUT, COMMAND_INPUT_ICON, COMMAND_INPUT_ROW, cn } from "@viliha/vui-core";
//#region src/CommandInput.vue?vue&type=script&setup=true&lang.ts
var CommandInput_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandInput",
	props: /*@__PURE__*/ mergeModels({
		placeholder: {},
		class: {}
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const command = useCommand();
		watch(model, (value) => {
			command.search.value = value ?? "";
		});
		const props = __props;
		const classes = computed(() => cn(COMMAND_INPUT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(unref(COMMAND_INPUT_ROW)),
				"data-slot": "command-input-wrapper"
			}, [(openBlock(), createElementBlock("svg", {
				class: normalizeClass(unref(COMMAND_INPUT_ICON)),
				xmlns: "http://www.w3.org/2000/svg",
				width: "24",
				height: "24",
				viewBox: "0 0 15 15",
				fill: "none",
				"aria-hidden": "true"
			}, [..._cache[1] || (_cache[1] = [createElementVNode("path", {
				d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
				fill: "currentColor",
				"fill-rule": "evenodd",
				"clip-rule": "evenodd"
			}, null, -1)])], 2)), createVNode(unref(ListboxFilter), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				placeholder: __props.placeholder,
				class: normalizeClass(classes.value)
			}, null, 8, [
				"modelValue",
				"placeholder",
				"class"
			])], 2);
		};
	}
});
//#endregion
export { CommandInput_vue_vue_type_script_setup_true_lang_default as default };

