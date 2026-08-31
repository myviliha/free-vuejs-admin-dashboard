<script setup lang="ts">
import { to } from "../router";
import { ALERT_VARIANTS } from "@viliha/vui-core";
import { Alert, AlertDescription, AlertTitle } from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";

/**
 * Every alert state, one card each, **derived from the component** rather than listed here.
 *
 * The React demo showed two of four until `PD-066` made `success`, `warning` and `info` tokens: before
 * that, painting them meant a raw palette class in the one file every edition renders from. Reading
 * `ALERT_VARIANTS` is what makes this page unable to understate the component.
 *
 * Five cards where the reference has four, because `default` is a real state here: an alert with no
 * colour, for the notice that is neither good news nor bad.
 */
const STATES = Object.keys(ALERT_VARIANTS) as (keyof typeof ALERT_VARIANTS)[];

const COPY = {
  default: {
    card: "Default Alert",
    icon: "info",
    title: "Scheduled Maintenance",
    body: "The dashboard is read-only between 02:00 and 03:00 UTC on Sunday.",
    link: "Read the notice",
  },
  success: {
    card: "Success Alert",
    icon: "check-circle",
    title: "Payment Received",
    body: "Invoice INV-2043 has been settled in full.",
    link: "View the invoice",
  },
  warning: {
    card: "Warning Alert",
    icon: "alert-triangle",
    title: "Card Expiring Soon",
    body: "The card ending 4242 expires next month. Update it to avoid a failed renewal.",
    link: "Update payment method",
  },
  destructive: {
    card: "Error Alert",
    icon: "alert-triangle",
    title: "Payment Failed",
    body: "The card was declined. Try another payment method to keep the subscription active.",
    link: "Try another card",
  },
  info: {
    card: "Info Alert",
    icon: "info",
    title: "Export Ready",
    body: "Your 12,480 row export finished and is available for the next seven days.",
    link: "Download the export",
  },
} as const;
</script>

<template>
  <PageHeader title="Alerts" />
  <Demo v-for="state in STATES" :key="state" :title="COPY[state].card">
    <div class="space-y-4">
      <Alert :variant="state">
        <NavIcon :name="COPY[state].icon" />
        <AlertTitle>{{ COPY[state].title }}</AlertTitle>
        <AlertDescription>
          {{ COPY[state].body }}
          <!-- Their link sits under the message at `mt-3`, underlined: a secondary action rather than
               a second sentence. -->
          <a :href="to('/basic-tables')" class="mt-3 inline-block font-medium underline underline-offset-2">
            {{ COPY[state].link }}
          </a>
        </AlertDescription>
      </Alert>
      <Alert :variant="state">
        <NavIcon :name="COPY[state].icon" />
        <AlertTitle>{{ COPY[state].title }}</AlertTitle>
        <AlertDescription>{{ COPY[state].body }}</AlertDescription>
      </Alert>
    </div>
  </Demo>
</template>
