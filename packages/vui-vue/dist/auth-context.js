import { inject, provide } from "vue";
//#region src/auth-context.ts
/**
* The auth contract, injected.
*
* **The contract itself is shared**, not redeclared: `AuthContract`, `AuthUser`, `Credentials` and
* `SignUpInput` come from `@viliha/vui-core`, so an adapter written against the React edition
* type-checks against this one. That is the whole point of the family, whose own docs tell a host to
* "pass an adapter that implements AuthContract"; two declarations would quietly make two contracts.
*/
var AUTH = Symbol("vui-auth");
/** Provide an adapter, for an app that wires this up in a plugin or a setup function. */
var provideAuth = (contract) => provide(AUTH, contract);
/**
* Read the auth contract.
*
* **Throws when there is no provider above it**, with the same message React's `useAuth` throws and
* the same docs path, because a missing adapter should fail loudly at dev time rather than silently
* no-op. `useThemeConfig` returns null and `usePageChrome` returns a default; those three behaviours
* differ on purpose and a translation that flattened them would be wrong in a way no type catches.
*/
function useAuth() {
	const contract = inject(AUTH, null);
	if (!contract) throw new Error("useAuth must be used within an AuthProvider. Wrap your app and pass an adapter that implements AuthContract (see docs /docs/auth).");
	return contract;
}
//#endregion
export { AUTH, provideAuth, useAuth };

