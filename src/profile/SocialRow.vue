<script setup lang="ts">
import { DEMO_SOCIALS, PROFILE_FIELD_LABEL } from "@viliha/vui-core";

/**
 * The four marks, each in a bordered circle.
 *
 * `h-11 w-11 rounded-full border` is the same chrome the header controls wear, so the row reads as a
 * set of controls rather than four loose glyphs at four sizes.
 *
 * **Not links.** A demo pointing at a real account sends a reader somewhere it did not mean to.
 */
</script>

<template>
  <div>
    <p :class="PROFILE_FIELD_LABEL">Social Links</p>
    <div class="flex items-center gap-2">
      <span
        v-for="social in DEMO_SOCIALS"
        :key="social.name"
        :title="social.name"
        class="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground/75"
      >
        <!-- A height and no width: the box is per mark, so equal heights is what makes them match,
             and forcing equal widths would squash the narrow ones. -->
        <svg :viewBox="social.box" height="17" fill="currentColor" aria-hidden="true" class="w-auto">
          <path :d="social.path" />
        </svg>
        <span class="sr-only">{{ social.name }}</span>
      </span>
    </div>
  </div>
</template>
