import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, openBlock, renderList, toDisplayString, unref } from "vue";
import { STEPS_CHECK_ICON, STEPS_CONNECTOR_BASE, STEPS_CONNECTOR_STATES, STEPS_DESCRIPTION, STEPS_ITEM, STEPS_LABEL_BASE, STEPS_LABEL_GROUP, STEPS_LABEL_STATES, STEPS_MARKER_BASE, STEPS_MARKER_STATES, STEPS_ROOT, cn } from "@viliha/vui-core";
//#region src/Steps.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = ["aria-current"];
var Steps_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Steps",
	props: {
		steps: {},
		current: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(STEPS_ROOT, props.class));
		const stateOf = (i) => i < props.current ? "complete" : i === props.current ? "current" : "upcoming";
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("ol", {
				class: normalizeClass(classes.value),
				"aria-label": `Step ${__props.current + 1} of ${__props.steps.length}`
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.steps, (step, i) => {
				return openBlock(), createElementBlock(Fragment, { key: step.label }, [createElementVNode("li", {
					class: normalizeClass(unref(STEPS_ITEM)),
					"aria-current": stateOf(i) === "current" ? "step" : void 0
				}, [createElementVNode("span", { class: normalizeClass(unref(cn)(unref(STEPS_MARKER_BASE), unref(STEPS_MARKER_STATES)[stateOf(i)])) }, [stateOf(i) === "complete" ? (openBlock(), createElementBlock("svg", {
					key: 0,
					class: normalizeClass(unref(STEPS_CHECK_ICON)),
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg"
				}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
					d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
					fill: "currentColor",
					"fill-rule": "evenodd",
					"clip-rule": "evenodd"
				}, null, -1)])], 2)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(i + 1), 1)], 64))], 2), createElementVNode("span", { class: normalizeClass(unref(STEPS_LABEL_GROUP)) }, [createElementVNode("span", { class: normalizeClass(unref(cn)(unref(STEPS_LABEL_BASE), unref(STEPS_LABEL_STATES)[stateOf(i)])) }, toDisplayString(step.label), 3), step.description ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: normalizeClass(unref(STEPS_DESCRIPTION))
				}, toDisplayString(step.description), 3)) : createCommentVNode("", true)], 2)], 10, _hoisted_2), i !== __props.steps.length - 1 ? (openBlock(), createElementBlock("span", {
					key: 0,
					"aria-hidden": "true",
					class: normalizeClass(unref(cn)(unref(STEPS_CONNECTOR_BASE), i < __props.current ? unref(STEPS_CONNECTOR_STATES).done : unref(STEPS_CONNECTOR_STATES).todo))
				}, null, 2)) : createCommentVNode("", true)], 64);
			}), 128))], 10, _hoisted_1);
		};
	}
});
//#endregion
export { Steps_vue_vue_type_script_setup_true_lang_default as default };

