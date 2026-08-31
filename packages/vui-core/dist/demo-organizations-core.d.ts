import { type DemoOrganization } from "./demo-data-core.js";
export type { DemoOrganization };
/** What changed since `cursor` (0 = everything). Real API:
 *  `GET /organizations?since=cursor`. Returns only the touched rows + the ids
 *  of any deletions, so a kept-alive tab revalidates cheaply instead of
 *  re-pulling the full list. Merge the result by `id` in the controller. */
export type OrganizationsDelta = {
    changed: DemoOrganization[];
    deletedIds: number[];
    cursor: number;
};
export declare function syncOrganizations(since: number, signal?: AbortSignal): Promise<OrganizationsDelta>;
/** Fetch the full list. Async on purpose — this is the real-API seam. */
export declare function listOrganizations(signal?: AbortSignal): Promise<DemoOrganization[]>;
/** Subscribe to writes so open routes (list, /new, /edit) stay in sync. */
export declare function subscribeOrganizations(listener: () => void): () => void;
/** Current snapshot — for `useSyncExternalStore` / optimistic reads. */
export declare const snapshotOrganizations: () => DemoOrganization[];
/** Latest revision, to seed a controller's delta cursor after its full load so
 *  the first `syncOrganizations` is a real delta, not a re-pull of everything.
 *  A real API returns this alongside the list (`{ rows, cursor }`). */
export declare const organizationsCursor: () => number;
/** Read one record. Sync in-memory read for the demo; a real edit page would
 *  `await fetchOrganization(id)`. */
export declare const getOrganization: (id: number) => DemoOrganization | null;
export declare function replaceOrganizations(next: DemoOrganization[]): void;
export declare function addOrganization(row: DemoOrganization): void;
export declare function updateOrganization(row: DemoOrganization): void;
