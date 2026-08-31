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
const RV_CACHE = new Map();
/**
 * Drop cached pages: everything, or one `cacheKey`.
 *
 * RecordView clears the namespace itself after a mutation it performed. Call
 * this when something *else* changed the data: a websocket event, a bulk job,
 * an edit made on another screen.
 */
export function clearRecordViewCache(cacheKey) {
    if (cacheKey)
        RV_CACHE.delete(cacheKey);
    else
        RV_CACHE.clear();
}
/** Cache identity for a query: same key means same page of the same list.
 *  Exported for testing. */
export function rvQueryKey(q) {
    return JSON.stringify([q.page, q.pageSize, q.sort, q.search, q.filters, q.trash]);
}
/** A cached page, if one is there and still young enough to paint. Exported for
 *  testing. */
export function rvCacheGet(ns, key, ttlMs) {
    const bucket = RV_CACHE.get(ns);
    const hit = bucket?.get(key);
    if (!hit)
        return null;
    if (ttlMs > 0 && Date.now() - hit.at > ttlMs) {
        bucket.delete(key);
        return null;
    }
    // Refresh recency.
    bucket.delete(key);
    bucket.set(key, hit);
    return hit;
}
/** Exported for testing. */
export function rvCacheSet(ns, key, entry, max) {
    let bucket = RV_CACHE.get(ns);
    if (!bucket) {
        bucket = new Map();
        RV_CACHE.set(ns, bucket);
    }
    bucket.delete(key);
    bucket.set(key, entry);
    while (bucket.size > max) {
        const oldest = bucket.keys().next().value;
        if (oldest === undefined)
            break;
        bucket.delete(oldest);
    }
}
