import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { MENU_ROOT, cn } from "@viliha/vui-core";
//#region src/Menu.vue?vue&type=script&setup=true&lang.ts
var Menu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Menu",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(MENU_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "menu"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Menu_vue_vue_type_script_setup_true_lang_default as default };

