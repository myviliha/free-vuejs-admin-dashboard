/**
 * RecordView's page cache. **Module state, so it has its own module.**
 *
 * `toast-core` is here for the same reason and the note there is the general one: a second module
 * instance means a second cache, and a second cache means a table painting rows the other one already
 * invalidated. It is reached at `@viliha/vui-core/record-cache` rather than from the barrel, so the
 * import is deliberate.
 *
 * Lifted out of `record-field.tsx` unchanged on 2026-08-20.
 */
import type { ServerQuery } from "./record-field-core.js";
export type RvCacheEntry = {
    rows: unknown[];
    total: number;
    at: number;
};
/**
 * Drop cached pages: everything, or one `cacheKey`.
 *
 * RecordView clears the namespace itself after a mutation it performed. Call
 * this when something *else* changed the data: a websocket event, a bulk job,
 * an edit made on another screen.
 */
export declare function clearRecordViewCache(cacheKey?: string): void;
/** Cache identity for a query: same key means same page of the same list.
 *  Exported for testing. */
export declare function rvQueryKey<T>(q: ServerQuery<T>): string;
/** A cached page, if one is there and still young enough to paint. Exported for
 *  testing. */
export declare function rvCacheGet(ns: string, key: string, ttlMs: number): RvCacheEntry | null;
/** Exported for testing. */
export declare function rvCacheSet(ns: string, key: string, entry: RvCacheEntry, max: number): void;
