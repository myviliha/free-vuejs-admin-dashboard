import type { AuthContract } from "@viliha/vui-core";
import { type InjectionKey } from "vue";
/**
 * The auth contract, injected.
 *
 * **The contract itself is shared**, not redeclared: `AuthContract`, `AuthUser`, `Credentials` and
 * `SignUpInput` come from `@viliha/vui-core`, so an adapter written against the React edition
 * type-checks against this one. That is the whole point of the family, whose own docs tell a host to
 * "pass an adapter that implements AuthContract"; two declarations would quietly make two contracts.
 */
export declare const AUTH: InjectionKey<AuthContract>;
/** Provide an adapter, for an app that wires this up in a plugin or a setup function. */
export declare const provideAuth: (contract: AuthContract) => void;
/**
 * Read the auth contract.
 *
 * **Throws when there is no provider above it**, with the same message React's `useAuth` throws and
 * the same docs path, because a missing adapter should fail loudly at dev time rather than silently
 * no-op. `useThemeConfig` returns null and `usePageChrome` returns a default; those three behaviours
 * differ on purpose and a translation that flattened them would be wrong in a way no type catches.
 */
export declare function useAuth(): AuthContract;
