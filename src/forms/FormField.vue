<script setup lang="ts">
import { cn } from "@viliha/vui-core";
import { Label } from "@viliha/vui-vue";
import { computed } from "vue";

/** A label over a control, with one line of hint, error or success beneath it. */
const props = defineProps<{
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  success?: string;
}>();

const message = computed(() => props.error ?? props.success ?? props.hint);
</script>

<template>
  <div>
    <Label :for="htmlFor" class="mb-1.5 block text-sm font-medium">{{ label }}</Label>
    <slot />
    <p
      v-if="message"
      :class="
        cn(
          'mt-1.5 text-xs',
          error && 'text-destructive',
          success && 'text-success',
          !error && !success && 'text-muted-foreground',
        )
      "
    >
      {{ message }}
    </p>
  </div>
</template>
