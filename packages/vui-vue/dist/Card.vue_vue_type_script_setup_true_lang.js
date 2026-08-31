import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { CARD, cn } from "@viliha/vui-core";
//#region src/Card.vue?vue&type=script&setup=true&lang.ts
var Card_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Card",
	props: { class: {} },
	setup(__props) {
		/**
		* `data-slot` mirrors React's (`Z-14`).
		*
		* **Six attributes, and their absence was a real divergence.** React's card parts each carry one and
		* these carried none, so any stylesheet keyed on a card slot applied to one edition and not the other:
		* the free demo's own `[data-slot="card"] { border-radius: var(--vui-card-radius) }` gave the React
		* cards their 16px corner and left Vue's at the global radius. Eighty-five other components in this
		* package already set a slot; the card family was the gap.
		*/
		const props = __props;
		const classes = computed(() => cn(CARD, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "card"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Card_vue_vue_type_script_setup_true_lang_default as default };

