<script setup lang="ts">
/**
 * One section of the form-elements page: a titled header, a rule, and the fields.
 *
 * **Not the `Card` component.** The reference builds this from plain divs, and the difference is
 * visible: `Card` brings its own padding and gap, and this needs a `px-6 py-5` header over a body at
 * `p-4 sm:p-6`. This edition had wrapped every section in a `Demo` card instead, which is why the
 * component count read eight cards against the reference's one (`PD-134`).
 *
 * The body rule is lighter than the card's own border, which is what stops a card looking like two
 * cards stacked. `border-border/60` is that step in our token.
 */
defineProps<{ title: string; desc?: string }>();
</script>

<template>
  <div class="rounded-2xl border border-border bg-card">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium">{{ title }}</h3>
      <p v-if="desc" class="mt-1 text-sm text-muted-foreground">{{ desc }}</p>
    </div>
    <div class="border-t border-border/60 p-4 sm:p-6">
      <div class="space-y-6"><slot /></div>
    </div>
  </div>
</template>
