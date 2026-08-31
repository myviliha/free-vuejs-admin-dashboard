/**
 * Walking a cascade, framework-free.
 *
 * A cascading picker is two pure functions over a tree: which options each level offers given the
 * path chosen so far, and what the new path is when one level changes. Both are the kind of logic
 * that drifts silently between editions, because getting "clear everything downstream" subtly wrong
 * looks like a stale option list rather than a broken component.
 */
/** A node in the cascade tree. Top-level nodes feed the first level; `children` feed the next. */
export interface CascadeNode {
    value: string;
    label: string;
    children?: CascadeNode[];
}
/** One named level of the cascade, for example Region, Country, State, City. */
export interface CascadeLevel {
    key: string;
    label: string;
    placeholder?: string;
}
export interface CascadeRow<L> {
    level: L;
    options: {
        value: string;
        label: string;
    }[];
    /** Level 0 is always enabled; a deeper level needs its parent chosen. */
    enabled: boolean;
}
/** One row per level, walked down the currently-selected path. */
export declare function cascadeRows<L extends {
    key: string;
}>(levels: L[], items: CascadeNode[], value: string[]): CascadeRow<L>[];
/**
 * The path after choosing `next` at `levelIndex`, and the node at each step of it.
 *
 * **Keeps upstream, sets this level, drops everything downstream**, which is the whole point of a
 * cascade: a Country change cannot leave a City from the old country selected.
 */
export declare function cascadeSelect(items: CascadeNode[], value: string[], levelIndex: number, next: string): {
    path: string[];
    nodes: CascadeNode[];
};
