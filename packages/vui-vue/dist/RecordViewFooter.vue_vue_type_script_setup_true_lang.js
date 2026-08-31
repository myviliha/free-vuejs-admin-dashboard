import Checkbox_default from "./Checkbox.js";
import DropdownMenu_default from "./DropdownMenu.js";
import DropdownMenuContent_default from "./DropdownMenuContent.js";
import DropdownMenuItem_default from "./DropdownMenuItem.js";
import DropdownMenuLabel_default from "./DropdownMenuLabel.js";
import DropdownMenuTrigger_default from "./DropdownMenuTrigger.js";
import { ICONS } from "./icons.js";
import { useRecordView } from "./record-view-context.js";
import { Fragment, createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, renderList, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";
import { DROPDOWN_ITEM_CHECK, DROPDOWN_ITEM_LABEL, RV_ICON_LG, RV_ICON_PAGE_SIZE, RV_PAGER, RV_PAGER_BUTTON, RV_PAGER_RANGE, RV_TRUNCATE } from "@viliha/vui-core";
//#region src/RecordViewFooter.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["disabled"];
var _hoisted_2 = ["disabled"];
/**
* The pagination footer: rows per page, the range on screen, and the two page steps.
*
* **It is the table's footer and the toolbar's last control at the same time**, which is why it is
* rendered inside the sub-toolbar rather than under the card. React's is too, and moving it would be a
* layout change rather than a port. Its own file only because Vue has no local components.
*
* Every number here is `paginate`'s. Nothing is recomputed: `page` is clamped there, so the previous
* button cannot be enabled on a page that no longer exists.
*/
var RecordViewFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordViewFooter",
	setup(__props) {
		const view = useRecordView();
		const { pageSize, pageSizes, rangeStart, rangeEnd, total, safePage, totalPages } = view;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(RV_PAGER)) }, [
				createVNode(DropdownMenu_default, null, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": `${unref(pageSize)} / page` }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).rows), { class: normalizeClass(unref(RV_ICON_PAGE_SIZE)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, toDisplayString(unref(pageSize)) + " / page", 3)]),
						_: 1
					}, 8, ["aria-label"]), createVNode(DropdownMenuContent_default, { align: "end" }, {
						default: withCtx(() => [createVNode(DropdownMenuLabel_default, null, {
							default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("Rows per page", -1)])]),
							_: 1
						}), (openBlock(true), createElementBlock(Fragment, null, renderList(unref(pageSizes), (n) => {
							return openBlock(), createBlock(DropdownMenuItem_default, {
								key: n,
								onSelect: ($event) => unref(view).setPageSize(n)
							}, {
								default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, toDisplayString(n) + " per page", 3), createVNode(Checkbox_default, {
									"model-value": unref(pageSize) === n,
									readonly: "",
									tabindex: -1,
									"aria-hidden": "true",
									class: normalizeClass(unref(DROPDOWN_ITEM_CHECK))
								}, null, 8, ["model-value", "class"])]),
								_: 2
							}, 1032, ["onSelect"]);
						}), 128))]),
						_: 1
					})]),
					_: 1
				}),
				createElementVNode("span", { class: normalizeClass(unref(RV_PAGER_RANGE)) }, toDisplayString(unref(rangeStart)) + "–" + toDisplayString(unref(rangeEnd)) + " of " + toDisplayString(unref(total)), 3),
				createElementVNode("button", {
					type: "button",
					disabled: unref(safePage) <= 1,
					"aria-label": "Previous page",
					class: normalizeClass(unref(RV_PAGER_BUTTON)),
					onClick: _cache[0] || (_cache[0] = ($event) => unref(view).prevPage())
				}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).chevronLeft), { class: normalizeClass(unref(RV_ICON_LG)) }, null, 8, ["class"]))], 10, _hoisted_1),
				createElementVNode("button", {
					type: "button",
					disabled: unref(safePage) >= unref(totalPages),
					"aria-label": "Next page",
					class: normalizeClass(unref(RV_PAGER_BUTTON)),
					onClick: _cache[1] || (_cache[1] = ($event) => unref(view).nextPage())
				}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).chevronRight), { class: normalizeClass(unref(RV_ICON_LG)) }, null, 8, ["class"]))], 10, _hoisted_2)
			], 2);
		};
	}
});
//#endregion
export { RecordViewFooter_vue_vue_type_script_setup_true_lang_default as default };

