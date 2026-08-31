import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { BREADCRUMB_LIST, cn } from "@viliha/vui-core";
//#region src/BreadcrumbList.vue?vue&type=script&setup=true&lang.ts
var BreadcrumbList_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BreadcrumbList",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMB_LIST, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("ol", {
				class: normalizeClass(classes.value),
				"data-slot": "breadcrumb-list"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { BreadcrumbList_vue_vue_type_script_setup_true_lang_default as default };

