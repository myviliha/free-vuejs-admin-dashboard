<script setup lang="ts">
import { to } from "./router";
import ThemeToggle from "./ThemeToggle.vue";

import Brand from "./Brand.vue";
import GridShape from "./GridShape.vue";
</script>

<template>
  <!--
    The authentication shell: form on the left, a branded panel on the right.

    **A split screen, as the reference has, and for the reason it has one.** A centred card on an empty
    page is the default every starter ships and says nothing about the product a visitor is signing in
    to. Their right-hand panel carries the mark and one line of positioning, and is hidden below `lg` so
    a phone gets the form and nothing else.

    **The panel is `bg-primary` rather than a fixed navy.** Theirs is a colour that exists only in their
    palette; ours is the token, so a buyer who rethemes gets an authentication screen in their own brand.

    No sidebar and no header on either side: a screen offering navigation to someone who has not signed
    in is offering a way around itself.
  -->
  <div class="relative flex min-h-dvh flex-col lg:flex-row">
    <div class="flex flex-1 flex-col p-6 lg:w-1/2"><slot /></div>

    <aside
      class="relative hidden overflow-hidden bg-primary text-primary-foreground lg:grid lg:w-1/2 lg:place-items-center"
    >
      <GridShape
        id="auth-top"
        class="pointer-events-none absolute top-0 right-0 w-full max-w-[450px] text-primary-foreground/20"
      />
      <GridShape
        id="auth-bottom"
        class="pointer-events-none absolute bottom-0 left-0 w-full max-w-[450px] rotate-180 text-primary-foreground/20"
      />
      <div class="relative flex max-w-xs flex-col items-center gap-4 text-center">
        <a :href="to('/')"><Brand on-brand /></a>
        <p class="text-sm text-primary-foreground/70">
          The free and open-source admin dashboard built on one design system, MIT licensed.
        </p>
      </div>
    </aside>

    <!-- The reference pins a theme switch to the bottom-right of this screen, and it is right to: the
         sidebar's toggle is not on the page, so without this the only way to see the dark treatment of
         an auth screen is to sign in first. -->
    <div class="fixed right-6 bottom-6 z-50 hidden sm:block">
      <ThemeToggle />
    </div>
  </div>
</template>
