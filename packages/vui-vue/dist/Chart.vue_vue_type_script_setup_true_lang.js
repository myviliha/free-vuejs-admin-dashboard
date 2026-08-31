import { computed, createBlock, createSlots, defineComponent, guardReactiveProps, normalizeClass, normalizeProps, openBlock, renderSlot, unref, withCtx } from "vue";
import { CHART_CARD, cn } from "@viliha/vui-core";
import { Chart } from "@tanstack/charts/vue";
//#region src/Chart.vue?vue&type=script&setup=true&lang.ts
/**
* A TanStack chart wearing the theme.
*
* TanStack Charts has no theme of its own: it paints with `currentColor` and
* reads six CSS variables for the categorical palette. `vui-chart` (in
* theme.css) maps our tokens onto those names, so the chart follows light and
* dark mode and a per-tenant brand with no colour props here and no chart
* config to keep in sync.
*
* Pass a definition built with `defineChart` from `@tanstack/charts`. This
* component owns the frame and the colours; the definition owns the data.
*/
var Chart_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Chart",
	props: {
		definition: {},
		ariaLabel: {},
		ariaDescription: {},
		height: {},
		aspectRatio: {},
		card: {
			type: Boolean,
			default: true
		},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn("vui-chart w-full", props.card && CHART_CARD, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Chart), {
				definition: __props.definition,
				"aria-label": __props.ariaLabel,
				"aria-description": __props.ariaDescription,
				height: __props.height,
				"aspect-ratio": __props.aspectRatio,
				class: normalizeClass(classes.value)
			}, createSlots({ _: 2 }, [_ctx.$slots.tooltipBody ? {
				name: "tooltipBody",
				fn: withCtx((ctx) => [renderSlot(_ctx.$slots, "tooltipBody", normalizeProps(guardReactiveProps(ctx)))]),
				key: "0"
			} : void 0]), 1032, [
				"definition",
				"aria-label",
				"aria-description",
				"height",
				"aspect-ratio",
				"class"
			]);
		};
	}
});
//#endregion
export { Chart_vue_vue_type_script_setup_true_lang_default as default };

