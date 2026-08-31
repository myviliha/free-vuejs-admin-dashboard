import { type InjectionKey, type Ref } from "vue";
/**
 * Page chrome: the app shell's title bar contract.
 *
 * **`PageMeta`'s icon is a framework value**, so this edition declares its own rather than sharing a
 * type that would have to be generic for one field. Everything else about the contract matches React's:
 * a provider near the root, a composable for the top bar to read it, and one for a page to register
 * itself.
 */
export interface PageMeta<Icon = unknown> {
    title: string;
    icon?: Icon;
}
export interface PageChromeContext {
    /** The current page's title and icon, registered by the active view. */
    page: Ref<PageMeta | null>;
    setPage: (page: PageMeta | null) => void;
}
export declare const PAGE_CHROME: InjectionKey<PageChromeContext>;
export declare function createPageChrome(): PageChromeContext;
/**
 * Read the current page chrome. Returns an inert context when there is no provider above, so a top bar
 * used alone renders rather than throwing. React's `usePageChrome` does the same with a default context
 * value.
 */
export declare const usePageChrome: () => PageChromeContext;
/**
 * Register this page's title and icon into the shell, and **clear it on unmount**.
 *
 * The clearing is the reason the composable exists rather than a prop: without it the previous page's
 * title survives into the next screen, which reads as a routing bug and is the failure a user actually
 * sees. React keys its effect on the title; `watchEffect` tracks both arguments here, which is a small
 * improvement rather than a divergence, since React's own version carries an eslint suppression for
 * exactly that.
 */
export declare function usePageTitle<Icon = unknown>(title: () => string, icon?: () => Icon | undefined): void;
