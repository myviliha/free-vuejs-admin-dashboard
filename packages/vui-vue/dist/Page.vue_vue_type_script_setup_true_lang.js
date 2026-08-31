import { Comment, computed, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, useSlots } from "vue";
import { PAGE_ACTIONS, PAGE_CONTENT, PAGE_HEADER, PAGE_ROOT, PAGE_SCROLL, cn } from "@viliha/vui-core";
//#region src/Page.vue?vue&type=script&setup=true&lang.ts
/**
* The standard page frame, as a component instead of markup every page copies: a full-height
* column, a 48px action header holding the breadcrumb trail and that page's actions, then the
* single scrolling content region.
*
* What varies is the content of the slots, not the frame. React takes the regions as props;
* here they are named slots (`breadcrumbs`, `actions`, `footer`) and the body is the default
* slot, which is the same shape in this framework's idiom.
*/
var Page_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Page",
	props: {
		bare: {
			type: Boolean,
			default: false
		},
		hideHeader: {
			type: Boolean,
			default: false
		},
		class: {},
		headerClass: {},
		contentClass: {}
	},
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const hasActions = computed(() => Boolean(slots.actions?.().some((v) => v.type !== Comment && v.children !== "v-if")));
		const rootClasses = computed(() => cn(PAGE_ROOT, props.class));
		const headerClasses = computed(() => cn(PAGE_HEADER, props.headerClass));
		const scrollClasses = computed(() => cn(PAGE_SCROLL, props.contentClass));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(rootClasses.value) }, [
				!__props.hideHeader ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(headerClasses.value)
				}, [renderSlot(_ctx.$slots, "breadcrumbs"), hasActions.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(PAGE_ACTIONS))
				}, [renderSlot(_ctx.$slots, "actions")], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
				createElementVNode("div", { class: normalizeClass(scrollClasses.value) }, [__props.bare ? renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 0) : (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(PAGE_CONTENT))
				}, [renderSlot(_ctx.$slots, "default")], 2))], 2),
				renderSlot(_ctx.$slots, "footer")
			], 2);
		};
	}
});
//#endregion
export { Page_vue_vue_type_script_setup_true_lang_default as default };

