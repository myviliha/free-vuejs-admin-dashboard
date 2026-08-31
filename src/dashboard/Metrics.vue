<script setup lang="ts">
import { DASHBOARD_METRICS } from "@viliha/vui-core";
import { Badge, Card, CardContent } from "@viliha/vui-vue";

import NavIcon from "../NavIcon.vue";

/**
 * The two headline figures.
 *
 * **Two, not four.** This edition had invented a Revenue and a Growth card, so the dashboard claimed
 * numbers the reference never showed (`PD-127`). The rows come from `DASHBOARD_METRICS`.
 *
 * The arrow carries the direction and the colour reinforces it, rather than the colour carrying it
 * alone: red and green are the two most common forms of colour blindness.
 */
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    <Card v-for="metric in DASHBOARD_METRICS" :key="metric.label">
      <CardContent class="p-5 md:p-6">
        <span class="grid size-12 place-items-center rounded-xl bg-accent">
          <NavIcon :name="metric.icon" class="size-6 text-foreground/80" />
        </span>
        <div class="mt-5 flex items-end justify-between gap-2">
          <div>
            <p class="text-sm text-muted-foreground">{{ metric.label }}</p>
            <!-- Measured: `text-title-sm font-bold`, 30px on a 38px line. `text-2xl` is 24px, and the
                 headline figure is the one number on the card. -->
            <h4 class="mt-2 text-[30px] leading-[38px] font-bold tracking-tight tabular-nums">
              {{ metric.value }}
            </h4>
          </div>
          <Badge :variant="metric.up ? 'success' : 'destructive'" class="rounded-full">
            <NavIcon :name="metric.up ? 'arrow-up' : 'arrow-down'" />
            {{ metric.delta }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
