<script setup lang="ts">
import { FREE_UPGRADE } from "@viliha/vui-core";
import { Button, Card, CardContent } from "@viliha/vui-vue";

/**
 * The sidebar promo card, the same one React's shell ends with.
 *
 * The copy comes from `FREE_UPGRADE` rather than being typed again: it had drifted already, at
 * `text-sm font-semibold` against React's `font-semibold tracking-tight`, so the two editions drew
 * the heading at different sizes for the same card.
 *
 * **The button is a link.** It was a bare `Button` here, which rendered the one control in the whole
 * shell that says there is a paid tier and then did nothing when pressed. A dead promo is worse than
 * no promo, and this repository has shipped that defect twice already (`PD-093`, `PD-097`).
 *
 * **It points at the product site, not `FREE_UPGRADE.href`.** That constant's default is `/signup`,
 * and the demo's own sign-up screen is a fixture: the one control that says there is a paid tier led
 * to a form that cannot sell anything. `noopener noreferrer` because without `noopener` the page we
 * open gets a handle on this one through `window.opener` and can navigate it.
 */
const UPGRADE_URL = "https://viliha.com";
</script>

<template>
  <Card class="mx-1 mt-6 bg-accent/40 p-0 text-center">
    <CardContent class="p-4">
      <p class="font-semibold tracking-tight">{{ FREE_UPGRADE.heading }}</p>
      <p class="mt-2 text-sm text-muted-foreground">{{ FREE_UPGRADE.body }}</p>
      <a :href="UPGRADE_URL" target="_blank" rel="noopener noreferrer" class="mt-4 block">
        <Button variant="primary" class="w-full">{{ FREE_UPGRADE.cta }}</Button>
      </a>
    </CardContent>
  </Card>
</template>
