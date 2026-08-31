import { computed, createElementBlock, defineComponent, normalizeClass, openBlock } from "vue";
import { COMMAND_SEPARATOR, cn } from "@viliha/vui-core";
//#region src/CommandSeparator.vue?vue&type=script&setup=true&lang.ts
var CommandSeparator_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandSeparator",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(COMMAND_SEPARATOR, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				role: "separator",
				"data-slot": "command-separator"
			}, null, 2);
		};
	}
});
//#endregion
export { CommandSeparator_vue_vue_type_script_setup_true_lang_default as default };

