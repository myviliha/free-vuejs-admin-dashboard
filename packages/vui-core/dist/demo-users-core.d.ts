import type { User } from "./demo-user-options-core.js";
import type { ServerQuery } from "./record-field-core.js";
export type { User, UserStatus } from "./demo-user-options-core.js";
export { ROLES, STATUSES, TEAMS } from "./demo-user-options-core.js";
/** Restore soft-deleted users (RecordView's `onRestore`). Refetch shows them
 *  back in Live and gone from Trash. */
export declare function restoreUsers(ids: (number | string)[]): void;
/**
 * Fetch one page. Filters + sorts + paginates server-side and returns just that
 * page plus the true total. `pageSize` is clamped to MAX_PAGE_SIZE — the client
 * can't pull a bigger page than allowed. `q.trash` returns soft-deleted users
 * instead of live ones.
 */
export declare function listUsers(q: ServerQuery<User>, signal: AbortSignal): Promise<{
    rows: User[];
    total: number;
}>;
