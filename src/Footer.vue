<script setup lang="ts">
import { cn, SITE_FOOTER, SITE_FOOTER_LINK } from "@viliha/vui-core";

/**
 * The one-line strip every layout closes with.
 *
 * It is where the licence belongs, and a free MIT download has to state that somewhere a reader will
 * actually see. Three of the six layouts took `footer: "none"` on reasoning borrowed from a docs
 * site's prev/next footer that this demo does not render, and the line silently vanished from every
 * page under them (`PD-087`). Every layout closes with it now.
 *
 * `mt-auto` is load-bearing, not decoration: the strip sits inside the shell's `flex flex-col` scroll
 * column, so without it a short page (`/blank`, `/profile`) leaves the licence floating under the
 * last card instead of at the bottom of the viewport. React's footer has always carried it; this one
 * did not, which is the kind of one-class divergence that only a rendered page shows.
 *
 * `noopener` likewise: with `target="_blank"` and no `noopener`, the page we open gets a handle on
 * this one through `window.opener` and can navigate it. That is the reverse-tabnabbing hole, and
 * `noreferrer` alone does not close it in every engine.
 *
 * The name and URL come from the environment because a buyer shipping this template is not Viliha
 * and should not edit a component to say so. Vite's `VITE_*` mirrors React's `NEXT_PUBLIC_*` pair,
 * with the same fallbacks, so an unconfigured demo of either edition reads identically.
 */
const SITE_NAME = import.meta.env.VITE_SITE_NAME ?? "VILIHA";
const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://viliha.com";
</script>

<template>
  <footer :class="cn(SITE_FOOTER, 'mt-auto')">
    <span>
      © 2026
      <a :href="SITE_URL" target="_blank" rel="noopener noreferrer" :class="SITE_FOOTER_LINK">
        {{ SITE_NAME }}
      </a>
      · MIT licensed
    </span>
  </footer>
</template>
