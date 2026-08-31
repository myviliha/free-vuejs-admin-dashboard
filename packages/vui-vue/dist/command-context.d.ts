import { type InjectionKey, type Ref } from "vue";
/**
 * The filtering `Command` does itself, because its primitive does not.
 *
 * **This is the gap a review found.** React's `command.tsx` wraps `cmdk`, which filters the list as
 * you type and hides its `Empty` until nothing matches. Reka's `Listbox` keeps a filter term and
 * highlights the first item, and does **no text filtering at all**, so the Vue family narrowed nothing
 * and its empty message sat permanently above a full list. The port's own comment claimed the
 * behaviour came from the primitive in both cases, and for this one it does not.
 *
 * So the term is provided here, each item decides whether it matches, and the count tells the empty
 * state and the groups whether to render. Matching is on the item's `value` plus any `keywords`, which
 * is what `cmdk` matches on.
 */
export interface CommandContext {
    search: Ref<string>;
    /** True when a part is used outside a `Command`, so it renders rather than waiting for a count. */
    standalone: boolean;
    /** How many items currently match, so `CommandEmpty` and a group know whether to render. */
    visible: Ref<number>;
    /** An item reports itself in and out as the term changes. */
    report: (id: string, matched: boolean) => void;
    matches: (haystack: string) => boolean;
}
export declare const COMMAND: InjectionKey<CommandContext>;
export declare function createCommandContext(): CommandContext;
/** Falls back to a context that matches everything, so a part used alone still renders. */
export declare const useCommand: () => CommandContext;
