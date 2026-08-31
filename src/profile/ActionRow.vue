<script setup lang="ts">
/** A Security or Danger Zone row: a title, a line of explanation, and one action. */
defineProps<{ title: string; description: string }>();
</script>

<template>
  <div
    class="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <p class="font-semibold">{{ title }}</p>
      <p class="mt-0.5 text-sm text-muted-foreground">{{ description }}</p>
    </div>
    <div class="shrink-0"><slot /></div>
  </div>
</template>
