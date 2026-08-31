<script setup lang="ts">
import { cn } from "@viliha/vui-core";
import { Label } from "@viliha/vui-vue";
import { computed } from "vue";

/**
 * A label over a control inside a dialog, with a required mark and one message beneath.
 *
 * The message renders only when there is something to say. Reserving a blank line under every field
 * would keep the form from jumping on a failed submit, but it also adds four rows of height the
 * reference does not have, and the rhythm is the thing being matched. The shift happens once, after a
 * submit that was going to be corrected anyway.
 */
const props = defineProps<{
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
}>();

const messageId = computed(() => `${props.htmlFor}-message`);
const message = computed(() => props.error ?? props.hint);
</script>

<template>
  <div>
    <Label :for="htmlFor" class="mb-1.5 block text-sm font-medium">
      {{ label }}
      <span v-if="required" aria-hidden="true" class="ml-0.5 text-destructive">*</span>
    </Label>
    <slot :message-id="message ? messageId : undefined" :invalid="Boolean(error)" />
    <p
      v-if="message"
      :id="messageId"
      :class="cn('mt-1.5 text-xs', error ? 'text-destructive' : 'text-muted-foreground')"
    >
      {{ message }}
    </p>
  </div>
</template>
