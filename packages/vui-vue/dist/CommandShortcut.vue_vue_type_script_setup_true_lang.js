import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { COMMAND_SHORTCUT, cn } from "@viliha/vui-core";
//#region src/CommandShortcut.vue?vue&type=script&setup=true&lang.ts
var CommandShortcut_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandShortcut",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(COMMAND_SHORTCUT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(classes.value),
				"data-slot": "command-shortcut"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { CommandShortcut_vue_vue_type_script_setup_true_lang_default as default };

