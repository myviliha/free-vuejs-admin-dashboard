import { type AsyncOption } from "@viliha/vui-core";
import { type MaybeRefOrGetter, type Ref } from "vue";
/**
 * The engine behind an async picker, as a composable.
 *
 * **`share`, `batch` and the merge rule are imported, not reimplemented.** They moved to
 * `@viliha/vui-core` for wave 4 precisely so this file could not disagree with React about collapsing
 * in-flight requests or batching a tick's worth of ids: that kind of drift shows up as extra HTTP
 * requests rather than as different markup, so no parity test would ever catch it.
 *
 * **The policy is written twice on purpose.** Deciding WHEN to load is a reactivity question, and
 * sharing it would mean inventing a state machine for two frameworks. React uses effects, this uses
 * watchers, the decisions are the same, and `D18` of the Vue parity spec says why they are not shared.
 */
export interface AsyncOptionSource {
    /**
     * Lazy option source. Called once when the control first opens (empty search), then debounced on
     * each keystroke. Abort superseded requests via `signal`. The empty-search result is cached for the
     * control's lifetime; a `resetKey` change invalidates it.
     */
    loadOptions: (args: {
        search: string;
        signal: AbortSignal;
    }) => Promise<AsyncOption[]>;
    /** Resolve the label for an already-set value without loading the full list. */
    resolveOption?: (value: string) => Promise<AsyncOption | null>;
    /** Batch companion for multi-select: resolve every set value in one call. */
    resolveOptions?: (values: string[]) => Promise<AsyncOption[]>;
}
export interface AsyncOptionsState {
    options: Ref<AsyncOption[]>;
    loading: Ref<boolean>;
    /** A set value's label is still resolving. Show a skeleton, never the raw id. */
    resolving: Ref<boolean>;
    error: Ref<boolean>;
    reload: () => void;
}
export declare function useAsyncOptions(args: {
    source?: MaybeRefOrGetter<AsyncOptionSource | undefined>;
    open: MaybeRefOrGetter<boolean>;
    search: MaybeRefOrGetter<string>;
    value?: MaybeRefOrGetter<string | string[] | undefined>;
    /** Changing this clears the cache and forces a reload on next open (cascades). */
    resetKey?: MaybeRefOrGetter<string | undefined>;
    debounceMs?: number;
}): AsyncOptionsState;
