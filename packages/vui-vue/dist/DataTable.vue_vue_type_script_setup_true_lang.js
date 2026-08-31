import Skeleton_default from "./Skeleton.js";
import Button_default from "./Button.js";
import Checkbox_default from "./Checkbox.js";
import Input_default from "./Input.js";
import Table_default from "./Table.js";
import TableBody_default from "./TableBody.js";
import TableCaption_default from "./TableCaption.js";
import TableCell_default from "./TableCell.js";
import TableHead_default from "./TableHead.js";
import TableHeader_default from "./TableHeader.js";
import TableRow_default from "./TableRow.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, getCurrentInstance, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, unref, watch, withCtx, withModifiers } from "vue";
import { DT_ALIGN, DT_EMPTY, DT_FOOTER, DT_FRAME, DT_HEAD_ROW, DT_PAGER, DT_PAGER_GAP, DT_ROOT, DT_ROW_CLICKABLE, DT_ROW_SELECTED, DT_SEARCH, DT_SELECT_HEAD, DT_SKELETON_CELL, DT_SORT_BUTTON, DT_TOOLBAR, DT_TOOLBAR_END, asText, cn, columnValue, filterRows, pageList, pageRows, sortRows } from "@viliha/vui-core";
//#region src/DataTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["onClick"];
var DataTable_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DataTable",
	props: {
		data: {},
		columns: {},
		rowId: {},
		caption: {},
		search: {
			type: Boolean,
			default: false
		},
		searchPlaceholder: {},
		pageSize: { default: 10 },
		selectable: { type: Boolean },
		columnToggle: { type: Boolean },
		defaultSort: {},
		loading: { type: Boolean },
		empty: { default: "No records yet." },
		class: {}
	},
	emits: ["selectionChange", "rowClick"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		/**
		* Whether a row is clickable, which is **not** the same as whether the component can emit.
		*
		* React applies `DT_ROW_CLICKABLE` only when an `onRowClick` was passed. Vue applied it always, so a
		* read-only table advertised a click that did nothing, and `check:shared-classes` could not see it
		* because both editions import the same constant. `PD-050` moved the strings; this is the behaviour
		* that went with them.
		*
		* **`useAttrs()` cannot answer this, and that is worth knowing before reaching for it.** `rowClick` is
		* a *declared* emit, so Vue routes the parent's `onRowClick` to the emit machinery and it never
		* appears in `attrs`: the check read `undefined` every time and no row was ever clickable. The
		* handler a parent actually passed is on the instance's own vnode props, which is the documented
		* escape hatch for exactly this question.
		*/
		const instance = getCurrentInstance();
		const clickable = computed(() => Boolean(instance?.vnode.props?.onRowClick));
		const emit = __emit;
		const query = ref("");
		const page = ref(1);
		const sort = ref(props.defaultSort ?? null);
		const hidden = ref(new Set(props.columns.filter((c) => c.hidden).map((c) => c.key)));
		const selected = ref(/* @__PURE__ */ new Set());
		const idOf = (row, index) => props.rowId?.(row, index) ?? String(index);
		const visible = computed(() => props.columns.filter((c) => !hidden.value.has(c.key)));
		const filtered = computed(() => filterRows(props.data, visible.value, query.value));
		const sorted = computed(() => sortRows(filtered.value, visible.value, sort.value));
		const paged = computed(() => pageRows(sorted.value, page.value, props.pageSize));
		const pages = computed(() => pageList(paged.value.page, paged.value.pageCount));
		watch([query, sorted], () => {
			if (page.value !== paged.value.page) page.value = paged.value.page;
		});
		function toggleSort(column) {
			if (!column.sortable) return;
			const current = sort.value;
			if (!current || current.key !== column.key) sort.value = {
				key: column.key,
				direction: "asc"
			};
			else if (current.direction === "asc") sort.value = {
				key: column.key,
				direction: "desc"
			};
			else sort.value = null;
		}
		const pageIds = computed(() => paged.value.rows.map((row, i) => idOf(row, i)));
		const allOnPage = computed(() => pageIds.value.length > 0 && pageIds.value.every((id) => selected.value.has(id)));
		const someOnPage = computed(() => pageIds.value.some((id) => selected.value.has(id)) && !allOnPage.value);
		function emitSelection() {
			emit("selectionChange", props.data.filter((row, i) => selected.value.has(idOf(row, i))));
		}
		function toggleRow(id) {
			const next = new Set(selected.value);
			next.has(id) ? next.delete(id) : next.add(id);
			selected.value = next;
			emitSelection();
		}
		function toggleAllOnPage() {
			const next = new Set(selected.value);
			if (allOnPage.value) for (const id of pageIds.value) next.delete(id);
			else for (const id of pageIds.value) next.add(id);
			selected.value = next;
			emitSelection();
		}
		function toggleColumn(key) {
			const next = new Set(hidden.value);
			next.has(key) ? next.delete(key) : next.add(key);
			hidden.value = next;
		}
		const cellText = (column, row) => asText(columnValue(column, row));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)(unref(DT_ROOT), props.class)) }, [
				__props.search || __props.columnToggle ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(DT_TOOLBAR))
				}, [__props.search ? (openBlock(), createBlock(Input_default, {
					key: 0,
					modelValue: query.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event),
					placeholder: __props.searchPlaceholder ?? "Search",
					class: normalizeClass(unref(DT_SEARCH)),
					"aria-label": "Search"
				}, null, 8, [
					"modelValue",
					"placeholder",
					"class"
				])) : createCommentVNode("", true), __props.columnToggle ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(DT_TOOLBAR_END))
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(props.columns, (column) => {
					return openBlock(), createBlock(Button_default, {
						key: column.key,
						type: "button",
						variant: "outline",
						size: "sm",
						"aria-pressed": !hidden.value.has(column.key),
						onClick: ($event) => toggleColumn(column.key)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(column.header), 1)]),
						_: 2
					}, 1032, ["aria-pressed", "onClick"]);
				}), 128))], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
				createElementVNode("div", { class: normalizeClass(unref(DT_FRAME)) }, [createVNode(Table_default, null, {
					default: withCtx(() => [
						__props.caption ? (openBlock(), createBlock(TableCaption_default, { key: 0 }, {
							default: withCtx(() => [createTextVNode(toDisplayString(__props.caption), 1)]),
							_: 1
						})) : createCommentVNode("", true),
						createVNode(TableHeader_default, null, {
							default: withCtx(() => [createVNode(TableRow_default, { class: normalizeClass(unref(DT_HEAD_ROW)) }, {
								default: withCtx(() => [__props.selectable ? (openBlock(), createBlock(TableHead_default, {
									key: 0,
									class: normalizeClass(unref(DT_SELECT_HEAD))
								}, {
									default: withCtx(() => [createVNode(Checkbox_default, {
										checked: allOnPage.value,
										indeterminate: someOnPage.value,
										"aria-label": "Select all on this page",
										onChange: toggleAllOnPage
									}, null, 8, ["checked", "indeterminate"])]),
									_: 1
								}, 8, ["class"])) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (column) => {
									return openBlock(), createBlock(TableHead_default, {
										key: column.key,
										class: normalizeClass(unref(cn)(column.align ? unref(DT_ALIGN)[column.align] : "", column.class)),
										"aria-sort": sort.value?.key === column.key ? sort.value.direction === "asc" ? "ascending" : "descending" : "none"
									}, {
										default: withCtx(() => [column.sortable ? (openBlock(), createElementBlock("button", {
											key: 0,
											type: "button",
											class: normalizeClass(unref(DT_SORT_BUTTON)),
											onClick: ($event) => toggleSort(column)
										}, toDisplayString(column.header), 11, _hoisted_1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(column.header), 1)], 64))]),
										_: 2
									}, 1032, ["class", "aria-sort"]);
								}), 128))]),
								_: 1
							}, 8, ["class"])]),
							_: 1
						}),
						createVNode(TableBody_default, null, {
							default: withCtx(() => [__props.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, renderList(3, (n) => {
								return createVNode(TableRow_default, { key: `skeleton-${n}` }, {
									default: withCtx(() => [__props.selectable ? (openBlock(), createBlock(TableCell_default, { key: 0 }, {
										default: withCtx(() => [createVNode(Skeleton_default, { class: normalizeClass(unref(DT_SKELETON_CELL)) }, null, 8, ["class"])]),
										_: 1
									})) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (column) => {
										return openBlock(), createBlock(TableCell_default, { key: column.key }, {
											default: withCtx(() => [createVNode(Skeleton_default, { class: normalizeClass(unref(DT_SKELETON_CELL)) }, null, 8, ["class"])]),
											_: 1
										});
									}), 128))]),
									_: 1
								});
							}), 64)) : paged.value.rows.length === 0 ? (openBlock(), createBlock(TableRow_default, { key: 1 }, {
								default: withCtx(() => [createVNode(TableCell_default, {
									colspan: visible.value.length + (__props.selectable ? 1 : 0),
									class: normalizeClass(unref(DT_EMPTY))
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(query.value ? `No results for “${query.value}”.` : __props.empty), 1)]),
									_: 1
								}, 8, ["colspan", "class"])]),
								_: 1
							})) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(paged.value.rows, (row, index) => {
								return openBlock(), createBlock(TableRow_default, {
									key: idOf(row, index),
									"data-state": selected.value.has(idOf(row, index)) ? "selected" : void 0,
									class: normalizeClass(unref(cn)(selected.value.has(idOf(row, index)) && unref(DT_ROW_SELECTED), clickable.value && unref(DT_ROW_CLICKABLE))),
									onClick: ($event) => clickable.value && emit("rowClick", row)
								}, {
									default: withCtx(() => [__props.selectable ? (openBlock(), createBlock(TableCell_default, { key: 0 }, {
										default: withCtx(() => [createVNode(Checkbox_default, {
											checked: selected.value.has(idOf(row, index)),
											"aria-label": `Select row ${index + 1}`,
											onChange: ($event) => toggleRow(idOf(row, index)),
											onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
										}, null, 8, [
											"checked",
											"aria-label",
											"onChange"
										])]),
										_: 2
									}, 1024)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (column) => {
										return openBlock(), createBlock(TableCell_default, {
											key: column.key,
											class: normalizeClass(unref(cn)(column.align ? unref(DT_ALIGN)[column.align] : "", column.class))
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, `cell-${column.key}`, {
												row,
												value: unref(columnValue)(column, row)
											}, () => [createTextVNode(toDisplayString(cellText(column, row)), 1)])]),
											_: 2
										}, 1032, ["class"]);
									}), 128))]),
									_: 2
								}, 1032, [
									"data-state",
									"class",
									"onClick"
								]);
							}), 128))]),
							_: 3
						})
					]),
					_: 3
				})], 2),
				__props.selectable || paged.value.pageCount > 1 ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(DT_FOOTER))
				}, [createElementVNode("p", null, toDisplayString(__props.selectable ? `${selected.value.size} of ${sorted.value.length} row${sorted.value.length === 1 ? "" : "s"} selected` : `${sorted.value.length} row${sorted.value.length === 1 ? "" : "s"}`), 1), paged.value.pageCount > 1 ? (openBlock(), createElementBlock("nav", {
					key: 0,
					"aria-label": "Pagination",
					class: normalizeClass(unref(DT_PAGER))
				}, [
					createVNode(Button_default, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: paged.value.page <= 1,
						onClick: _cache[2] || (_cache[2] = ($event) => page.value = paged.value.page - 1)
					}, {
						default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode(" Previous ", -1)])]),
						_: 1
					}, 8, ["disabled"]),
					(openBlock(true), createElementBlock(Fragment, null, renderList(pages.value, (entry, i) => {
						return openBlock(), createElementBlock(Fragment, { key: `${entry}-${i}` }, [entry === "gap" ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: normalizeClass(unref(DT_PAGER_GAP)),
							"aria-hidden": "true"
						}, "...", 2)) : (openBlock(), createBlock(Button_default, {
							key: 1,
							type: "button",
							variant: entry === paged.value.page ? "default" : "outline",
							size: "sm",
							"aria-current": entry === paged.value.page ? "page" : void 0,
							onClick: ($event) => page.value = entry
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(entry), 1)]),
							_: 2
						}, 1032, [
							"variant",
							"aria-current",
							"onClick"
						]))], 64);
					}), 128)),
					createVNode(Button_default, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: paged.value.page >= paged.value.pageCount,
						onClick: _cache[3] || (_cache[3] = ($event) => page.value = paged.value.page + 1)
					}, {
						default: withCtx(() => [..._cache[5] || (_cache[5] = [createTextVNode(" Next ", -1)])]),
						_: 1
					}, 8, ["disabled"])
				], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { DataTable_vue_vue_type_script_setup_true_lang_default as default };

