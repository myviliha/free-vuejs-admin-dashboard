import { computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref } from "vue";
import { WIZARD_REVIEW_BODY, WIZARD_REVIEW_GROUP, WIZARD_REVIEW_HEADER, WIZARD_REVIEW_HINT, WIZARD_REVIEW_ICON, WIZARD_REVIEW_TITLE, cn } from "@viliha/vui-core";
//#region src/WizardSection.vue?vue&type=script&setup=true&lang.ts
/**
* A bordered section inside a wizard step: an optional muted header over a padded body. React takes the
* icon as a component; here it is a slot, for the reason `FormFooter` gives.
*/
var WizardSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "WizardSection",
	props: {
		title: {},
		description: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(WIZARD_REVIEW_GROUP, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", { class: normalizeClass(classes.value) }, [__props.title ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(WIZARD_REVIEW_HEADER))
			}, [createElementVNode("h3", { class: normalizeClass(unref(WIZARD_REVIEW_TITLE)) }, [_ctx.$slots.icon ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: normalizeClass(unref(WIZARD_REVIEW_ICON))
			}, [renderSlot(_ctx.$slots, "icon")], 2)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(__props.title), 1)], 2), __props.description ? (openBlock(), createElementBlock("p", {
				key: 0,
				class: normalizeClass(unref(WIZARD_REVIEW_HINT))
			}, toDisplayString(__props.description), 3)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true), createElementVNode("div", { class: normalizeClass(unref(WIZARD_REVIEW_BODY)) }, [renderSlot(_ctx.$slots, "default")], 2)], 2);
		};
	}
});
//#endregion
export { WizardSection_vue_vue_type_script_setup_true_lang_default as default };

