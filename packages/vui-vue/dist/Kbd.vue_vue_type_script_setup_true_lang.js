import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { KBD_BASE, cn } from "@viliha/vui-core";
//#region src/Kbd.vue?vue&type=script&setup=true&lang.ts
/** A single keyboard key cap. */
var Kbd_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Kbd",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(KBD_BASE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("kbd", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Kbd_vue_vue_type_script_setup_true_lang_default as default };

