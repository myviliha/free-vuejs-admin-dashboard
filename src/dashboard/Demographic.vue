<script setup lang="ts">
import { DASHBOARD_COUNTRIES } from "@viliha/vui-core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@viliha/vui-vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@viliha/vui-vue";
import { Progress } from "@viliha/vui-vue";

import NavIcon from "../NavIcon.vue";
import Flag from "./Flag.vue";
import WorldMap from "./WorldMap.vue";

/**
 * Customers by country: the map, then a row per country with its share.
 *
 * Not built on `Panel`, because the reference does not build it on its own `Panel` either: this card's
 * title is `font-semibold` where a panel's is `font-bold`, and the body needs `space-y-6` that a panel
 * does not give. Matching the reference means matching that difference too.
 */
</script>

<template>
  <Card>
    <CardHeader class="flex-row items-start justify-between gap-4 space-y-0">
      <div>
        <CardTitle class="text-lg font-semibold">Customers Demographic</CardTitle>
        <CardDescription class="mt-1 text-sm">
          Number of customers based on country
        </CardDescription>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Demographic options">
          <NavIcon name="dots-vertical" class="vui-icon-plain" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View more</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- The reference's panel is `rounded-2xl border bg-gray-50` with the map bled to its edges:
           it pads the panel and then cancels the padding on the map. No padding is the same result
           without the double negative. `--muted` is this theme's `gray-50`. -->
      <div class="overflow-hidden rounded-2xl border border-border bg-muted">
        <WorldMap />
      </div>
      <!-- The rows get their own spacing. On `CardContent` it also spaced the map, so tightening the
           rows pulled the map up with them. -->
      <div class="space-y-5">
        <div v-for="country in DASHBOARD_COUNTRIES" :key="country.name" class="flex items-center gap-3">
          <Flag :name="country.flag" class="size-8 shrink-0" />
          <div class="min-w-0 flex-1">
            <p class="font-semibold">{{ country.name }}</p>
            <p class="text-xs text-muted-foreground tabular-nums">
              {{ country.customers.toLocaleString() }} Customers
            </p>
          </div>
          <div class="flex w-40 shrink-0 items-center gap-3">
            <Progress
              :value="country.share"
              class="flex-1"
              :aria-label="`${country.name} share of customers`"
            />
            <span class="w-10 text-right font-semibold tabular-nums">{{ country.share }}%</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
