<script setup lang="ts">
import { Input } from "@viliha/vui-vue";

import NavIcon from "../NavIcon.vue";

/** The search field in a table's header. A real `Input` with the magnifier inside it. */
const model = defineModel<string>({ default: "" });
defineProps<{ label: string }>();
</script>

<template>
  <div class="relative w-full sm:w-64">
    <NavIcon
      name="search"
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
    />
    <Input v-model="model" type="search" :aria-label="label" placeholder="Search..." class="pl-10" />
  </div>
</template>
