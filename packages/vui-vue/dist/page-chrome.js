import { inject, onUnmounted, shallowRef, watchEffect } from "vue";
//#region src/page-chrome.ts
var PAGE_CHROME = Symbol("vui-page-chrome");
function createPageChrome() {
	/**
	* **`shallowRef`, and it is not an optimisation.** A `ref` deep-wraps the object it holds, so
	* `page.value` comes back as a reactive proxy and is never identity-equal to the meta that was set.
	* `usePageTitle`'s unmount guard compares exactly that, and with a deep ref it silently never matched,
	* so the title was cleared unconditionally again. The meta is two fields and is replaced rather than
	* mutated, so there is nothing for deep reactivity to do.
	*/
	const page = shallowRef(null);
	return {
		page,
		setPage: (next) => {
			page.value = next;
		}
	};
}
/**
* Read the current page chrome. Returns an inert context when there is no provider above, so a top bar
* used alone renders rather than throwing. React's `usePageChrome` does the same with a default context
* value.
*/
var usePageChrome = () => inject(PAGE_CHROME, {
	page: shallowRef(null),
	setPage: () => {}
});
/**
* Register this page's title and icon into the shell, and **clear it on unmount**.
*
* The clearing is the reason the composable exists rather than a prop: without it the previous page's
* title survives into the next screen, which reads as a routing bug and is the failure a user actually
* sees. React keys its effect on the title; `watchEffect` tracks both arguments here, which is a small
* improvement rather than a divergence, since React's own version carries an eslint suppression for
* exactly that.
*/
function usePageTitle(title, icon) {
	const { page, setPage } = usePageChrome();
	let mine = null;
	watchEffect(() => {
		mine = {
			title: title(),
			icon: icon?.()
		};
		setPage(mine);
	});
	/**
	* **Only clear if this page is still the registered one.** Under a transition the incoming page
	* registers before the outgoing one unmounts, so an unconditional clear blanked the bar while the new
	* page was on screen and nothing re-registered. React is safe structurally, not by luck: it destroys
	* the old subtree's effects before creating the new one's, in the same commit.
	*/
	onUnmounted(() => {
		if (page.value === mine) setPage(null);
	});
}
//#endregion
export { PAGE_CHROME, createPageChrome, usePageChrome, usePageTitle };

