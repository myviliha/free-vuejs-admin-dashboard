import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { ListboxContent } from "reka-ui";
import { COMMAND_LIST, cn } from "@viliha/vui-core";
//#region src/CommandList.vue?vue&type=script&setup=true&lang.ts
var CommandList_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandList",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(COMMAND_LIST, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxContent), {
				class: normalizeClass(classes.value),
				"data-slot": "command-list"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { CommandList_vue_vue_type_script_setup_true_lang_default as default };

