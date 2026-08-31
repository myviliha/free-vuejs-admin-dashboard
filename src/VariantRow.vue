<script setup lang="ts">
import { BUTTON_VARIANTS } from "@viliha/vui-core";
import { Button } from "@viliha/vui-vue";

import NavIcon from "./NavIcon.vue";

/**
 * Every variant at `lg`, optionally with an icon on one side, optionally disabled.
 *
 * The reference has the same helper for the same reason: four of the six cards on this page are this
 * row with one thing changed, and writing it out four times is four places for the gap or the size to
 * drift. `disabled` is a prop here where the reference inlines that one card, which is the only
 * difference and it produces identical markup.
 */
defineProps<{ icon?: "start" | "end"; disabled?: boolean }>();

const VARIANTS = Object.keys(BUTTON_VARIANTS) as (keyof typeof BUTTON_VARIANTS)[];
const label = (key: string) => `${key[0]?.toUpperCase()}${key.slice(1)}`;
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button
      v-for="variant in VARIANTS"
      :key="variant"
      :variant="variant"
      size="lg"
      :disabled="disabled"
    >
      <NavIcon v-if="icon === 'start'" name="box" class="size-4" aria-hidden="true" />
      {{ label(variant) }}
      <NavIcon v-if="icon === 'end'" name="box" class="size-4" aria-hidden="true" />
    </Button>
  </div>
</template>
