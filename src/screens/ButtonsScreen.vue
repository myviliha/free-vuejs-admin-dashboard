<script setup lang="ts">
import { BUTTON_SIZES } from "@viliha/vui-core";
import { Button } from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";
import VariantRow from "../VariantRow.vue";

/**
 * Every variant and every size, read off the component.
 *
 * Six cards where the reference has eight, covering more: theirs enumerates two variants times three
 * icon positions as a card each, which is six cards saying the same thing twice about a two-variant
 * button. Ours has seven variants and four sizes, so grouping by question rather than by pair gets all
 * of it into six and each card answers one thing.
 */
/** `icon` is a shape rather than a scale, so it belongs in its own card and not the size row. */
const SIZES = (Object.keys(BUTTON_SIZES) as (keyof typeof BUTTON_SIZES)[]).filter(
  (size) => size !== "icon",
);
const label = (key: string) => `${key[0]?.toUpperCase()}${key.slice(1)}`;


</script>

<template>
  <PageHeader title="Buttons" />

  <!--
    **The card order is the reference's**, not a loop's convenience. This screen ran its `ROWS` loop
    first and put Sizes and Icon Only after it, so the same six cards appeared in a different order:
    Variants, Left Icon, Right Icon, Disabled, Sizes, Icon Only against the reference's Variants,
    Sizes, Left Icon, Right Icon, Icon Only, Disabled. Every card was present, so the copy comparison
    passed on set membership and saw nothing; the layout comparison is what caught it (`PD-126`).

    So the loop is split around the cards that interrupt it. Four `v-for` rows would read more neatly
    and would be a different page.
  -->
  <Demo title="Variants" description="Seven tones, read from the component's own table.">
    <VariantRow />
  </Demo>

  <Demo
    title="Sizes"
    description="Three scales. `lg` matches an input's height exactly, so a submit button never sits a few pixels short of the field above it."
  >
    <div class="flex flex-wrap items-center gap-4">
      <Button v-for="size in SIZES" :key="size" variant="primary" :size="size">
        {{ label(size) }}
      </Button>
    </div>
  </Demo>

  <Demo title="With a Left Icon"><VariantRow icon="start" /></Demo>
  <Demo title="With a Right Icon"><VariantRow icon="end" /></Demo>

  <Demo
    title="Icon Only"
    description="A square button for a toolbar. It still needs a name, so the label is `aria-label` rather than nothing."
  >
    <div class="flex flex-wrap items-center gap-4">
      <Button
        v-for="variant in (['primary', 'default', 'outline', 'ghost', 'destructive'] as const)"
        :key="variant"
        :variant="variant"
        size="icon"
        :aria-label="`Add, ${variant}`"
      >
        <NavIcon name="plus" class="size-4" />
      </Button>
    </div>
  </Demo>

  <Demo
    title="Disabled"
    description="Half opacity and no pointer events, so a disabled button cannot be hovered into looking live."
  >
    <VariantRow disabled />
  </Demo>
</template>
