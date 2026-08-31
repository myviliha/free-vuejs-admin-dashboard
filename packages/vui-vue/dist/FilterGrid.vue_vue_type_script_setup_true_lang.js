import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { FILTER_GRID_ROOT, cn } from "@viliha/vui-core";
//#region src/FilterGrid.vue?vue&type=script&setup=true&lang.ts
/**
* The theme's filter layout: two columns, label then control, one row per field, with labels aligned
* across every row. Compose filters with this and `FilterField` rather than hand-rolling a layout,
* so the design principle cannot be styled away.
*/
var FilterGrid_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FilterGrid",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(FILTER_GRID_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { FilterGrid_vue_vue_type_script_setup_true_lang_default as default };

