<script setup lang="ts">
import { Badge } from "@viliha/vui-vue";

/** The five statuses these tables use, each on its state token. */
const TONE = {
  Complete: "success",
  Success: "success",
  Pending: "warning",
  Failed: "destructive",
  Cancel: "destructive",
} as const;

defineProps<{ status: keyof typeof TONE }>();
</script>

<template>
  <Badge :variant="TONE[status]">{{ status }}</Badge>
</template>
