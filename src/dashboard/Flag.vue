<script setup lang="ts">
/**
 * A country flag, drawn rather than shipped.
 *
 * The reference draws these as rectangles for the reason `SD-006` gives: a flag image from their
 * repository is their file, and a redistributable download carries whatever comes with it. Two
 * rectangles and a canton is the whole United States flag at 32 pixels.
 */
defineProps<{ name: "usa" | "france"; class?: string }>();
</script>

<template>
  <svg viewBox="0 0 20 20" :class="$props.class" aria-hidden="true">
    <template v-if="name === 'usa'">
      <rect width="20" height="20" fill="#b22234" />
      <rect v-for="row in [1, 3, 5, 7, 9]" :key="row" :y="row * 2" width="20" height="2" fill="#fff" />
      <rect width="10" height="10" fill="#3c3b6e" />
    </template>
    <template v-else>
      <rect width="6.67" height="20" fill="#002395" />
      <rect x="6.67" width="6.67" height="20" fill="#fff" />
      <rect x="13.34" width="6.67" height="20" fill="#ed2939" />
    </template>
  </svg>
</template>
