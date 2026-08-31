import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { TABLE_HEAD, cn } from "@viliha/vui-core";
//#region src/TableHead.vue?vue&type=script&setup=true&lang.ts
var TableHead_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TableHead",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABLE_HEAD, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("th", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { TableHead_vue_vue_type_script_setup_true_lang_default as default };

