import { useVuiConfig } from "./config-context.js";
import { useOrg } from "./org-context.js";
import Popover_default from "./Popover.js";
import PopoverContent_default from "./PopoverContent.js";
import PopoverTrigger_default from "./PopoverTrigger.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, unref, withCtx } from "vue";
import { ORG_ADD_ROW, ORG_AVATAR_EMPTY, ORG_AVATAR_ICON, ORG_AVATAR_IMAGE, ORG_AVATAR_LABEL, ORG_FOOTER, ORG_ITEM, ORG_ITEM_BADGE, ORG_ITEM_HINT, ORG_ITEM_META, ORG_ITEM_META_ICON, ORG_ITEM_NAME, ORG_ITEM_ROW, ORG_ITEM_TEXT, ORG_LIST, ORG_MARK, ORG_PANEL, ORG_PANEL_LABEL, ORG_PLAN_STATUS_STATES, ORG_SEPARATOR, ORG_TRIGGER, ORG_TRIGGER_CHEVRON, ORG_TRIGGER_CHEVRON_OPEN, ORG_TRIGGER_COLLAPSED, ORG_TRIGGER_EXPANDED, ORG_TRIGGER_META, ORG_TRIGGER_NAME, ORG_TRIGGER_SKELETON, ORG_TRIGGER_STATES, ORG_TRIGGER_TEXT, cn, resolveAddTarget } from "@viliha/vui-core";
//#region src/OrgSwitcher.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label", "title"];
var _hoisted_2 = [
	"disabled",
	"aria-current",
	"onClick"
];
var _hoisted_3 = ["src"];
var _hoisted_4 = ["d"];
var _hoisted_5 = ["href"];
/**
* The organization switcher: the brand block at the top of the sidebar, and the list it opens.
*
* The design is fixed so every install reads the same way. What a host supplies is the logic:
* `OrgProvider` owns switching, `onAdd` or `addHref` decides where "Add organization" goes, and
* `VuiProvider`'s `orgSwitcher` section sets the labels and whether the plan line and Add row appear.
*
* **Renders nothing without an `OrgProvider` above it**, which is React's behaviour: a sidebar with no
* tenant list should not crash, it should not show a switcher.
*/
var CHECK_CIRCLED = "M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z";
var TRIANGLE = "M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z";
var OrgSwitcher_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "OrgSwitcher",
	props: {
		productName: {},
		collapsed: {
			type: Boolean,
			default: false
		},
		onAdd: {},
		addHref: {},
		onNavigate: {},
		config: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		/** The two glyphs React's PLAN_ICON maps to, inline so the package needs no icon dependency. */
		const org = useOrg();
		const config = useVuiConfig();
		const open = ref(false);
		const resolved = computed(() => ({
			...config.value.orgSwitcher ?? {},
			...props.config ?? {}
		}));
		const showPlan = computed(() => resolved.value.showPlan ?? true);
		const heading = computed(() => resolved.value.heading ?? "Organizations");
		const addLabel = computed(() => resolved.value.addLabel ?? "Add organization");
		const currentLabel = computed(() => resolved.value.currentLabel ?? "Current");
		const addTarget = computed(() => resolveAddTarget(props.onAdd, props.addHref, resolved.value.addHref));
		const showAdd = computed(() => (resolved.value.showAdd ?? true) && Boolean(addTarget.value.onAdd || addTarget.value.href));
		const triggerClasses = computed(() => cn(ORG_TRIGGER, open.value ? ORG_TRIGGER_STATES.open : ORG_TRIGGER_STATES.closed, props.collapsed ? ORG_TRIGGER_COLLAPSED : ORG_TRIGGER_EXPANDED, props.class));
		/** React's guard, verbatim: a modifier click is the browser's, a plain click is the router's. */
		const navigate = (e) => {
			open.value = false;
			const href = addTarget.value.href;
			if (!props.onNavigate || !href || e.metaKey || e.ctrlKey || e.shiftKey) return;
			e.preventDefault();
			props.onNavigate(href);
		};
		const choose = (id) => {
			org?.switchTo(id);
			open.value = false;
		};
		return (_ctx, _cache) => {
			return unref(org) ? (openBlock(), createBlock(Popover_default, {
				key: 0,
				open: open.value,
				"onUpdate:open": _cache[1] || (_cache[1] = ($event) => open.value = $event)
			}, {
				default: withCtx(() => [createVNode(PopoverTrigger_default, { "as-child": "" }, {
					default: withCtx(() => [createElementVNode("button", {
						type: "button",
						"aria-label": `Switch organization. Current: ${unref(org).current.value?.name ?? "none"}`,
						title: __props.collapsed ? unref(org).current.value?.name : void 0,
						class: normalizeClass(triggerClasses.value)
					}, [renderSlot(_ctx.$slots, "logo"), !__props.collapsed ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("span", { class: normalizeClass(unref(ORG_TRIGGER_TEXT)) }, [createElementVNode("span", { class: normalizeClass(unref(ORG_TRIGGER_NAME)) }, toDisplayString(__props.productName), 3), createElementVNode("span", { class: normalizeClass(unref(ORG_TRIGGER_META)) }, [unref(org).current.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(unref(org).current.value.name), 1)], 64)) : (openBlock(), createElementBlock("span", {
						key: 1,
						class: normalizeClass(unref(ORG_TRIGGER_SKELETON))
					}, null, 2))], 2)], 2), (openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(cn)(unref(ORG_TRIGGER_CHEVRON), open.value && unref(ORG_TRIGGER_CHEVRON_OPEN))),
						xmlns: "http://www.w3.org/2000/svg",
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						"aria-hidden": "true"
					}, [..._cache[2] || (_cache[2] = [createElementVNode("path", {
						d: "M4.18179 6.18181C4.35753 6.00608 4.6424 6.00608 4.81813 6.18181L7.49996 8.86363L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8181 6.18181C10.9938 6.35755 10.9938 6.64243 10.8181 6.81816L7.81813 9.81816C7.6424 9.9939 7.35753 9.9939 7.18179 9.81816L4.18179 6.81816C4.00605 6.64243 4.00605 6.35755 4.18179 6.18181Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2))], 64)) : createCommentVNode("", true)], 10, _hoisted_1)]),
					_: 3
				}), createVNode(PopoverContent_default, {
					align: "start",
					"side-offset": 6,
					class: normalizeClass(unref(ORG_PANEL))
				}, {
					default: withCtx(() => [
						createElementVNode("p", { class: normalizeClass(unref(ORG_PANEL_LABEL)) }, toDisplayString(heading.value), 3),
						createElementVNode("ul", {
							role: "list",
							class: normalizeClass(unref(ORG_LIST))
						}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(org).organizations.value, (item) => {
							return openBlock(), createElementBlock("li", { key: item.id }, [createElementVNode("button", {
								type: "button",
								disabled: unref(org).switching.value !== void 0,
								"aria-current": item.id === unref(org).currentId.value || void 0,
								class: normalizeClass(unref(ORG_ITEM)),
								onClick: ($event) => choose(item.id)
							}, [
								createElementVNode("span", { class: normalizeClass(unref(ORG_MARK)) }, [item.logoUrl ? (openBlock(), createElementBlock("img", {
									key: 0,
									src: item.logoUrl,
									alt: "",
									class: normalizeClass(unref(ORG_AVATAR_IMAGE))
								}, null, 10, _hoisted_3)) : (openBlock(), createElementBlock("svg", {
									key: 1,
									class: normalizeClass(unref(ORG_AVATAR_ICON)),
									xmlns: "http://www.w3.org/2000/svg",
									width: "15",
									height: "15",
									viewBox: "0 0 15 15",
									fill: "none",
									"aria-hidden": "true"
								}, [..._cache[3] || (_cache[3] = [createElementVNode("path", {
									d: "M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253Z",
									fill: "currentColor",
									"fill-rule": "evenodd",
									"clip-rule": "evenodd"
								}, null, -1)])], 2))], 2),
								createElementVNode("span", { class: normalizeClass(unref(ORG_ITEM_TEXT)) }, [createElementVNode("span", { class: normalizeClass(unref(ORG_ITEM_ROW)) }, [createElementVNode("span", { class: normalizeClass(unref(ORG_ITEM_NAME)) }, toDisplayString(item.name), 3), item.id === unref(org).currentId.value ? (openBlock(), createElementBlock("span", {
									key: 0,
									class: normalizeClass(unref(ORG_ITEM_BADGE))
								}, toDisplayString(currentLabel.value), 3)) : createCommentVNode("", true)], 2), showPlan.value && item.plan ? (openBlock(), createElementBlock("span", {
									key: 0,
									class: normalizeClass(unref(ORG_ITEM_META))
								}, [createTextVNode(toDisplayString(item.plan) + " ", 1), renderSlot(_ctx.$slots, "plan-status", { organization: item }, () => [(openBlock(), createElementBlock("svg", {
									class: normalizeClass(unref(cn)(unref(ORG_ITEM_META_ICON), unref(ORG_PLAN_STATUS_STATES)[item.planStatus ?? "active"])),
									xmlns: "http://www.w3.org/2000/svg",
									width: "15",
									height: "15",
									viewBox: "0 0 15 15",
									fill: "none",
									"aria-hidden": "true"
								}, [createElementVNode("path", {
									d: (item.planStatus ?? "active") === "past_due" || item.planStatus === "canceled" ? TRIANGLE : CHECK_CIRCLED,
									fill: "currentColor",
									"fill-rule": "evenodd",
									"clip-rule": "evenodd"
								}, null, 8, _hoisted_4)], 2))])], 2)) : createCommentVNode("", true)], 2),
								unref(org).switching.value === item.id ? (openBlock(), createElementBlock("span", {
									key: 0,
									class: normalizeClass(unref(ORG_ITEM_HINT))
								}, "Switching…", 2)) : createCommentVNode("", true)
							], 10, _hoisted_2)]);
						}), 128))], 2),
						showAdd.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("div", { class: normalizeClass(unref(ORG_SEPARATOR)) }, null, 2), createElementVNode("div", { class: normalizeClass(unref(ORG_FOOTER)) }, [addTarget.value.onAdd ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: normalizeClass(unref(ORG_ADD_ROW)),
							onClick: _cache[0] || (_cache[0] = ($event) => {
								open.value = false;
								addTarget.value.onAdd?.();
							})
						}, [createElementVNode("span", { class: normalizeClass(unref(ORG_AVATAR_EMPTY)) }, [(openBlock(), createElementBlock("svg", {
							class: normalizeClass(unref(ORG_AVATAR_ICON)),
							xmlns: "http://www.w3.org/2000/svg",
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true"
						}, [..._cache[4] || (_cache[4] = [createElementVNode("path", {
							d: "M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2))], 2), createElementVNode("span", { class: normalizeClass(unref(ORG_AVATAR_LABEL)) }, toDisplayString(addLabel.value), 3)], 2)) : (openBlock(), createElementBlock("a", {
							key: 1,
							href: addTarget.value.href,
							class: normalizeClass(unref(ORG_ADD_ROW)),
							onClick: navigate
						}, [createElementVNode("span", { class: normalizeClass(unref(ORG_AVATAR_EMPTY)) }, [(openBlock(), createElementBlock("svg", {
							class: normalizeClass(unref(ORG_AVATAR_ICON)),
							xmlns: "http://www.w3.org/2000/svg",
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true"
						}, [..._cache[5] || (_cache[5] = [createElementVNode("path", {
							d: "M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2))], 2), createElementVNode("span", { class: normalizeClass(unref(ORG_AVATAR_LABEL)) }, toDisplayString(addLabel.value), 3)], 10, _hoisted_5))], 2)], 64)) : createCommentVNode("", true)
					]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			}, 8, ["open"])) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { OrgSwitcher_vue_vue_type_script_setup_true_lang_default as default };

