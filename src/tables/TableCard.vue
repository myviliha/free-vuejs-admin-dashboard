<script setup lang="ts">
import { DT_FRAME, cn } from "@viliha/vui-core";

/**
 * The frame every table on this page sits in: a titled header, the table, an optional footer.
 *
 * The reference's `TableCard`, part for part. **The table scrolls sideways on its own**, inside the
 * frame, so the header above it stays put instead of sliding out of view with the columns.
 */
defineProps<{ title: string }>();
</script>

<template>
  <div :class="cn(DT_FRAME, 'overflow-hidden')">
    <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <h4 class="text-lg font-semibold text-foreground">{{ title }}</h4>
      <div v-if="$slots.actions" class="flex items-center gap-3"><slot name="actions" /></div>
    </div>
    <div class="relative overflow-x-auto border-t border-border/60">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-border/60 px-5 py-4"><slot name="footer" /></div>
  </div>
</template>
