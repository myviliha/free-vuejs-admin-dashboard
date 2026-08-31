import { useCommand } from "./command-context.js";
import { computed, createCommentVNode, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref } from "vue";
import { COMMAND_EMPTY, cn } from "@viliha/vui-core";
//#region src/CommandEmpty.vue?vue&type=script&setup=true&lang.ts
/**
* Rendered only while nothing matches, which is what `cmdk`'s `Empty` does. The first version of this
* port rendered unconditionally, so "No results found." sat above a full list.
*/
var CommandEmpty_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandEmpty",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(COMMAND_EMPTY, props.class));
		const command = useCommand();
		return (_ctx, _cache) => {
			return unref(command).standalone || unref(command).visible.value === 0 ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(classes.value),
				"data-slot": "command-empty"
			}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { CommandEmpty_vue_vue_type_script_setup_true_lang_default as default };

