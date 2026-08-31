import { computed, onScopeDispose, ref, toValue, watch } from "vue";
import { asValues, batch, mergeOptions, share } from "@viliha/vui-core";
//#region src/use-async-options.ts
function useAsyncOptions(args) {
	const debounceMs = args.debounceMs ?? 250;
	const source = () => toValue(args.source);
	const query = () => toValue(args.search).trim();
	const base = ref([]);
	const results = ref(null);
	const resolved = ref({});
	const loading = ref(false);
	const error = ref(false);
	const resolving = ref(false);
	let baseLoaded = false;
	const nonce = ref(0);
	watch(() => toValue(args.resetKey), () => {
		baseLoaded = false;
		base.value = [];
		results.value = null;
		resolved.value = {};
	});
	let resolveRun = 0;
	watch([
		() => asValues(toValue(args.value)).join("\0"),
		() => toValue(args.resetKey),
		() => Boolean(source()?.resolveOption || source()?.resolveOptions)
	], ([, key]) => {
		const src = source();
		const resolveOne = src?.resolveOption;
		const resolveAll = src?.resolveOptions;
		if (!src || !(resolveOne || resolveAll)) {
			resolving.value = false;
			return;
		}
		const missing = asValues(toValue(args.value)).filter((v) => !resolved.value[v]);
		if (!missing.length) {
			resolving.value = false;
			return;
		}
		resolving.value = true;
		const run = ++resolveRun;
		(resolveAll ? batch(resolveAll, missing) : Promise.all(missing.map((v) => share(resolveOne, JSON.stringify([key, v]), () => resolveOne(v).then((o) => o ? [o] : []).catch(() => [])))).then((lists) => lists.flat())).then((opts) => {
			if (run !== resolveRun) return;
			resolving.value = false;
			if (!opts.length) return;
			const next = { ...resolved.value };
			for (const o of opts) next[String(o.value)] = o;
			resolved.value = next;
		});
	}, { immediate: true });
	let abort;
	let timer;
	const stopLoading = () => {
		abort?.abort();
		clearTimeout(timer);
	};
	/**
	* **Cleanup on close and on teardown, not only on the next load.** A debounce armed at 250ms
	* survived both otherwise: the request fired after the control had closed, its `.then` wrote into a
	* dead scope, and the `AbortController` was never aborted, so a source keyed off `signal.onabort`
	* never heard about it. React's effect cleanup does this and it was missing here.
	*/
	onScopeDispose(stopLoading);
	watch([
		() => toValue(args.open),
		query,
		() => toValue(args.resetKey),
		nonce,
		() => Boolean(source())
	], ([isOpen, q]) => {
		const src = source();
		if (!src || !isOpen) {
			stopLoading();
			return;
		}
		if (!q && baseLoaded) {
			results.value = null;
			return;
		}
		stopLoading();
		const ctrl = new AbortController();
		abort = ctrl;
		loading.value = true;
		error.value = false;
		timer = setTimeout(() => {
			src.loadOptions({
				search: q,
				signal: ctrl.signal
			}).then((opts) => {
				if (ctrl.signal.aborted) return;
				if (q) results.value = opts;
				else {
					base.value = opts;
					results.value = null;
					baseLoaded = true;
				}
				loading.value = false;
			}).catch((e) => {
				if (ctrl.signal.aborted) return;
				if (e instanceof DOMException && e.name === "AbortError") return;
				error.value = true;
				loading.value = false;
			});
		}, q ? debounceMs : 0);
	}, { immediate: true });
	return {
		options: computed(() => source() ? mergeOptions({
			search: query(),
			results: results.value,
			base: base.value,
			resolved: resolved.value
		}) : []),
		loading,
		resolving,
		error,
		reload: () => {
			baseLoaded = false;
			nonce.value += 1;
		}
	};
}
//#endregion
export { useAsyncOptions };

