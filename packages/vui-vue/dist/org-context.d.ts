import type { Organization, SwitchHandler } from "@viliha/vui-core";
import { type InjectionKey, type Ref } from "vue";
/**
 * The organization context.
 *
 * **`Organization` and `SwitchHandler` are shared**, not redeclared, so one list of organizations
 * type-checks against either edition. `resolveCurrentId` and `resolveAddTarget` are shared too, because
 * both fail quietly rather than loudly: one picks which tenant a user is looking at, the other decides
 * whether the create row exists at all.
 */
export interface OrgContext {
    organizations: Ref<Organization[]>;
    current: Ref<Organization | undefined>;
    currentId: Ref<string | undefined>;
    switchTo: (id: string) => void;
    /** The id currently being switched to, so a row can say so. */
    switching: Ref<string | undefined>;
    error: Ref<unknown>;
}
export declare const ORG: InjectionKey<OrgContext>;
/** Returns `null` with no provider, so a switcher renders nothing rather than crashing the sidebar. */
export declare const useOrg: () => OrgContext | null;
export type { Organization, SwitchHandler };
