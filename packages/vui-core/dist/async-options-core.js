/**
 * The request discipline behind an async picker, framework-free.
 *
 * **What is here is the part that is easy to get subtly wrong and impossible to notice**: collapsing
 * identical in-flight requests, gathering a commit's worth of ids into one call, and deciding which
 * options a merged list shows. A second edition that reimplemented these would not fail a parity
 * test; it would just make more HTTP requests than the first, which nobody sees until a table of
 * fifty rows fires fifty lookups.
 *
 * **What is not here is the hook.** Deciding when to load is a reactivity question, and expressing
 * it without a reactivity system means inventing a state machine for two consumers. React keeps its
 * effects, Vue gets a composable, and both call into this.
 */
/** One or many values, normalised to a list with the empties dropped. */
export const asValues = (v) => Array.isArray(v) ? v.filter(Boolean) : v ? [v] : [];
/**
 * Resolve calls currently in flight, keyed by the source function itself, so a table of fifty rows
 * sharing one country id makes one request instead of fifty. An entry is dropped as soon as it
 * settles, so this collapses a burst without holding a label long enough to go stale.
 */
const inFlight = new WeakMap();
export function share(fn, key, run) {
    let byKey = inFlight.get(fn);
    if (!byKey)
        inFlight.set(fn, (byKey = new Map()));
    const hit = byKey.get(key);
    if (hit)
        return hit;
    // `finally`, not `then`: eviction on the rejected path too. With `then` a failed request left its
    // rejected promise in the map for the lifetime of the source function, so every later call for
    // that key got the same rejection and the label never resolved again. The React hook was immune
    // only by accident, because it wraps `run` in its own catch.
    const pending = run().finally(() => {
        byKey.delete(key);
    });
    byKey.set(key, pending);
    return pending;
}
/** Ids waiting to be resolved together, per `resolveOptions` function. */
const queues = new WeakMap();
/**
 * Collect the ids asked for in one tick and resolve them in a single call. A fifty-row table paints
 * its cells in one commit, so every `Department` id on the page is requested together instead of one
 * request per cell. Returns only the options this caller asked for.
 */
export function batch(resolveOptions, ids) {
    let q = queues.get(resolveOptions);
    if (!q)
        queues.set(resolveOptions, (q = { ids: new Set(), run: null }));
    for (const id of ids)
        q.ids.add(id);
    const queue = q;
    if (!queue.run) {
        // A microtask: late enough to gather the whole commit, early enough that nothing waits on a
        // timer.
        queue.run = Promise.resolve().then(() => {
            const wanted = [...queue.ids];
            queue.ids.clear();
            queue.run = null;
            return resolveOptions(wanted).catch(() => []);
        });
    }
    const wanted = new Set(ids);
    return queue.run.then((opts) => opts.filter((o) => wanted.has(String(o.value))));
}
/**
 * What the control renders: the active search results, or the cached full list, with any resolved
 * set-value option put in front so a chosen value keeps its label even when it is not on this page.
 */
export function mergeOptions(args) {
    const list = args.search ? (args.results ?? []) : args.base;
    const extra = Object.values(args.resolved).filter((o) => !list.some((x) => x.value === o.value));
    return [...extra, ...list];
}
