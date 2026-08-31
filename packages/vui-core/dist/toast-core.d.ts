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
export type ToastVariant = "default" | "success" | "error" | "warning";
export type ToastAction = {
    label: string;
    onClick: () => void;
};
/**
 * `D` is the description's type, and the store never looks at it: a `ReactNode` in React, a string
 * or a `VNode` in Vue. Parameterising it is what keeps this module free of both.
 */
export type ToastOptions<D = unknown> = {
    title: string;
    description?: D;
    variant?: ToastVariant;
    /** A single action button (e.g. "Undo"). Firing it dismisses the toast. */
    action?: ToastAction;
    /** Auto-dismiss after ms. Default 5000; `0` keeps it until dismissed. */
    duration?: number;
};
export type ToastItem<D = unknown> = ToastOptions<D> & {
    id: number;
};
/** Auto-dismiss default, shared so the two editions cannot disagree about it. */
export declare const TOAST_DURATION = 5000;
/** Subscribe to queue changes. Returns the unsubscribe, so no caller touches the listener set. */
export declare function subscribeToasts(listener: () => void): () => void;
/**
 * The current queue.
 *
 * **The array identity only changes when the queue does**, which is what React's
 * `useSyncExternalStore` requires of a snapshot and what lets Vue treat it as a plain value. That
 * contract forbids returning a copy, so the type is `readonly` instead: a port that sorted or
 * wrapped this in place would mutate the store without changing its identity, and React would
 * never re-render.
 */
export declare function getToasts<D = unknown>(): readonly ToastItem<D>[];
/** Remove a toast by id. */
export declare function dismissToast(id: number): void;
type Extra<D> = Omit<ToastOptions<D>, "title" | "variant">;
/**
 * **`D` is fixed by whoever binds this type, never inferred from the argument.** A per-method
 * generic looked equivalent and was not: `D` inferred from the call, so `toast.error("failed", {
 * description: e })` with an `unknown` or an object type-checked, and React then threw "Objects are
 * not valid as a React child" inside a portal it could not recover from. React binds
 * `ToastFn<ReactNode>` and gets its old compile error back.
 */
export type ToastFn<D = unknown> = ((opts: ToastOptions<D> | string) => number) & {
    success: (title: string, opts?: Extra<D>) => number;
    error: (title: string, opts?: Extra<D>) => number;
    warning: (title: string, opts?: Extra<D>) => number;
    dismiss: (id: number) => void;
};
/**
 * Show a toast. `toast("Saved")`, `toast({ title, description, action })`, or `toast.error("...")`.
 * Returns the toast id.
 */
export declare const toast: ToastFn;
export {};
