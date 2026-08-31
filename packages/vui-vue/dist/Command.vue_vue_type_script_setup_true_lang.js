import { COMMAND, createCommandContext } from "./command-context.js";
import { computed, createBlock, defineComponent, mergeModels, normalizeClass, openBlock, provide, renderSlot, unref, useModel, withCtx } from "vue";
import { ListboxRoot } from "reka-ui";
import { COMMAND_ROOT, cn } from "@viliha/vui-core";
//#region src/Command.vue?vue&type=script&setup=true&lang.ts
/**
* A filtered, keyboard-driven list: the surface a palette or a picker is built out of.
*
* **React's wraps `cmdk`; this wraps Reka's `Listbox`, and no new dependency was added.** That was
* `D15`: Reka ships the primitive, so the Vue edition needs no `cmdk` equivalent. The behaviour comes
* from the primitive in both cases, which is the point of `D2`, and the markup differs because the two
* primitives differ.
*
* `CommandPalette` does not use this component in either edition. It is its own thing and depends on
* no list primitive at all.
*
* **The filtering is this component's, not the primitive's.** Reka's `Listbox` stores a search term
* and highlights the first row; it does not narrow the list, which `cmdk` does. See
* `command-context.ts` for what closes that gap and why the first version of this port silently
* filtered nothing.
*/
var Command_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Command",
	props: /*@__PURE__*/ mergeModels({ class: {} }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const classes = computed(() => cn(COMMAND_ROOT, props.class));
		provide(COMMAND, createCommandContext());
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				class: normalizeClass(classes.value),
				"data-slot": "command"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["modelValue", "class"]);
		};
	}
});
//#endregion
export { Command_vue_vue_type_script_setup_true_lang_default as default };

