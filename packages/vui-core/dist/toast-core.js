/**
 * The toast store, framework-free.
 *
 * It was already framework-free inside `toast.tsx`: a module-scoped array, a set of listeners and an
 * id counter, with no React in any of it. Only the subscription and the rendering needed a
 * framework. Moving it here means **the imperative API is identical in both editions by
 * construction** rather than by discipline, which matters more for this family than most: an app
 * calls `toast.success` from a hundred places, so a divergence in that signature is a hundred small
 * edits.
 *
 * A `<Toaster/>` per framework subscribes and renders. Nothing else changes.
 */
/** Auto-dismiss default, shared so the two editions cannot disagree about it. */
export const TOAST_DURATION = 5000;
// Module-scoped so `toast()` works from anywhere, an event handler, a catch block, an effect,
// without a wrapping provider.
let items = [];
const listeners = new Set();
let nextId = 1;
const emit = () => {
    for (const listener of listeners)
        listener();
};
/** Subscribe to queue changes. Returns the unsubscribe, so no caller touches the listener set. */
export function subscribeToasts(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}
/**
 * The current queue.
 *
 * **The array identity only changes when the queue does**, which is what React's
 * `useSyncExternalStore` requires of a snapshot and what lets Vue treat it as a plain value. That
 * contract forbids returning a copy, so the type is `readonly` instead: a port that sorted or
 * wrapped this in place would mutate the store without changing its identity, and React would
 * never re-render.
 */
export function getToasts() {
    return items;
}
/** Remove a toast by id. */
export function dismissToast(id) {
    items = items.filter((t) => t.id !== id);
    emit();
}
function addToast(opts) {
    const id = nextId++;
    items = [...items, { ...opts, id }];
    emit();
    const duration = opts.duration ?? TOAST_DURATION;
    if (duration > 0)
        setTimeout(() => dismissToast(id), duration);
    return id;
}
/**
 * Show a toast. `toast("Saved")`, `toast({ title, description, action })`, or `toast.error("...")`.
 * Returns the toast id.
 */
export const toast = Object.assign((opts) => addToast(typeof opts === "string" ? { title: opts } : opts), {
    success: (title, opts) => addToast({ ...opts, title, variant: "success" }),
    error: (title, opts) => addToast({ ...opts, title, variant: "error" }),
    warning: (title, opts) => addToast({ ...opts, title, variant: "warning" }),
    dismiss: dismissToast,
});
