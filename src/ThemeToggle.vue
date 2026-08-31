<script setup lang="ts">
import { HEADER_CONTROL } from "@viliha/vui-core";
import { onMounted, ref } from "vue";

import NavIcon from "./NavIcon.vue";

/**
 * The light and dark switch, its own component because two screens need it.
 *
 * It lived inline in `Header.vue`, so the authentication screens, which have no header, had **no way
 * to see their own dark treatment without signing in first**. React extracts it for exactly that
 * reason and pins one to the corner of the auth layout; `check:parity` found the missing control as a
 * button count of five against four (`PD-121`).
 */
const dark = ref(false);

/**
 * Read from the document, not assumed.
 *
 * A toggle that starts at "light" on a page already rendered dark shows the wrong icon until someone
 * clicks it.
 */
onMounted(() => {
  dark.value = document.documentElement.classList.contains("dark");
});

function toggle() {
  dark.value = !dark.value;
  document.documentElement.classList.toggle("dark", dark.value);
}
</script>

<template>
  <button
    type="button"
    :class="HEADER_CONTROL"
    :aria-pressed="dark"
    :aria-label="dark ? 'Switch to the light theme' : 'Switch to the dark theme'"
    data-vui-theme=""
    @click="toggle"
  >
    <!--
      20px, as the reference's are: the set's default 15 looked lost in a 44px circle.

      **Both icons render and CSS picks**, matching the reference. Choosing in script froze the static
      HTML export on whichever was right at build time, so that demo showed a moon while in dark mode
      (`PD-143`).
    -->
    <NavIcon name="moon" class="size-5 dark:hidden" />
    <NavIcon name="sun" class="hidden size-5 dark:block" />
  </button>
</template>
