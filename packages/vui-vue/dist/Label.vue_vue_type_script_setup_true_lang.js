import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { Label } from "reka-ui";
import { LABEL_BASE, cn } from "@viliha/vui-core";
//#region src/Label.vue?vue&type=script&setup=true&lang.ts
var Label_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Label",
	props: {
		for: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(LABEL_BASE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Label), {
				"data-slot": "label",
				for: props.for,
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["for", "class"]);
		};
	}
});
//#endregion
export { Label_vue_vue_type_script_setup_true_lang_default as default };

