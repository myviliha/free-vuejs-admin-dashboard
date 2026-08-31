<script setup lang="ts">
import { cn } from "@viliha/vui-core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@viliha/vui-vue";

/**
 * A titled card around one example, on the reference's `ComponentCard` measurements.
 *
 * `px-6 py-5` header with the title at `text-base font-medium`, then a body at `p-4 sm:p-6` behind a
 * rule **lighter** than the card's own border, which is what stops one card reading as two stacked.
 * `CardHeader` and `CardContent` are `px-5 pb-3 pt-5` and `px-5 pb-5`, so the difference is passed as a
 * class rather than changed in the library: those metrics are every other card in the product.
 *
 * It composes `Card` rather than wearing `CARD`. A demo of a component library that hand-rolls the
 * component it is demonstrating argues against itself.
 */
defineProps<{ title: string; description?: string; class?: string }>();
</script>

<template>
  <Card class="gap-0 p-0">
    <CardHeader class="px-6 py-5 pb-5">
      <CardTitle class="text-base font-medium">{{ title }}</CardTitle>
      <CardDescription v-if="description" class="mt-1 text-sm">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent :class="cn('border-t border-border/60 p-4 sm:p-6', $props.class)">
      <div class="space-y-6"><slot /></div>
    </CardContent>
  </Card>
</template>
