<script setup lang="ts">
import { DEMO_TINTS, cn, initialsOf } from "@viliha/vui-core";
import { Avatar, AvatarFallback } from "@viliha/vui-vue";

/** A tinted initials circle, cycling the five state tints by row index. */
defineProps<{ name: string; index: number; size: string }>();
</script>

<template>
  <Avatar :class="cn(size, 'shrink-0')">
    <AvatarFallback :class="cn(DEMO_TINTS[index % DEMO_TINTS.length], 'text-xs font-medium')">
      {{ initialsOf(name, 2) }}
    </AvatarFallback>
  </Avatar>
</template>
