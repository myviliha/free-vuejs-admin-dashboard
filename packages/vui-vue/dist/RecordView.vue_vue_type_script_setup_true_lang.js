import ConfirmDialog_default from "./ConfirmDialog.js";
import { useVuiConfig } from "./config-context.js";
import { ICONS } from "./icons.js";
import { defaultExportActions as defaultExportActions$1, defaultImportActions as defaultImportActions$1, resolveIoActions as resolveIoActions$1 } from "./io-actions.js";
import { usePageTitle } from "./page-chrome.js";
import { usePersistentState } from "./record-field.js";
import RecordDetailPanel_default from "./RecordDetailPanel.js";
import { RECORD_VIEW } from "./record-view-context.js";
import RecordViewTable_default from "./RecordViewTable.js";
import RecordViewToolbar_default from "./RecordViewToolbar.js";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, onMounted, onUnmounted, openBlock, provide, ref, renderSlot, resolveDynamicComponent, toDisplayString, unref, watch, withCtx, withModifiers } from "vue";
import { RV_CARD, RV_CONFIRM_EMPHASIS, RV_CONTENT, RV_DEFAULT_TTL_MS, RV_HEADER, RV_ICON, RV_INLINE_ROW, RV_MENU, RV_MENU_ITEM, RV_MENU_ITEM_DESTRUCTIVE, RV_MENU_ITEM_RESTORE, RV_MENU_SEPARATOR, RV_MIN_LOADING_MS, RV_NUDGE_PX, RV_RESIZE_BASE_W, RV_SHELL, canSortField, clampPageSize, clientFilter, clientSort, computeColumnAligns, emptyStateLabel, nextSort, orderColumns, pageSizeOptions, paginate, pruneFilterValues, reorderRows, resizedWidth, resolveNameSortKey, saveOutcome, showEditActions, totalColumnWidth } from "@viliha/vui-core";
import { clearRecordViewCache, rvCacheGet, rvCacheSet, rvQueryKey } from "@viliha/vui-core/record-cache";
//#region src/RecordView.vue?vue&type=script&setup=true&lang.ts
/**
* `RecordView`: the record workflow. A server-backed table with typed per-field filters, saved column
* layout, bulk actions, import/export and an inline record form.
*
* **Every rule it applies is `@viliha/vui-core`'s.** Which page is showing, what the keyword box
* matches, where the identity column sits, which filter value a cascade invalidated, how wide a
* dragged column may get: all of it is `record-view-core`, the same functions `record-view.tsx` calls,
* so the two editions cannot disagree about an arithmetic question with one right answer. What is
* written twice is the reactivity and the markup.
*
* **The env-var defaults are props here, and that is deliberate (`D12`).** React reads
* `process.env.NEXT_PUBLIC_MAX_CELL_CHARS`, `NEXT_PUBLIC_DEFAULT_PAGE_SIZE`,
* `NEXT_PUBLIC_MAX_PAGE_SIZE`, `NEXT_PUBLIC_RESIZABLE_COLUMNS` and `NEXT_PUBLIC_KEEP_ALIVE_TABS`,
* which its bundler inlines; the same expression means something else in Vite, and nothing at all in
* Nuxt's server build. So this edition takes them as props with React's documented fallbacks: 25 cell
* characters, 25 rows per page, no page-size ceiling, resizable columns on, keep-alive on. An app that
* wants them from the environment reads its own and passes them in, once, where it mounts the table.
*
* **The host contract stays React's prop names**, including the callbacks: `onDataChange`,
* `onQueryChange`, `onFilter`, `onError`, `onFormOpen`, `onRestore`, `onCreate`, `onView`, `onEdit`.
* They are not emits, and the reason is the promise this epic is making rather than Vue convention: a
* config object written for one edition has to type-check against the other, and `onDataChange`'s
* return value is load-bearing (see `afterWrite`), which an emit cannot carry.
*/
var RecordView_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordView",
	props: {
		title: {},
		singular: {},
		icon: {},
		fields: {},
		initialData: { default: () => [] },
		makeEmptyRow: {},
		getPrimary: {},
		formMode: { default: "panel" },
		formColumns: { default: 1 },
		onHome: {},
		formDescription: {},
		data: {},
		onDataChange: {},
		onCreate: {},
		onView: {},
		onEdit: {},
		onFormOpen: {},
		persistKey: {},
		resizableColumns: {
			type: Boolean,
			default: true
		},
		onFilter: {},
		loading: {
			type: Boolean,
			default: false
		},
		manual: {
			type: Boolean,
			default: false
		},
		rowCount: {},
		onQueryChange: {},
		fetcher: {},
		cacheKey: {},
		cache: {
			type: [Boolean, Object],
			default: void 0
		},
		keepAlive: {
			type: Boolean,
			default: true
		},
		onError: {},
		maxCellChars: { default: 25 },
		defaultPageSize: { default: 25 },
		maxPageSize: { default: Number.POSITIVE_INFINITY },
		nameLabel: { default: "Name" },
		nameSortKey: {},
		identityColumn: { default: "first" },
		showImport: {
			type: Boolean,
			default: true
		},
		importActions: {},
		exportActions: {},
		showExport: {
			type: Boolean,
			default: true
		},
		showAdd: {
			type: Boolean,
			default: true
		},
		formRows: {},
		sections: {},
		behaviour: {},
		formActions: {},
		formSlots: {},
		showEdit: {
			type: Boolean,
			default: void 0
		},
		showFilter: {
			type: Boolean,
			default: true
		},
		showSort: {
			type: Boolean,
			default: true
		},
		showPagination: {
			type: Boolean,
			default: true
		},
		showSelection: {
			type: Boolean,
			default: true
		},
		showTrash: {
			type: Boolean,
			default: false
		},
		trashedData: {},
		onRestore: {}
	},
	setup(__props) {
		const props = __props;
		const config = useVuiConfig();
		const behaviour = computed(() => props.behaviour ?? config.value.behaviour ?? {});
		const tableConfig = computed(() => config.value.table ?? {});
		const canEdit = computed(() => showEditActions(props.fields, props.showEdit));
		usePageTitle(() => props.title, () => props.icon);
		const fetching = computed(() => props.fetcher !== void 0);
		const isManual = computed(() => props.manual || fetching.value);
		const controlled = computed(() => props.data !== void 0);
		const internalRows = ref(props.initialData);
		const fetchedData = ref([]);
		const fetchedTotal = ref(0);
		const fetchedLoading = ref(fetching.value);
		/**
		* The request-id guard, the in-flight controller and the next generated id are plain `let`s rather
		* than refs: nothing renders them, and a ref would only add a proxy. **React needs `internalRef` and
		* `fetchedRef` for a different reason.** Its `setRows` closes over state and would rebuild on every
		* change, where a Vue ref is read at call time, so those two have no equivalent here and the decision
		* they encode (a mutation computes from the latest rows) is kept by construction.
		*/
		let reqId = 0;
		let inFlight = null;
		let nextId = 1e6;
		const caching = computed(() => props.cache !== false && props.keepAlive);
		const ttlMs = computed(() => (props.cache === false ? 0 : props.cache?.ttlMs) ?? RV_DEFAULT_TTL_MS);
		const cacheMax = computed(() => (props.cache === false ? 0 : props.cache?.max) ?? 50);
		const runFetch = (q, opts) => {
			const fetcher = props.fetcher;
			if (!fetcher) return;
			const id = ++reqId;
			const started = Date.now();
			let painted = false;
			const commit = (rows, total) => {
				const apply = () => {
					if (id !== reqId) return;
					fetchedData.value = rows;
					fetchedTotal.value = total;
					fetchedLoading.value = false;
				};
				const wait = RV_MIN_LOADING_MS - (Date.now() - started);
				if (opts?.background || painted || wait <= 0) apply();
				else setTimeout(apply, wait);
			};
			if (!opts?.background && caching.value && props.cacheKey) {
				const hit = rvCacheGet(props.cacheKey, rvQueryKey(q), ttlMs.value);
				if (hit) {
					fetchedData.value = hit.rows;
					fetchedTotal.value = hit.total;
					fetchedLoading.value = false;
					painted = true;
				}
			}
			inFlight?.abort();
			const controller = new AbortController();
			inFlight = controller;
			if (!opts?.background && !painted) fetchedLoading.value = true;
			fetcher(q, controller.signal).then((res) => {
				if (id !== reqId) return;
				if (caching.value && props.cacheKey) rvCacheSet(props.cacheKey, rvQueryKey(q), {
					rows: res.rows,
					total: res.total,
					at: Date.now()
				}, cacheMax.value);
				commit(res.rows, res.total);
			}).catch((err) => {
				if (controller.signal.aborted || id !== reqId) return;
				fetchedLoading.value = false;
				props.onError?.(err, q);
			});
		};
		onUnmounted(() => inFlight?.abort());
		const trash = ref(false);
		const rows = computed(() => fetching.value ? fetchedData.value : trash.value && props.trashedData !== void 0 ? props.trashedData : controlled.value ? props.data : internalRows.value);
		const isPromise = (v) => Boolean(v) && typeof v.then === "function";
		/**
		* Update the rows we render **without treating it as a data change**: no `onDataChange`, no cache
		* invalidation, no refetch. Opening a blank Add form and throwing that draft away are not mutations,
		* and routing them through the mutation path made a server-backed table refetch immediately, which
		* returned a page without the draft in it and closed the form the user had just opened.
		*/
		const setRowsLocal = (apply) => {
			if (fetching.value) {
				fetchedData.value = apply(fetchedData.value);
				return;
			}
			if (controlled.value) {
				props.onDataChange?.(apply(props.data));
				return;
			}
			internalRows.value = apply(internalRows.value);
		};
		const setRows = (apply) => {
			/**
			* Reload after the host's write lands. Reloading first would race the POST/PATCH and repaint
			* pre-write rows, which is why a save looked lost. A host that returns nothing keeps the old,
			* immediate reload.
			*/
			const afterWrite = (written, reload) => {
				if (isPromise(written)) written.then(reload, (err) => {
					props.onError?.(err, query.value);
					reload();
				});
				else reload();
			};
			if (fetching.value) {
				const next = apply(fetchedData.value);
				fetchedData.value = next;
				afterWrite(props.onDataChange?.(next), () => {
					if (props.cacheKey) clearRecordViewCache(props.cacheKey);
					runFetch(query.value, { background: true });
				});
				return;
			}
			if (isManual.value && !controlled.value) {
				const next = apply(internalRows.value);
				internalRows.value = next;
				const written = props.onDataChange?.(next);
				if (isPromise(written)) afterWrite(written, () => props.onQueryChange?.(query.value));
				return;
			}
			if (controlled.value) props.onDataChange?.(apply(props.data));
			else internalRows.value = apply(internalRows.value);
		};
		/**
		* Manual (server) mode without the controlled `data` prop feeds each page through `initialData`.
		* Re-sync the internal copy whenever that seed changes, so a post-mutation reload or a narrowed
		* filter replaces the stranded optimistic rows instead of the grid showing stale ones until a manual
		* reload. Controlled mode reads `data` live; client mode keeps its rows, because local edits own them.
		*
		* Not `immediate`: React's effect also runs on mount, where it assigns the seed the state already
		* holds, so there is nothing for the first run to do in either edition.
		*/
		watch(() => props.initialData, (seed) => {
			if (isManual.value && !controlled.value) internalRows.value = seed;
		});
		const keyword = usePersistentState(props.persistKey ? `${props.persistKey}::filter` : void 0, "");
		const filterValues = usePersistentState(props.persistKey ? `${props.persistKey}::filterValues` : void 0, {});
		const sort = usePersistentState(props.persistKey ? `${props.persistKey}::sort` : void 0, null);
		const page = usePersistentState(props.persistKey ? `${props.persistKey}::page` : void 0, 1);
		const hidden = ref(/* @__PURE__ */ new Set());
		const selected = ref(/* @__PURE__ */ new Set());
		const editing = ref(null);
		const cellDraft = ref("");
		const activeId = ref(null);
		const newRowId = ref(null);
		/** The unsaved record an open Add form is editing, held outside `rows` so a refetch cannot take it
		*  away mid-edit. */
		const draftRow = ref(null);
		const confirmDeleteId = ref(null);
		const bulkDeleteOpen = ref(false);
		const confirmRestoreId = ref(null);
		const bulkRestoreOpen = ref(false);
		const panelReadOnly = ref(false);
		const pageSizes = computed(() => pageSizeOptions(props.maxPageSize));
		const pageSize = ref(clampPageSize(props.defaultPageSize, props.maxPageSize));
		const flashId = ref(null);
		const copiedKey = ref(null);
		const dragId = ref(null);
		const dragOverId = ref(null);
		const menu = ref(null);
		const colWidths = ref({});
		/**
		* The right-click menu closes on a click elsewhere, on any scroll, on a resize and on Escape, because
		* it is positioned by hand: anything that moves the row underneath leaves it pointing at nothing.
		* `onCleanup` removes the listeners when the menu closes and when the view unmounts, which is the
		* cleanup React returns from its effect.
		*/
		watch(menu, (open, _was, onCleanup) => {
			if (!open) return;
			const close = () => {
				menu.value = null;
			};
			const onKey = (e) => {
				if (e.key === "Escape") close();
			};
			window.addEventListener("mousedown", close);
			window.addEventListener("scroll", close, true);
			window.addEventListener("resize", close);
			window.addEventListener("keydown", onKey);
			onCleanup(() => {
				window.removeEventListener("mousedown", close);
				window.removeEventListener("scroll", close, true);
				window.removeEventListener("resize", close);
				window.removeEventListener("keydown", onKey);
			});
		});
		const tableFields = computed(() => props.fields.filter((f) => !f.hideInTable));
		const visibleFields = computed(() => tableFields.value.filter((f) => !hidden.value.has(f.key)));
		const orderedCols = computed(() => orderColumns(visibleFields.value, props.identityColumn));
		const canSort = (f) => canSortField(f);
		const sortFields = computed(() => props.fields.filter((f) => canSort(f)));
		const nameSortKeyResolved = computed(() => resolveNameSortKey(props.fields, props.nameSortKey));
		const filterFields = computed(() => props.fields.filter((f) => f.filterable));
		const nameRequired = computed(() => props.fields.some((f) => f.hideInTable && f.required));
		const totalWidth = computed(() => totalColumnWidth({
			visibleFields: visibleFields.value,
			widths: colWidths.value,
			showSelection: props.showSelection
		}));
		const columnAligns = computed(() => computeColumnAligns(props.fields, props.initialData));
		const alignOf = (key) => columnAligns.value[key] ?? "left";
		const processed = computed(() => isManual.value ? rows.value : clientSort(clientFilter(rows.value, keyword.value, props.fields, (row) => props.getPrimary(row).title), sort.value));
		const total = computed(() => isManual.value ? fetching.value ? fetchedTotal.value : props.rowCount ?? processed.value.length : processed.value.length);
		const pagination = computed(() => paginate({
			rows: processed.value,
			page: page.value,
			pageSize: pageSize.value,
			total: total.value,
			manual: isManual.value,
			showPagination: props.showPagination
		}));
		const safePage = computed(() => pagination.value.page);
		const effectiveLoading = computed(() => fetching.value ? fetchedLoading.value : props.loading);
		/**
		* A refetch (a mutation elsewhere, a tab refocus, a poll) replaces `rows` with what the server
		* returned, which never contains an unsaved draft. Fall back to the draft we are holding so an open
		* Add form survives it.
		*/
		const activeRow = computed(() => rows.value.find((r) => r.id === activeId.value) ?? (activeId.value != null && activeId.value === newRowId.value ? draftRow.value : null) ?? null);
		const deleteTarget = computed(() => confirmDeleteId.value != null ? rows.value.find((r) => r.id === confirmDeleteId.value) ?? null : null);
		const restoreTarget = computed(() => confirmRestoreId.value != null ? rows.value.find((r) => r.id === confirmRestoreId.value) ?? null : null);
		const allSelected = computed(() => processed.value.length > 0 && selected.value.size === processed.value.length);
		const bulkFields = computed(() => props.fields.filter((f) => f.editable && Array.isArray(f.options) && f.options.length > 0));
		/** Keep the current query in one place, so a background refetch after a mutation asks for the page
		*  that is on screen. React assigns the same object to a ref during render. */
		const query = computed(() => ({
			page: safePage.value,
			pageSize: pageSize.value,
			sort: sort.value,
			search: keyword.value,
			filters: filterValues.value,
			trash: trash.value
		}));
		/**
		* Reset to the first page when the keyword, the page size or the Trash view changes.
		*
		* **Gated on hydration, and the gate is the whole reason this is not one line.** React's effect runs
		* on mount and sets 1 over 1, which costs nothing there. Here `usePersistentState` restores from
		* storage in `onMounted`, in declaration order, so the restore of the keyword happens **after** the
		* restore of the page and used to trip this watcher: a reader who had filtered and paged to 3 came
		* back to page 1, while a reader who had only paged came back to page 3. `persistKey` meant two
		* different things depending on unrelated state, and in server mode the mount fired a query for the
		* stale page and then a second one for page 1, a round trip for a page nobody would see.
		*
		* **Restoring wins.** A page that was deliberately saved is a page the reader asked for, and
		* `paginate` clamps it anyway if the list has since shrunk, so the guard this watcher exists for is
		* already covered. It resets only on a change a person made after the view settled.
		*
		* **`flush: "sync"` is what makes the gate work**, and a queued watcher is what made the first attempt
		* fail: the restores happen inside `onMounted`, the flag flips at the end of the same hook, and a
		* default pre-flush callback runs after both, so it saw the flag already true and reset the page
		* anyway. Synchronous means it observes each restore as it happens, while the flag is still false.
		* Firing more than once per batch is harmless here, because the callback is idempotent.
		*/
		const hydrated = ref(false);
		onMounted(() => {
			hydrated.value = true;
		});
		watch([
			keyword,
			pageSize,
			trash
		], () => {
			if (!hydrated.value) return;
			page.value = 1;
		}, { flush: "sync" });
		watch(trash, () => {
			selected.value = /* @__PURE__ */ new Set();
			activeId.value = null;
		});
		/**
		* Server mode: report the query so the host (or our own `fetcher`) can load. Fires on page, size,
		* sort and keyword changes, and once on mount for the initial load.
		*
		* **Per-field filters emit from the Filter panel's Search instead**, so they apply on demand rather
		* than per keystroke. `filterValues` is read fresh through `query` and deliberately not a source here,
		* which is React's `exhaustive-deps` suppression written as a narrower watcher.
		*
		* The initial load is `onMounted` rather than an `immediate` watcher, because an immediate one would
		* run during SSR and fire a request on the server, where React's effect does not run at all.
		*/
		const emitQuery = () => {
			if (!isManual.value) return;
			if (fetching.value) runFetch(query.value);
			else props.onQueryChange?.(query.value);
		};
		onMounted(emitQuery);
		watch([
			isManual,
			fetching,
			safePage,
			pageSize,
			sort,
			keyword,
			trash
		], emitQuery);
		/**
		* Cascading filter options: when the values change, drop any filter value no longer valid once its
		* options recompute (changing Region invalidates a Country filter). Only function-options filters
		* cascade; a string clears, a multi-select keeps its still-valid entries.
		*
		* `immediate` and `deep` for the same two reasons the record form's cascade is: React's effect runs on
		* mount, so a view restored with an already-invalid pair must settle before its first query rather
		* than sending it; and a persisted filter object is restored by mutation, which a shallow watcher
		* never sees. `pruneFilterValues` returns `null` when nothing changed, so this cannot loop.
		*/
		watch([filterValues, () => props.fields], () => {
			const next = pruneFilterValues(props.fields, filterValues.value);
			if (next) filterValues.value = next;
		}, {
			deep: true,
			immediate: true
		});
		const toggleSort = (key) => {
			sort.value = nextSort(sort.value, key);
		};
		const clearSort = () => {
			sort.value = null;
		};
		const toggleHidden = (key) => {
			const next = new Set(hidden.value);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			hidden.value = next;
		};
		const showAllColumns = () => {
			hidden.value = /* @__PURE__ */ new Set();
		};
		const toggleTrash = () => {
			trash.value = !trash.value;
		};
		const clearSelection = () => {
			selected.value = /* @__PURE__ */ new Set();
		};
		const toggleSelect = (id) => {
			const next = new Set(selected.value);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			selected.value = next;
		};
		const toggleSelectAll = () => {
			selected.value = selected.value.size === processed.value.length ? /* @__PURE__ */ new Set() : new Set(processed.value.map((r) => r.id));
		};
		const setFilterValue = (key, value) => {
			filterValues.value = {
				...filterValues.value,
				[key]: value
			};
		};
		/** The Filter panel's Search and Clear: hand the values to the host, reset to page one, and re-emit
		*  the query with the values it is about to be asked for rather than the ones state still holds. */
		const emitFilterQuery = (filters) => {
			page.value = 1;
			const q = {
				page: 1,
				pageSize: pageSize.value,
				sort: sort.value,
				search: keyword.value,
				filters,
				trash: trash.value
			};
			if (fetching.value) runFetch(q);
			else if (props.manual) props.onQueryChange?.(q);
		};
		const applyFilters = () => {
			props.onFilter?.(filterValues.value);
			emitFilterQuery(filterValues.value);
		};
		const clearFilters = () => {
			filterValues.value = {};
			props.onFilter?.({});
			emitFilterQuery({});
		};
		const setPageSize = (size) => {
			pageSize.value = size;
		};
		const prevPage = () => {
			page.value = Math.max(1, page.value - 1);
		};
		const nextPage = () => {
			page.value = Math.min(pagination.value.totalPages, page.value + 1);
		};
		const startResize = (key, event) => {
			event.preventDefault();
			event.stopPropagation();
			const startX = event.clientX;
			const startW = colWidths.value[key] ?? RV_RESIZE_BASE_W;
			const onMove = (ev) => {
				colWidths.value = {
					...colWidths.value,
					[key]: resizedWidth(startW, ev.clientX - startX)
				};
			};
			const onUp = () => {
				document.removeEventListener("mousemove", onMove);
				document.removeEventListener("mouseup", onUp);
				document.body.style.userSelect = "";
				document.body.style.cursor = "";
			};
			document.addEventListener("mousemove", onMove);
			document.addEventListener("mouseup", onUp);
			document.body.style.userSelect = "none";
			document.body.style.cursor = "col-resize";
		};
		const nudgeColumn = (key, dir) => {
			colWidths.value = {
				...colWidths.value,
				[key]: resizedWidth(colWidths.value[key], dir * RV_NUDGE_PX)
			};
		};
		const startEdit = (row, key) => {
			editing.value = {
				id: row.id,
				key
			};
			cellDraft.value = String(row[key] ?? "");
		};
		const commitEdit = () => {
			const cell = editing.value;
			if (!cell) return;
			setRows((prev) => prev.map((row) => row.id === cell.id ? {
				...row,
				[cell.key]: cellDraft.value
			} : row));
			editing.value = null;
		};
		const cancelEdit = () => {
			editing.value = null;
		};
		const copyValue = async (cellKey, value) => {
			try {
				await navigator.clipboard.writeText(value);
				copiedKey.value = cellKey;
				setTimeout(() => {
					if (copiedKey.value === cellKey) copiedKey.value = null;
				}, 1200);
			} catch {}
		};
		const addRow = () => {
			if (props.onCreate) {
				props.onFormOpen?.("create");
				props.onCreate();
				return;
			}
			const make = props.makeEmptyRow;
			if (!make) return;
			const row = {
				...make(),
				id: nextId++
			};
			props.onFormOpen?.("create", row);
			setRowsLocal((prev) => [row, ...prev]);
			draftRow.value = row;
			page.value = 1;
			panelReadOnly.value = false;
			activeId.value = row.id;
			newRowId.value = row.id;
		};
		/** Open the detail panel read-only (View). */
		const openView = (id) => {
			props.onFormOpen?.("view", rows.value.find((r) => r.id === id));
			if (props.onView) {
				props.onView(id);
				return;
			}
			panelReadOnly.value = true;
			activeId.value = id;
		};
		/** Open the detail panel editable (Edit). */
		const openEdit = (id) => {
			props.onFormOpen?.("edit", rows.value.find((r) => r.id === id));
			if (props.onEdit) {
				props.onEdit(id);
				return;
			}
			panelReadOnly.value = false;
			activeId.value = id;
		};
		const rowClick = computed(() => behaviour.value.rowClick ?? "view");
		const openRow = (id) => {
			if (rowClick.value === "view") openView(id);
			else if (rowClick.value === "edit") openEdit(id);
		};
		const deleteRow = (id) => {
			setRows((prev) => prev.filter((row) => row.id !== id));
			if (selected.value.has(id)) {
				const next = new Set(selected.value);
				next.delete(id);
				selected.value = next;
			}
			if (activeId.value === id) activeId.value = null;
		};
		/** Delete, asking first unless the app turned the confirm off. */
		const requestDelete = (id) => {
			if (behaviour.value.confirmDelete ?? true) confirmDeleteId.value = id;
			else deleteRow(id);
		};
		/** Delete every selected row, then clear the selection. */
		const bulkDelete = () => {
			setRows((prev) => prev.filter((r) => !selected.value.has(r.id)));
			if (activeId.value != null && selected.value.has(activeId.value)) activeId.value = null;
			selected.value = /* @__PURE__ */ new Set();
			bulkDeleteOpen.value = false;
		};
		/** Restore rows from Trash. The host persists via `onRestore`; we clear the selection and (in
		*  `fetcher` mode) refetch, so the rows leave the Trash view. Client-mode hosts drop them from
		*  `trashedData`. */
		const restore = (ids) => {
			const set = new Set(ids);
			const toRestore = rows.value.filter((r) => set.has(r.id));
			if (toRestore.length) props.onRestore?.(toRestore);
			selected.value = /* @__PURE__ */ new Set();
			if (fetching.value) {
				if (props.cacheKey) clearRecordViewCache(props.cacheKey);
				runFetch(query.value, { background: true });
			}
			confirmRestoreId.value = null;
			bulkRestoreOpen.value = false;
		};
		const duplicateRow = (id) => {
			const copyId = nextId++;
			setRows((prev) => {
				const index = prev.findIndex((row) => row.id === id);
				if (index < 0) return prev;
				const original = prev[index];
				if (!original) return prev;
				const next = [...prev];
				next.splice(index + 1, 0, {
					...original,
					id: copyId
				});
				return next;
			});
			activeId.value = copyId;
		};
		const reorder = (sourceId, targetId) => {
			if (sourceId === targetId) return;
			sort.value = null;
			setRows((prev) => reorderRows(prev, sourceId, targetId));
		};
		const bulkSetField = (key, value) => {
			setRows((prev) => prev.map((r) => selected.value.has(r.id) ? {
				...r,
				[key]: value
			} : r));
		};
		const openMenu = (id, x, y) => {
			menu.value = {
				id,
				x,
				y
			};
		};
		/** Commit the form's buffered draft back into the table. `then` comes from the action that saved
		*  (Save closes, "Save & New" opens a blank row); without one it follows `behaviour.closeOnSave`. */
		const saveForm = (updated, then) => {
			draftRow.value = null;
			setRows((prev) => prev.some((r) => r.id === updated.id) ? prev.map((r) => r.id === updated.id ? updated : r) : [updated, ...prev]);
			const flashMs = behaviour.value.flashMs ?? 1600;
			if (flashMs > 0) {
				flashId.value = updated.id;
				setTimeout(() => {
					if (flashId.value === updated.id) flashId.value = null;
				}, flashMs);
			}
			newRowId.value = null;
			const outcome = saveOutcome(then, behaviour.value);
			if (outcome === "close") activeId.value = null;
			else if (outcome === "new") addRow();
		};
		/** Discard the form; drop the row entirely if it was never saved. */
		const cancelForm = () => {
			if (activeId.value != null && activeId.value === newRowId.value) {
				const gone = activeId.value;
				setRowsLocal((prev) => prev.filter((r) => r.id !== gone));
			}
			draftRow.value = null;
			newRowId.value = null;
			activeId.value = null;
		};
		const startEditingPanel = () => {
			panelReadOnly.value = false;
		};
		const ioContext = (file) => ({
			rows: processed.value,
			columns: props.fields.map((f) => ({
				key: f.key,
				label: f.label
			})),
			title: props.title,
			query: query.value,
			file,
			applyRows: (imported) => {
				setRows((prev) => [...imported, ...prev]);
				page.value = 1;
			},
			refetch: () => {
				if (props.cacheKey) clearRecordViewCache(props.cacheKey);
				runFetch(query.value, { background: true });
			}
		});
		const exportMenu = computed(() => resolveIoActions$1(defaultExportActions$1(), props.exportActions ?? tableConfig.value.exportActions));
		const importMenu = computed(() => resolveIoActions$1(defaultImportActions$1(props.makeEmptyRow, () => nextId++), props.importActions ?? tableConfig.value.importActions));
		/**
		* Writable computeds rather than `:open` plus a `@cancel` that clears the id. `ConfirmDialog`'s `open`
		* is a model that Escape and a backdrop click both write, and routing that write back to the id it
		* came from is what keeps a dismissed confirm from acting on the wrong row next time.
		*/
		const deleteOpen = computed({
			get: () => confirmDeleteId.value != null,
			set: (open) => {
				if (!open) confirmDeleteId.value = null;
			}
		});
		const restoreOpen = computed({
			get: () => confirmRestoreId.value != null,
			set: (open) => {
				if (!open) confirmRestoreId.value = null;
			}
		});
		const askBulkDelete = () => {
			bulkDeleteOpen.value = true;
		};
		const askBulkRestore = () => {
			bulkRestoreOpen.value = true;
		};
		const askRestore = (id) => {
			confirmRestoreId.value = id;
		};
		const confirmDelete = () => {
			if (confirmDeleteId.value != null) deleteRow(confirmDeleteId.value);
			confirmDeleteId.value = null;
		};
		const confirmRestore = () => {
			if (confirmRestoreId.value != null) restore([confirmRestoreId.value]);
		};
		const titleOf = (row) => row ? props.getPrimary(row).title || "this record" : "this record";
		const bulkNoun = computed(() => selected.value.size === 1 ? props.singular.toLowerCase() : props.title.toLowerCase());
		const plural = computed(() => selected.value.size === 1 ? "" : "s");
		provide(RECORD_VIEW, {
			title: computed(() => props.title),
			singular: computed(() => props.singular),
			icon: computed(() => props.icon),
			fields: computed(() => props.fields),
			getPrimary: (row) => props.getPrimary(row),
			showSelection: computed(() => props.showSelection),
			showFilter: computed(() => props.showFilter),
			showSort: computed(() => props.showSort),
			showImport: computed(() => props.showImport),
			showExport: computed(() => props.showExport),
			showAdd: computed(() => props.showAdd),
			showPagination: computed(() => props.showPagination),
			showTrash: computed(() => props.showTrash),
			canEdit,
			canAdd: computed(() => Boolean(props.onCreate || props.makeEmptyRow)),
			canRestore: computed(() => props.onRestore !== void 0),
			resizableColumns: computed(() => props.resizableColumns),
			maxCellChars: computed(() => props.maxCellChars),
			rowClick,
			keyword,
			filterValues,
			sort,
			page,
			pageSize,
			pageSizes,
			trash,
			hidden,
			selected,
			tableFields,
			orderedCols,
			sortFields,
			filterFields,
			nameLabel: computed(() => props.nameLabel),
			nameRequired,
			nameSortKey: nameSortKeyResolved,
			colWidths,
			totalWidth,
			alignOf,
			canSort,
			paged: computed(() => pagination.value.rows),
			hasRows: computed(() => processed.value.length > 0),
			total,
			safePage,
			totalPages: computed(() => pagination.value.totalPages),
			rangeStart: computed(() => pagination.value.rangeStart),
			rangeEnd: computed(() => pagination.value.rangeEnd),
			loading: effectiveLoading,
			allSelected,
			bulkFields,
			emptyLabel: computed(() => emptyStateLabel(keyword.value, filterValues.value)),
			activeId,
			flashId,
			dragId,
			dragOverId,
			editing,
			cellDraft,
			copiedKey,
			startEdit,
			commitEdit,
			cancelEdit,
			copyValue: (cellKey, value) => void copyValue(cellKey, value),
			toggleSort,
			clearSort,
			toggleHidden,
			showAllColumns,
			toggleTrash,
			clearSelection,
			toggleSelect,
			toggleSelectAll,
			setFilterValue,
			applyFilters,
			clearFilters,
			startResize,
			nudgeColumn,
			setPageSize,
			prevPage,
			nextPage,
			addRow,
			openRow,
			openView,
			openEdit,
			duplicateRow,
			requestDelete,
			askRestore,
			askBulkDelete,
			askBulkRestore,
			bulkSetField,
			reorder,
			openMenu,
			importMenu,
			exportMenu,
			ioContext
		});
		/** A template expression is parsed as plain JavaScript, so the two `Math.min` clamps that keep the
		*  hand-positioned menu on screen live here rather than in the attribute. */
		const menuStyle = (at) => ({
			top: `${Math.min(at.y, window.innerHeight - 140)}px`,
			left: `${Math.min(at.x, window.innerWidth - 200)}px`
		});
		const fromMenu = (act) => {
			const open = menu.value;
			if (!open) return;
			act(open.id);
			menu.value = null;
		};
		return (_ctx, _cache) => {
			return __props.formMode === "page" && activeRow.value ? (openBlock(), createBlock(RecordDetailPanel_default, {
				key: 0,
				layout: "page",
				columns: __props.formColumns,
				"is-new": activeId.value === newRowId.value,
				title: __props.title,
				"on-home": __props.onHome,
				"form-description": __props.formDescription,
				fields: __props.fields,
				row: activeRow.value,
				singular: __props.singular,
				"get-primary": __props.getPrimary,
				"read-only": panelReadOnly.value,
				"on-edit": canEdit.value ? startEditingPanel : void 0,
				"form-actions": __props.formActions,
				"form-slots": __props.formSlots,
				behaviour: behaviour.value,
				"form-rows": __props.formRows,
				sections: __props.sections,
				onSave: saveForm,
				onCancel: cancelForm
			}, {
				icon: withCtx((p) => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon ?? unref(ICONS).circle), { class: normalizeClass(p.class) }, null, 8, ["class"]))]),
				_: 1
			}, 8, [
				"columns",
				"is-new",
				"title",
				"on-home",
				"form-description",
				"fields",
				"row",
				"singular",
				"get-primary",
				"read-only",
				"on-edit",
				"form-actions",
				"form-slots",
				"behaviour",
				"form-rows",
				"sections"
			])) : (openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(RV_SHELL))
			}, [
				createElementVNode("div", { class: normalizeClass(unref(RV_HEADER)) }, [createElementVNode("div", { class: normalizeClass(unref(RV_INLINE_ROW)) }, [renderSlot(_ctx.$slots, "title-leading")], 2), createVNode(RecordViewToolbar_default, { part: "actions" })], 2),
				createElementVNode("div", { class: normalizeClass(unref(RV_CONTENT)) }, [createElementVNode("div", { class: normalizeClass(unref(RV_CARD)) }, [createVNode(RecordViewToolbar_default, {
					part: "toolbar",
					"has-filter-extras": Boolean(_ctx.$slots["filter-extras"])
				}, {
					"filter-extras": withCtx(() => [renderSlot(_ctx.$slots, "filter-extras")]),
					_: 3
				}, 8, ["has-filter-extras"]), createVNode(RecordViewTable_default)], 2)], 2),
				activeRow.value ? (openBlock(), createBlock(RecordDetailPanel_default, {
					key: 0,
					fields: __props.fields,
					row: activeRow.value,
					"is-new": activeId.value === newRowId.value,
					singular: __props.singular,
					"get-primary": __props.getPrimary,
					"read-only": panelReadOnly.value,
					"on-edit": canEdit.value ? startEditingPanel : void 0,
					"form-actions": __props.formActions,
					"form-slots": __props.formSlots,
					behaviour: behaviour.value,
					"form-rows": __props.formRows,
					sections: __props.sections,
					onSave: saveForm,
					onCancel: cancelForm
				}, {
					icon: withCtx((p) => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon ?? unref(ICONS).circle), { class: normalizeClass(p.class) }, null, 8, ["class"]))]),
					_: 1
				}, 8, [
					"fields",
					"row",
					"is-new",
					"singular",
					"get-primary",
					"read-only",
					"on-edit",
					"form-actions",
					"form-slots",
					"behaviour",
					"form-rows",
					"sections"
				])) : createCommentVNode("", true),
				menu.value ? (openBlock(), createElementBlock("div", {
					key: 1,
					role: "menu",
					"aria-label": "Record actions",
					tabindex: -1,
					style: normalizeStyle(menuStyle(menu.value)),
					class: normalizeClass(unref(RV_MENU)),
					onMousedown: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
				}, [
					createElementVNode("button", {
						type: "button",
						role: "menuitem",
						class: normalizeClass(unref(RV_MENU_ITEM)),
						onClick: _cache[0] || (_cache[0] = ($event) => fromMenu(openView))
					}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).arrowUpRight), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), _cache[10] || (_cache[10] = createTextVNode(" Open record ", -1))], 2),
					!trash.value ? (openBlock(), createElementBlock("button", {
						key: 0,
						type: "button",
						role: "menuitem",
						class: normalizeClass(unref(RV_MENU_ITEM)),
						onClick: _cache[1] || (_cache[1] = ($event) => fromMenu(duplicateRow))
					}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).copy), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), _cache[11] || (_cache[11] = createTextVNode(" Duplicate ", -1))], 2)) : createCommentVNode("", true),
					createElementVNode("div", { class: normalizeClass(unref(RV_MENU_SEPARATOR)) }, null, 2),
					trash.value && __props.onRestore ? (openBlock(), createElementBlock("button", {
						key: 1,
						type: "button",
						role: "menuitem",
						class: normalizeClass(unref(RV_MENU_ITEM_RESTORE)),
						onClick: _cache[2] || (_cache[2] = ($event) => fromMenu(askRestore))
					}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).reset), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), _cache[12] || (_cache[12] = createTextVNode(" Restore ", -1))], 2)) : !trash.value ? (openBlock(), createElementBlock("button", {
						key: 2,
						type: "button",
						role: "menuitem",
						class: normalizeClass(unref(RV_MENU_ITEM_DESTRUCTIVE)),
						onClick: _cache[3] || (_cache[3] = ($event) => fromMenu(requestDelete))
					}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).trash), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), _cache[13] || (_cache[13] = createTextVNode(" Delete ", -1))], 2)) : createCommentVNode("", true)
				], 38)) : createCommentVNode("", true),
				createVNode(ConfirmDialog_default, {
					open: deleteOpen.value,
					"onUpdate:open": _cache[5] || (_cache[5] = ($event) => deleteOpen.value = $event),
					title: `Delete ${__props.singular.toLowerCase()}?`,
					destructive: "",
					"confirm-label": "Delete",
					onConfirm: confirmDelete
				}, {
					description: withCtx(() => [
						_cache[14] || (_cache[14] = createTextVNode(" This permanently removes ", -1)),
						createElementVNode("span", { class: normalizeClass(unref(RV_CONFIRM_EMPHASIS)) }, toDisplayString(titleOf(deleteTarget.value)), 3),
						_cache[15] || (_cache[15] = createTextVNode(". This can’t be undone. ", -1))
					]),
					_: 1
				}, 8, ["open", "title"]),
				createVNode(ConfirmDialog_default, {
					open: bulkDeleteOpen.value,
					"onUpdate:open": _cache[6] || (_cache[6] = ($event) => bulkDeleteOpen.value = $event),
					title: `Delete ${selected.value.size} ${bulkNoun.value}?`,
					destructive: "",
					"confirm-label": "Delete",
					onConfirm: bulkDelete
				}, {
					description: withCtx(() => [
						_cache[16] || (_cache[16] = createTextVNode(" This permanently removes the ", -1)),
						createElementVNode("span", { class: normalizeClass(unref(RV_CONFIRM_EMPHASIS)) }, toDisplayString(selected.value.size) + " selected", 3),
						createTextVNode(" record" + toDisplayString(plural.value) + ". This can’t be undone. ", 1)
					]),
					_: 1
				}, 8, ["open", "title"]),
				createVNode(ConfirmDialog_default, {
					open: restoreOpen.value,
					"onUpdate:open": _cache[7] || (_cache[7] = ($event) => restoreOpen.value = $event),
					title: `Restore ${__props.singular.toLowerCase()}?`,
					"confirm-label": "Restore",
					onConfirm: confirmRestore
				}, {
					description: withCtx(() => [
						_cache[17] || (_cache[17] = createTextVNode(" This returns ", -1)),
						createElementVNode("span", { class: normalizeClass(unref(RV_CONFIRM_EMPHASIS)) }, toDisplayString(titleOf(restoreTarget.value)), 3),
						_cache[18] || (_cache[18] = createTextVNode(" to the live list. ", -1))
					]),
					_: 1
				}, 8, ["open", "title"]),
				createVNode(ConfirmDialog_default, {
					open: bulkRestoreOpen.value,
					"onUpdate:open": _cache[8] || (_cache[8] = ($event) => bulkRestoreOpen.value = $event),
					title: `Restore ${selected.value.size} ${bulkNoun.value}?`,
					"confirm-label": "Restore",
					onConfirm: _cache[9] || (_cache[9] = ($event) => restore([...selected.value]))
				}, {
					description: withCtx(() => [
						_cache[19] || (_cache[19] = createTextVNode(" This returns the ", -1)),
						createElementVNode("span", { class: normalizeClass(unref(RV_CONFIRM_EMPHASIS)) }, toDisplayString(selected.value.size) + " selected", 3),
						createTextVNode(" record" + toDisplayString(plural.value) + " to the live list. ", 1)
					]),
					_: 1
				}, 8, ["open", "title"])
			], 2));
		};
	}
});
//#endregion
export { RecordView_vue_vue_type_script_setup_true_lang_default as default };

