import { ref } from "vue";

/**
 * The parts both authentication screens share.
 *
 * The React demo's two forms are one module for the same reason: theirs are the same markup twice over,
 * roughly 200 lines each, with the social buttons, the divider and the field layout written out both
 * times, so a change to the divider lands on one screen and misses the other.
 */

/** Good enough to catch a typo, and not pretending to be RFC 5322. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RULES = {
  email: (value: string) =>
    !EMAIL.test(value.trim()) ? "Enter a valid email address." : undefined,
  /**
   * A minimum length belongs on sign-*up* and not on sign-*in*.
   *
   * Telling somebody a *new* password is too short reveals nothing about any account. The same message
   * on a sign-in form tells an attacker the password they guessed could not have been this one's, which
   * narrows their search for free.
   */
  password: (value: string) => (value.length < 8 ? "Use at least eight characters." : undefined),
  required: (name: string) => (value: string) =>
    value.trim() === "" ? `${name} is required.` : undefined,
};

/**
 * The smallest form state that still validates.
 *
 * Errors appear **on submit**, not on every keystroke, because telling somebody their email is invalid
 * while they are still on the third character is noise. Once a field has an error, editing it clears it,
 * so the correction is acknowledged immediately.
 */
export function useAuth<K extends string>(
  rules: Record<K, (value: string, all: Record<K, string>) => string | undefined>,
) {
  const keys = Object.keys(rules) as K[];
  /**
   * `ref` over a plain object rather than `reactive`.
   *
   * Vue's `Reactive<T>` wrapper does not accept a generic key as an index, so `values[key]` with
   * `K extends string` is a type error inside this function while being perfectly valid at every call
   * site. A ref holding the object keeps the generic intact and costs one `.value`.
   */
  const values = ref(Object.fromEntries(keys.map((k) => [k, ""])) as Record<K, string>);
  const errors = ref({} as Partial<Record<K, string>>);
  const done = ref(false);

  function set(key: K, value: string) {
    values.value = { ...values.value, [key]: value };
    if (errors.value[key]) errors.value = { ...errors.value, [key]: undefined };
  }

  function submit() {
    const found = {} as Partial<Record<K, string>>;
    for (const key of keys) found[key] = rules[key](values.value[key], values.value);
    errors.value = found;
    if (!keys.some((key) => found[key])) done.value = true;
  }

  return { values, errors, set, submit, done };
}
