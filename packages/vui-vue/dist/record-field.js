import { onMounted, ref, watch } from "vue";
//#region src/record-field.ts
/**
* A `ref` that mirrors to `sessionStorage`, so a page's work survives leaving and returning.
*
* **The policy is shared with React, the reactivity is not** (`D18`). Restores on mount so a server
* render and the first client render agree, and with no `key` it is a plain `ref`, so this is opt-in
* and a component can always pass `undefined`.
*
* **`deep`, and it is not an optimisation question.** The seeds this is called with are objects — a
* table's filter values, a form draft — and the idiomatic write is `state.value.status = "open"`. A
* shallow watcher never sees it, so the composable would have persisted nothing at all for the one
* shape it exists to persist.
*
* **No identity guard, unlike React's.** React needs one because its write effect runs on mount and
* StrictMode runs it twice; a Vue watcher is not `immediate`, so the seed cannot be written on the way
* in and the guard would only be a way to silently drop a value the user cleared back to it.
*/
function usePersistentState(key, initial) {
	const state = ref(initial);
	onMounted(() => {
		if (!key) return;
		try {
			const raw = sessionStorage.getItem(key);
			if (raw !== null) state.value = JSON.parse(raw);
		} catch {}
	});
	watch(state, (next) => {
		if (!key) return;
		try {
			sessionStorage.setItem(key, JSON.stringify(next));
		} catch {}
	}, { deep: true });
	return state;
}
/** Drop a persisted key — e.g. once a form Save/Cancel discards its draft. */
function clearPersisted(key) {
	if (!key) return;
	try {
		sessionStorage.removeItem(key);
	} catch {}
}
//#endregion
export { clearPersisted, usePersistentState };

