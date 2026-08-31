<script setup lang="ts">
import { PROFILE_FIELD_LABEL } from "@viliha/vui-core";

/**
 * One read-only field: a 14px label at weight 500 over a 15px semibold value.
 *
 * Measured off the reference's screenshots. A 12px label at weight 400 over a `font-medium` value
 * reads as a caption above a caption rather than a label over an answer.
 */
defineProps<{ label: string; value: string; full?: boolean }>();
</script>

<template>
  <div :class="full ? 'lg:col-span-2' : undefined">
    <p :class="PROFILE_FIELD_LABEL">{{ label }}</p>
    <p class="text-[15px] font-semibold">{{ value || "Not set" }}</p>
  </div>
</template>
