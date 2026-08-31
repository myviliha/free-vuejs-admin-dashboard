import type { AsyncOption } from "./async-options-core.js";
/** Debounced server search: match a code or its city, cap the page. */
export declare function searchPostCodes({ search, signal, }: {
    search: string;
    signal: AbortSignal;
}): Promise<AsyncOption[]>;
/** Batch-resolve the labels for already-selected codes — never the whole list. */
export declare function resolvePostCodes(values: string[]): Promise<AsyncOption[]>;
