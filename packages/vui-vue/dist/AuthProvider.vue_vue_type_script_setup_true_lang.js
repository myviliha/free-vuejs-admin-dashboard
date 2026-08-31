import { provideAuth } from "./auth-context.js";
import { defineComponent, renderSlot } from "vue";
//#region src/AuthProvider.vue?vue&type=script&setup=true&lang.ts
/**
* Provides the auth adapter to everything below, the template equivalent of React's
* `<AuthProvider value={adapter}>`. An app that wires this up in a plugin can call `provideAuth`
* directly instead and skip the component.
*/
var AuthProvider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AuthProvider",
	props: { value: {} },
	setup(__props) {
		const props = __props;
		/**
		* **A proxy, not the value.** `provide(AUTH, props.value)` snapshots the adapter, and this repo's own
		* reference adapter is a new object per state change: it starts `{ status: "loading" }` and flips once
		* the session resolves. A snapshot leaves `useAuth()` returning "loading" forever, so a sign-in screen
		* spins and a guard never admits anyone. Reading through to the current prop keeps the contract live
		* while still handing consumers a plain `AuthContract`.
		*/
		provideAuth(new Proxy({}, { get: (_t, key) => props.value[key] }));
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
export { AuthProvider_vue_vue_type_script_setup_true_lang_default as default };

