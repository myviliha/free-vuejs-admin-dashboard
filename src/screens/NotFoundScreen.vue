<script setup lang="ts">
import { to } from "../router";
import { Button } from "@viliha/vui-vue";

import GridShape from "../GridShape.vue";
import NotFoundMark from "../NotFoundMark.vue";

/**
 * The not-found screen, and it renders **outside the shell**.
 *
 * `/error-404` is a real address in the sidebar, because a buyer wants to look at the screen without
 * breaking a link to see it, and the router falls here for anything it cannot answer. They are the same
 * screen, so they are the same file: two copies of an error page is how one of them ends up saying
 * something the other does not.
 *
 * Full width, which is what the reference does and is the honest shape. A 404 wrapped in working
 * navigation implies the navigation is trustworthy on a page that just failed to resolve an address.
 */
</script>

<template>
  <main
    class="relative z-10 flex min-h-dvh flex-col items-center justify-center overflow-hidden p-6"
  >
    <GridShape
      id="err-top"
      class="pointer-events-none absolute top-0 right-0 -z-10 w-full max-w-[250px] text-primary/40 xl:max-w-[450px]"
    />
    <GridShape
      id="err-bottom"
      class="pointer-events-none absolute bottom-0 left-0 -z-10 w-full max-w-[250px] rotate-180 text-primary/40 xl:max-w-[450px]"
    />

    <div class="mx-auto w-full max-w-[472px] text-center">
      <p class="mb-6 text-sm font-semibold tracking-[0.3em] text-muted-foreground uppercase">
        Error
      </p>
      <NotFoundMark class="mx-auto w-full max-w-[472px] text-primary" />
      <h1 class="mt-8 text-lg font-semibold sm:text-xl">
        We cannot seem to find the page you are looking for
      </h1>
      <p class="mt-3 text-sm text-muted-foreground">
        The address may be mistyped, or the page may have moved.
      </p>
      <a :href="to('/')" class="mt-8 inline-block"><Button size="lg">Back to Home Page</Button></a>
    </div>
  </main>
</template>
