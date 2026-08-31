/**
 * The three decisions a form footer makes, framework-free.
 *
 * **This was tried in wave 4 and reverted**, because the types these read are declared in `config`, and
 * the attempt invented a structural subset of `FormActionOutcome` rather than reading it. The guess was
 * narrower than the real union and three consumers broke. Now that `config-core.ts` exists, they take
 * the real types and the move is honest.
 *
 * The import carries a `.js` extension because this file ships: `tsc` copies the specifier verbatim
 * into `@viliha/vui-core`'s type surface, and an extensionless relative import is unresolvable for a
 * consumer on `moduleResolution: nodenext`. The generated barrel already writes `.js` for the same
 * reason; this was the first core module with an intra-package import and the first to need it.
 *
 * The icon generic rides along untouched: none of these three looks at an icon, and defaulting it to
 * `unknown` here means an edition's bound type satisfies the parameter without conversion.
 */
import type { BehaviourConfig, FormAction, FormActionOutcome, FormActionsConfig } from "./config-core.js";
/**
 * Apply a host's `actions` config to the shipped list. An array replaces it; a function receives the
 * defaults and returns the list it wants.
 */
export declare function resolveFormActions<T, Icon = unknown>(defaults: FormAction<T, Icon>[], config: FormActionsConfig<T, Icon> | undefined): FormAction<T, Icon>[];
/**
 * What the form does after a successful save: the acting button's `after` if it named one, otherwise
 * `behaviour.closeOnSave`. One helper so the form and the table cannot disagree about it.
 */
export declare function saveOutcome(after: FormActionOutcome | undefined, behaviour: BehaviourConfig | undefined): FormActionOutcome;
/** An action validates first when it says so, and by default when it is primary. */
export declare const actionRequiresValid: <T, Icon = unknown>(action: FormAction<T, Icon>) => boolean;
/**
 * The footer buttons the theme ships: Cancel + Save while editing, Close + Edit while viewing. They are
 * ordinary {@link FormAction}s, which is the point — a host changes them with the same API that builds
 * them, and anything it does not mention keeps working.
 *
 * **The four icons are injected rather than imported**, which is the only reason this could not live
 * here before. Each edition passes its own components, and an edition whose footer takes the icon as a
 * slot passes none: the ids, the labels, the variants and — the part that matters — which action
 * validates and commits are then the same list in both, rather than two lists that agree today.
 */
export declare function defaultFormActions<T, Icon = unknown>({ readOnly, canEdit, icons, }: {
    readOnly: boolean;
    canEdit: boolean;
    icons?: {
        close?: Icon;
        edit?: Icon;
        cancel?: Icon;
        save?: Icon;
    };
}): FormAction<T, Icon>[];
