<script setup lang="ts">
import { PROFILE_PILL } from "@viliha/vui-core";

import NavIcon from "../NavIcon.vue";

withDefaults(defineProps<{ label?: string }>(), { label: "Edit" });
defineEmits<{ click: [] }>();
</script>

<template>
  <button type="button" :class="PROFILE_PILL" @click="$emit('click')">
    <NavIcon name="pencil" class="size-4" />
    {{ label }}
  </button>
</template>
