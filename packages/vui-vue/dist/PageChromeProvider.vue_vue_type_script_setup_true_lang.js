import { PAGE_CHROME, createPageChrome } from "./page-chrome.js";
import { defineComponent, provide, renderSlot } from "vue";
//#region src/PageChromeProvider.vue?vue&type=script&setup=true&lang.ts
/**
* Shares page chrome across the app shell: the current page's title and icon, so a global top bar can
* show them. Wrap the top bar **and** the page content with this.
*
* **There is no `titleLeading` here, and that is deliberate.** React passes it through the context so a
* top bar can place it inside its header. A slot on this component cannot do that: it would render as
* the provider's own first root node, outside the bar, where no descendant can reach it. So the top bar
* owns its leading content directly, which is what the reference React bar already does.
*/
var PageChromeProvider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PageChromeProvider",
	setup(__props) {
		provide(PAGE_CHROME, createPageChrome());
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
export { PageChromeProvider_vue_vue_type_script_setup_true_lang_default as default };

