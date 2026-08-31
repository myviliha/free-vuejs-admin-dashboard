<script setup lang="ts">
import { SHELL_LAYOUTS, cn } from "@viliha/vui-core";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@viliha/vui-vue";

import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";
import { layout, setLayout } from "../use-layout";

/**
 * The shell-layout picker (`PD-065`), and it changes the shell it is rendered inside.
 *
 * Six arrangements of one shell, read from `SHELL_LAYOUTS` rather than listed, so a preset added to the
 * design system appears here with no edit. The choice is remembered under the same storage key the React
 * demo uses, so picking one in either edition and opening the other shows the same shell: the point of
 * this page is comparing arrangements, and having the choice reset between editions would make the
 * comparison harder rather than safer.
 *
 * The thumbnail is a **schematic**, not a screenshot: a sidebar bar and three content columns, with the
 * sidebar's width following the preset's own. A picture would date the moment the shell changed.
 */
</script>

<template>
  <PageHeader title="Layouts" />
  <p class="-mt-4 mb-6 max-w-2xl text-sm text-muted-foreground">
    Six arrangements of the same shell. The choice is remembered, and every page in the demo uses it, so
    pick one and keep reading.
  </p>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!--
      `Card` and its parts, not a hand-rolled `rounded-2xl border bg-card p-6`.

      This screen wrote its own card, which looked right and was not: `CardTitle` renders an `h3` and
      the hand-rolled version wrote an `h2`, so six headings in the document outline sat a level above
      the reference's. `check:parity` reported it as seven cards against one, which is the point of
      counting `data-slot` rather than eyeballing a screenshot (`PD-107` for the third time).
    -->
    <Card
      v-for="preset in SHELL_LAYOUTS"
      :key="preset.id"
      :class="
        cn(
          'cursor-pointer transition-shadow hover:shadow-md',
          preset.id === layout.id && 'ring-2 ring-primary',
        )
      "
    >
      <CardHeader class="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle class="text-lg font-bold">{{ preset.label }}</CardTitle>
          <CardDescription class="mt-1 text-sm">{{ preset.hint }}</CardDescription>
        </div>
        <Badge v-if="preset.id === layout.id" variant="success" class="shrink-0 rounded-full">
          <NavIcon name="check" />
          In use
        </Badge>
      </CardHeader>
      <CardContent>
        <!-- The schematic. `aria-hidden`, because the label and the hint above already say what it is
             and a screen reader reading five empty boxes says nothing. -->
        <div
          aria-hidden="true"
          class="flex h-28 gap-1.5 overflow-hidden rounded-lg border border-border bg-muted/40 p-1.5"
        >
          <div
            class="shrink-0 rounded bg-card p-1.5"
            :style="{ width: `${Math.round(preset.width / 4)}px` }"
          >
            <div class="mb-2 h-2 rounded bg-primary/40" />
            <div v-for="n in 4" :key="n" class="mb-1.5 h-1.5 rounded bg-muted-foreground/20" />
          </div>
          <div class="flex flex-1 gap-1.5">
            <div v-for="n in 3" :key="n" class="flex-1 rounded bg-card" />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          class="mt-4 w-full"
          :disabled="preset.id === layout.id"
          @click="setLayout(preset.id)"
        >
          {{ preset.id === layout.id ? "Current layout" : `Use ${preset.label}` }}
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
