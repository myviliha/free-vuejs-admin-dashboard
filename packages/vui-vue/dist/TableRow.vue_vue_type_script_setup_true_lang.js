import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { TABLE_ROW, cn } from "@viliha/vui-core";
//#region src/TableRow.vue?vue&type=script&setup=true&lang.ts
var TableRow_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TableRow",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABLE_ROW, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("tr", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { TableRow_vue_vue_type_script_setup_true_lang_default as default };

