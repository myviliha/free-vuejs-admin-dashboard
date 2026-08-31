import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, openBlock, renderList, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";
import { BREADCRUMBS_BACK, BREADCRUMBS_BACK_ICON, BREADCRUMBS_CRUMB, BREADCRUMBS_CURRENT, BREADCRUMBS_LINK, BREADCRUMBS_NAV, BREADCRUMBS_ROOT, BREADCRUMBS_SEPARATOR_ICON, cn } from "@viliha/vui-core";
//#region src/Breadcrumbs.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["href"];
var _hoisted_2 = ["onClick"];
var Breadcrumbs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Breadcrumbs",
	props: {
		crumbs: {},
		onBack: { type: Function },
		linkComponent: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMBS_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(classes.value) }, [__props.onBack ? (openBlock(), createElementBlock("button", {
				key: 0,
				type: "button",
				"aria-label": "Go back",
				title: "Back",
				class: normalizeClass(unref(BREADCRUMBS_BACK)),
				onClick: _cache[0] || (_cache[0] = (...args) => __props.onBack && __props.onBack(...args))
			}, [(openBlock(), createElementBlock("svg", {
				class: normalizeClass(unref(BREADCRUMBS_BACK_ICON)),
				width: "15",
				height: "15",
				viewBox: "0 0 15 15",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg"
			}, [..._cache[1] || (_cache[1] = [createElementVNode("path", {
				d: "M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z",
				fill: "currentColor",
				"fill-rule": "evenodd",
				"clip-rule": "evenodd"
			}, null, -1)])], 2))], 2)) : createCommentVNode("", true), createElementVNode("nav", {
				"aria-label": "Breadcrumb",
				class: normalizeClass(unref(BREADCRUMBS_NAV))
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.crumbs, (crumb, i) => {
				return openBlock(), createElementBlock("span", {
					key: i,
					class: normalizeClass(unref(BREADCRUMBS_CRUMB))
				}, [i === __props.crumbs.length - 1 ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: normalizeClass(unref(BREADCRUMBS_CURRENT))
				}, toDisplayString(crumb.label), 3)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [crumb.href && __props.linkComponent ? (openBlock(), createBlock(resolveDynamicComponent(__props.linkComponent), {
					key: 0,
					to: crumb.href,
					href: crumb.href,
					class: normalizeClass(unref(BREADCRUMBS_LINK))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(crumb.label), 1)]),
					_: 2
				}, 1032, [
					"to",
					"href",
					"class"
				])) : crumb.href ? (openBlock(), createElementBlock("a", {
					key: 1,
					href: crumb.href,
					class: normalizeClass(unref(BREADCRUMBS_LINK))
				}, toDisplayString(crumb.label), 11, _hoisted_1)) : (openBlock(), createElementBlock("button", {
					key: 2,
					type: "button",
					class: normalizeClass(unref(BREADCRUMBS_LINK)),
					onClick: crumb.onClick
				}, toDisplayString(crumb.label), 11, _hoisted_2)), (openBlock(), createElementBlock("svg", {
					class: normalizeClass(unref(BREADCRUMBS_SEPARATOR_ICON)),
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					"aria-hidden": "true"
				}, [..._cache[2] || (_cache[2] = [createElementVNode("path", {
					d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
					fill: "currentColor",
					"fill-rule": "evenodd",
					"clip-rule": "evenodd"
				}, null, -1)])], 2))], 64))], 2);
			}), 128))], 2)], 2);
		};
	}
});
//#endregion
export { Breadcrumbs_vue_vue_type_script_setup_true_lang_default as default };

