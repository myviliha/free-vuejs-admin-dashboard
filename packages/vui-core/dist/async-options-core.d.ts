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
/** The shape every picker option has. Extra fields (id, parentId, …) ride along. */
export interface AsyncOptionBase {
    value: string;
    label: string;
}
/** An option, plus any extra fields your source carries. */
export type AsyncOption = AsyncOptionBase & Record<string, unknown>;
/** One or many values, normalised to a list with the empties dropped. */
export declare const asValues: (v: string | string[] | undefined) => string[];
export declare function share(fn: object, key: string, run: () => Promise<AsyncOption[]>): Promise<AsyncOption[]>;
/**
 * Collect the ids asked for in one tick and resolve them in a single call. A fifty-row table paints
 * its cells in one commit, so every `Department` id on the page is requested together instead of one
 * request per cell. Returns only the options this caller asked for.
 */
export declare function batch(resolveOptions: (values: string[]) => Promise<AsyncOption[]>, ids: string[]): Promise<AsyncOption[]>;
/**
 * What the control renders: the active search results, or the cached full list, with any resolved
 * set-value option put in front so a chosen value keeps its label even when it is not on this page.
 */
export declare function mergeOptions(args: {
    search: string;
    results: AsyncOption[] | null;
    base: AsyncOption[];
    resolved: Record<string, AsyncOption>;
}): AsyncOption[];
