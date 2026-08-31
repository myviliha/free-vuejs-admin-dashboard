import { useCommand } from "./command-context.js";
import { computed, createBlock, createCommentVNode, defineComponent, normalizeClass, onUnmounted, openBlock, renderSlot, unref, watchEffect, withCtx } from "vue";
import { ListboxItem } from "reka-ui";
import { COMMAND_ITEM, cn } from "@viliha/vui-core";
//#region src/CommandItem.vue?vue&type=script&setup=true&lang.ts
/**
* One row.
*
* **Nothing is mapped here, and that is deliberate.** `COMMAND_ITEM` styles the highlighted row in
* both vocabularies: `data-[selected=true]:` for `cmdk` and `data-[highlighted]:` for Reka. Emitting
* `cmdk`'s attribute from this component was the first attempt and it cannot work, because a variant
* only matches the element its class is on and only the primitive knows which row is highlighted. So
* the shared string accepts both, which is the general remedy `D23` records.
*/
var CommandItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandItem",
	props: {
		value: {},
		keywords: {},
		disabled: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(COMMAND_ITEM, props.class));
		const command = useCommand();
		const shown = computed(() => command.matches(`${props.value} ${props.keywords ?? ""}`));
		watchEffect(() => command.report(props.value, shown.value));
		onUnmounted(() => command.report(props.value, false));
		return (_ctx, _cache) => {
			return shown.value ? (openBlock(), createBlock(unref(ListboxItem), {
				key: 0,
				value: __props.value,
				disabled: __props.disabled,
				class: normalizeClass(classes.value),
				"data-slot": "command-item"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"value",
				"disabled",
				"class"
			])) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { CommandItem_vue_vue_type_script_setup_true_lang_default as default };

