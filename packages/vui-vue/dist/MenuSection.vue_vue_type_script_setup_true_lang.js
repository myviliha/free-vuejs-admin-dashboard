import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { MENU_SECTION, cn } from "@viliha/vui-core";
//#region src/MenuSection.vue?vue&type=script&setup=true&lang.ts
var MenuSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MenuSection",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(MENU_SECTION, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "menu-section"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { MenuSection_vue_vue_type_script_setup_true_lang_default as default };

