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
      <NavIcon name="arrow-left" class="size-4" />
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
        </span>
        {{ verb }} with {{ provider.label }}
      </button>
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
