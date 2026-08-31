import { createBlock, defineComponent, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { PopoverRoot } from "reka-ui";
//#region src/Popover.vue?vue&type=script&setup=true&lang.ts
var Popover_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Popover",
	props: {
		"open": { type: Boolean },
		"openModifiers": {}
	},
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverRoot), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				"data-slot": "popover"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { Popover_vue_vue_type_script_setup_true_lang_default as default };

