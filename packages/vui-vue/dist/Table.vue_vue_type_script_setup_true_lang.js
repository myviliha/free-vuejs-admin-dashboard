import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { TABLE_ROOT, cn } from "@viliha/vui-core";
//#region src/Table.vue?vue&type=script&setup=true&lang.ts
var Table_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Table",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABLE_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("table", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Table_vue_vue_type_script_setup_true_lang_default as default };

