/**
 * The users table's shape and its fixed value sets, with **no rows and no state**.
 *
 * Split out of `demo-users-core` in review of `V-2b`, and the reason is worth keeping. That module is in
 * the build's `STATEFUL` set, so it stays out of the barrel and is reached at
 * `@viliha/vui-core/demo-users`: it holds the soft-deleted ids, and a module with state must have one
 * instance rather than one per importer.
 *
 * `USERS_SCREEN` needs these three arrays for its select filters, and `record-screens-core` **is** in the
 * barrel. Importing them from the stateful module therefore dragged it back into the barrel through the
 * side door, so `import { BRANCHES_SCREEN } from "@viliha/vui-core"` evaluated `demo-users-core` and
 * generated all 10,000 rows on every screen that imports any spec. The exclusion said one thing and the
 * import graph did another.
 *
 * Three frozen arrays and two types have no reason to sit behind that wall, so they live here and both
 * sides import them.
 */
export const ROLES = ["Owner", "Admin", "Editor", "Viewer", "Billing"];
export const TEAMS = ["Platform", "Growth", "Design", "Data", "Mobile", "Security"];
export const STATUSES = ["active", "invited", "suspended"];
