import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { FIELD_GRID_ROOT, cn } from "@viliha/vui-core";
//#region src/FieldGrid.vue?vue&type=script&setup=true&lang.ts
/**
* The form design standard: two columns, label then control, one row per field. Labels are
* sized to the longest one (`max-content`), so every control lines up across rows. Wrap a
* group of `Field`s in it.
*/
var FieldGrid_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FieldGrid",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(FIELD_GRID_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { FieldGrid_vue_vue_type_script_setup_true_lang_default as default };

