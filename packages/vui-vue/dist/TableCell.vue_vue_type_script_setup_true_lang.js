import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { TABLE_CELL, cn } from "@viliha/vui-core";
//#region src/TableCell.vue?vue&type=script&setup=true&lang.ts
var TableCell_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TableCell",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABLE_CELL, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("td", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { TableCell_vue_vue_type_script_setup_true_lang_default as default };

