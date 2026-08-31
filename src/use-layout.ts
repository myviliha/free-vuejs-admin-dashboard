import { DEFAULT_LAYOUT, layoutById, type ShellLayout } from "@viliha/vui-core";
import { computed, ref } from "vue";

const KEY = "vui.shell-layout";

/**
 * The chosen shell layout, remembered.
 *
 * **The same key as the React demo's, deliberately.** Both read `vui.shell-layout`, so a reader who
 * picks "Icon rail" in one edition and opens the other on the same host sees the same shell. The point
 * of `/layouts` is comparing arrangements, and having the choice reset between editions would make the
 * comparison harder rather than safer.
 *
 * A module-scope `ref` rather than a provide/inject pair: this is one value for the whole app and every
 * consumer wants the same instance, which is what a module-level ref already is. Injection would add a
 * provider to wire and a key to agree on for no behaviour.
 *
 * **Read after mount, not at module evaluation.** `localStorage` exists in a browser and not in the
 * happy-dom used by the tests until it is set up, and reading it eagerly makes importing this module a
 * side effect. `hydrate()` is called once by the shell.
 */
const id = ref(DEFAULT_LAYOUT);

export const layout = computed<ShellLayout>(() => layoutById(id.value));

export function hydrate() {
  const stored = globalThis.localStorage?.getItem(KEY);
  if (stored) id.value = layoutById(stored).id;
}

export function setLayout(next: string) {
  id.value = layoutById(next).id;
  globalThis.localStorage?.setItem(KEY, id.value);
}
