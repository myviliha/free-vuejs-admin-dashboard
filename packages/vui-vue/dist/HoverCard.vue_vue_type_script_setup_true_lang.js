import { createBlock, defineComponent, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { HoverCardRoot } from "reka-ui";
//#region src/HoverCard.vue?vue&type=script&setup=true&lang.ts
var HoverCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HoverCard",
	props: {
		"open": { type: Boolean },
		"openModifiers": {}
	},
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(HoverCardRoot), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				"data-slot": "hover-card"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { HoverCard_vue_vue_type_script_setup_true_lang_default as default };

