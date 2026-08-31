<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@viliha/vui-vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@viliha/vui-vue";

import NavIcon from "../NavIcon.vue";

/**
 * A dashboard card: title, optional description, a kebab menu, and the body.
 *
 * The reference's `Panel`, part for part. `CardTitle` sets weight and not size, so both are set here:
 * with neither, the title and the description came out the same size and the card had no hierarchy.
 */
defineProps<{ title: string; description?: string }>();
</script>

<template>
  <Card class="flex flex-col">
    <CardHeader class="flex-row items-start justify-between gap-4 space-y-0">
      <div>
        <CardTitle class="text-lg font-bold">{{ title }}</CardTitle>
        <CardDescription v-if="description" class="mt-1 text-sm">{{ description }}</CardDescription>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <slot name="actions" />
        <DropdownMenu>
          <DropdownMenuTrigger :aria-label="`${title} options`">
            <NavIcon name="dots-vertical" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View more</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col"><slot /></CardContent>
  </Card>
</template>
