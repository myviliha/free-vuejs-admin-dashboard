<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    compact?: boolean;
    version?: boolean;
    /**
     * Sit the mark on a plate, for a **brand-coloured ground**.
     *
     * The logo is an app icon whose own tile is a blue very close to `--brand`, so on the
     * authentication panel it all but vanished and the white glyph floated: legible, and reading as a
     * smudge rather than a logo. `bg-card` means the plate follows the theme instead of being a
     * hardcoded white.
     */
    onBrand?: boolean;
  }>(),
  { compact: false, version: false, onBrand: false },
);
</script>

<template>
  <span class="flex items-center gap-3">
    <!-- The supplied logo, at its own intrinsic size with the render size in CSS. It carries its own
         corner radius and a transparent margin outside it, so a second radius here would clip inside
         the first. -->
    <img src="/images/logo.png" alt="" width="512" height="512" :class="props.onBrand ? 'size-11 shrink-0 rounded-xl bg-card p-1' : 'size-9 shrink-0'" />
    <template v-if="!compact">
      <span v-if="version" class="flex min-w-0 flex-1 items-center gap-2">
        <span class="min-w-0">
          <span class="block truncate text-base font-bold tracking-tight">VuiAdmin Docs</span>
          <span class="block text-xs text-muted-foreground">v0.1.0-free</span>
        </span>
      </span>
      <span v-else class="text-xl font-bold tracking-tight">VuiAdmin</span>
    </template>
  </span>
</template>
