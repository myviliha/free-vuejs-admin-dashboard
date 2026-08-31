import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { TABLE_CAPTION, cn } from "@viliha/vui-core";
//#region src/TableCaption.vue?vue&type=script&setup=true&lang.ts
var TableCaption_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TableCaption",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABLE_CAPTION, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("caption", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { TableCaption_vue_vue_type_script_setup_true_lang_default as default };

