<script setup lang="ts">
import { to } from "./router";
import NavIcon from "./NavIcon.vue";

/**
 * The chrome both authentication screens share: the back link, the federated buttons, the divider.
 *
 * **The two provider buttons are `disabled`, and that is the honest state.** There is no OAuth behind
 * this demo, so a live-looking button in the most-pressed position on the page would swallow a click and
 * teach a reader that our controls do nothing (`PD-070`).
 *
 * **Monograms, not the providers' marks.** Theirs inlines Google's four-colour glyph and the X logo as
 * SVG paths. Those are other companies' trademarks in a template a buyer redistributes, and the paths
 * are files from their repository, which `SD-006` keeps out of ours. A lettered tile says which provider
 * it is without shipping anyone's logo, and a buyer wiring real OAuth drops their own approved mark in
 * at that point under the terms that come with it.
 */
defineProps<{ verb: string }>();

const PROVIDERS = [
  { id: "google", label: "Google", mark: "G" },
  { id: "x", label: "X", mark: "X" },
] as const;
</script>

<template>
  <div class="mx-auto mb-5 w-full max-w-md sm:pt-10">
    <a
      :href="to('/')"
      class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <!-- React draws this with Radix's ChevronLeft, and the shared icon table has no
           `chevron-left`: it carries `chevron-down`, `chevron-right` and the four arrows. The
           ports therefore reached for `arrow-left`, so the same link read `<- Back to dashboard`
           here and `< Back to dashboard` in React. The path below is the one React renders,
           taken from its own output rather than redrawn. -->
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        aria-hidden="true"
        class="size-4"
      >
        <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />
      </svg>
      Back to dashboard
    </a>
  </div>
  <div class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
    <slot name="heading" />

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
      <button
        v-for="provider in PROVIDERS"
        :key="provider.id"
        type="button"
        disabled
        :title="`No ${provider.label} app is configured in this demo`"
        class="inline-flex cursor-not-allowed items-center justify-center gap-3 rounded-lg bg-muted px-7 py-3 text-sm font-medium text-foreground opacity-60"
      >
        <span
          aria-hidden="true"
          class="grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-[11px] font-semibold text-background"
        >
          {{ provider.mark }}
        </span
        >{{ verb }} with {{ provider.label }}</button
      >
    </div>

    <!-- Their "Or" divider: a rule with the word sitting on it in the page's own background colour. -->
    <div class="relative py-3 sm:py-5">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border" /></div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-background p-2 text-muted-foreground sm:px-5 sm:py-2">Or</span>
      </div>
    </div>

    <slot />
  </div>
</template>
