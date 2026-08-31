<script setup lang="ts">
import { DEMO_ICON_PATHS, DEMO_ICON_VIEWBOX } from "@viliha/vui-core";
import { computed } from "vue";

/**
 * A navigation icon, drawn from the shared markup table.
 *
 * The React demo draws these with `@radix-ui/react-icons`, which is React components and cannot cross
 * the boundary. `demo-icon-paths.ts` carries the same glyphs as markup, **extracted** from that package
 * rather than redrawn, so both demos show the same icon and neither edition takes a dependency the
 * other does not have.
 *
 * **`width` and `height` are on the element, exactly as Radix writes them.** Without them the SVG has
 * no intrinsic size, so an icon with no size class rendered at whatever the flex container squeezed it
 * to: a badge in the layouts picker came out 48px tall against the reference's 27. Two things depend on
 * these attributes. The obvious one is that an unsized icon must be 15px in both editions. The other is
 * `theme.css`, whose icon-chip rule matches `svg[width="15"], .vui-icon` and says in its own comment
 * that "Radix icons get it for free, everyone else opts in with the class": this edition was the
 * everyone else, and never opted in, so a rule the design system applies to React never applied here
 * (`PD-126`). A `size-*` class still wins, because a class beats a presentation attribute.
 *
 * `v-html` is safe here and nowhere near user input: the value comes from a generated table of static
 * SVG children committed in the design system. It is the reason this component exists rather than a
 * `<path :d>`, since several icons are two paths or a mix of shapes.
 */
const props = defineProps<{ name: string; class?: string }>();

const inner = computed(() => DEMO_ICON_PATHS[props.name] ?? "");
</script>

<template>
  <svg
    width="15"
    height="15"
    :viewBox="DEMO_ICON_VIEWBOX"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    :class="props.class"
    v-html="inner"
  />
</template>
