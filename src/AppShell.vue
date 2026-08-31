<script setup lang="ts">
import {
  ANCHOR_GAP,
  cn,
  FREE_ACTIVE_MARK,
  FREE_FLYOUT_HEADING,
  FREE_FLYOUT_PANEL,
  FREE_NAV_IDLE,
  FREE_NAV_LIST,
  FREE_NAV_ROW,
  FREE_NAV_ROW_CHILD,
  FREE_SUBMENU_LIST,
  FREE_SUBMENU_RULE,
  PAGE_CONTENT,
  PAGE_ROOT,
  PAGE_SCROLL,
  type FreeNavEntry,
} from "@viliha/vui-core";
// The shell cores are reached by subpath, not the barrel: both export `isCurrent` and the two
// disagree on purpose, so a root import would be a coin toss between them (`PD-231`).
import {
  holdsCurrent as holdsCurrentIn,
  initialOpen,
  isCurrent as isCurrentAt,
  isRailShowing,
  sidebarWidth,
  submenuId as submenuIdFor,
  toggleGroup,
} from "@viliha/vui-core/console-shell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from "@viliha/vui-vue";
import { computed, onMounted, ref, watch } from "vue";

import Brand from "./Brand.vue";
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import { NAV } from "./nav";
import NavIcon from "./NavIcon.vue";
import { path, to } from "./router";
import Submenu from "./Submenu.vue";
import UpgradeCard from "./UpgradeCard.vue";
import { hydrate, layout } from "./use-layout";

/**
 * The shell, over the same six layout presets React's renders (`Z-9`, `Z-14`).
 *
 * **Eight fields, one renderer.** `SHELL_LAYOUTS` in `@viliha/vui-core` is the six arrangements as
 * data, so this is not six components: it is one shell reading `brand`, `sidebarSearch`, `navIcons`,
 * `heading`, `expander`, `submenuRule`, `active` and `footer`. `apps/web/free-react/app/shell.tsx` is
 * the reference for what each field does, and every measurement in the classes below came from there
 * rather than from a screenshot of it.
 *
 * The three things worth knowing before changing anything here, all of them defects this shell inherited
 * the fix for rather than rediscovering:
 *
 *   1. **`h-dvh`, not `h-full`.** `height: 100%` is 100% *of the parent*, so one ancestor resolving to
 *      `auto` silently makes the shell content-height and the document scrolls behind it, ending the
 *      page in a band of empty background under the footer.
 *   2. **`rail ||`, not `layout.navIcons` alone.** A rail is icon-only by definition, so the three
 *      documentation layouts, which drop icons from the expanded list on purpose, collapsed to a column
 *      of empty rows with no way back except the control just pressed.
 *   3. **The sidebar is `relative`.** `overflow-y-auto` clips what a descendant *paints* without making
 *      the element a containing block, so an `sr-only` control in the nav resolves against the viewport
 *      and stretches the document (`PD-082`).
 */


const collapsed = ref(false);
const open = ref<string[]>([]);

onMounted(hydrate);

/** The rail nav's own horizontal padding, in pixels: the `px-3` on its `<nav>`, as a number. */
const RAIL_INSET = 12;

/**
 * Every decision below comes from `console-shell-core` (`PD-228`).
 *
 * **This file used to answer them itself**, as did React's shell and Angular's: 876 lines across
 * three editions deciding which group is open, which item is current, whether the rail shows and
 * how wide the sidebar is. The divergence that proves the point was already here: the `watch` below
 * used `.find()` and opened **one** holder, where React's seed used `.filter()` and opened every
 * one. No route in `FREE_NAV` is linked from two groups today, so nobody saw it: the two disagreed
 * by construction and the nav's shape hid it.
 */
const rail = computed(() => isRailShowing(layout.value, collapsed.value));
const width = computed(() => sidebarWidth(layout.value, collapsed.value));

/**
 * Keep the parent of the current route open across navigations.
 *
 * Landing on a child directly, or arriving by the back button, left the parent shut with the child
 * highlighted inside it, so the sidebar showed no selection at all. **Additive on purpose**: it opens
 * the holder and never closes anything, or it would fight the reader every time they opened a second
 * section.
 */
watch(
  path,
  (to) => {
    // `initialOpen` returns EVERY group holding the route, which is what React has always done and
    // what this file's own `.find()` did not.
    const holders = initialOpen(NAV, to).filter((label) => !open.value.includes(label));
    if (holders.length > 0) open.value = [...open.value, ...holders];
  },
  { immediate: true },
);

function toggle(label: string) {
  open.value = [...toggleGroup(open.value, label)];
}

const isCurrent = (href: string) => isCurrentAt(path.value, href);
const holdsCurrent = (entry: FreeNavEntry) => holdsCurrentIn(entry, path.value);

/** The row, whose every measurement is the reference's: `gap-3 rounded-lg px-3 py-2 text-sm font-medium`. */
const row = (entry: FreeNavEntry) =>
  cn(
    FREE_NAV_ROW,
    rail.value && "justify-center px-0",
    holdsCurrent(entry)
      ? FREE_ACTIVE_MARK[layout.value.active]
      : // Their inactive row is a near-body grey, not the muted one: lighter and the whole menu looks
        // disabled.
        FREE_NAV_IDLE,
  );

const childRow = (href: string) =>
  cn(
    FREE_NAV_ROW_CHILD,
    isCurrent(href)
      ? // The active child gets the **same pill as an active parent**, not a bolder weight: on a
        // submenu of one, a weight change is very nearly invisible, so clicking it moved the page and
        // looked like nothing had happened.
        FREE_ACTIVE_MARK[layout.value.active]
      : FREE_NAV_IDLE,
  );

/**
 * A stable id per group, so the button can say what it discloses.
 *
 * A disclosure button should carry `aria-controls` anyway, and it is also the pair `vui.js` keys on:
 * the HTML edition's static export has no framework to toggle a group, so its menus open off these
 * two attributes and nothing else (`PD-143`).
 */
const submenuId = submenuIdFor;
</script>

<template>
  <div class="flex h-dvh">
    <aside
      :style="{ width: `${width}px` }"
      class="relative hidden shrink-0 overflow-y-auto overflow-x-hidden border-r border-border bg-card transition-[width] duration-300 ease-in-out lg:block"
    >
      <div
        :class="
          cn(
            'flex items-center border-b border-border lg:h-[76px]',
            rail ? 'h-16 justify-center px-3' : 'h-16 px-5',
          )
        "
      >
        <Brand :compact="rail" :version="layout.brand === 'wordmark-version'" />
      </div>

      <!-- Layouts three and four put a search inside the sidebar, above the navigation. A rail has
           nowhere to put one, so it is skipped rather than squeezed. -->
      <div v-if="layout.sidebarSearch && !rail" class="relative px-5 pt-5">
        <!-- `Input` and a magnifier, as React's is. Hand-rolled markup here drew a box with no
             magnifier while React drew one with, on the two layouts that show a sidebar search. -->
        <NavIcon
          name="search"
          class="pointer-events-none absolute top-1/2 left-8 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search the docs"
          aria-label="Search the documentation"
          class="h-11 rounded-lg pl-10"
        />
      </div>

      <!-- `pt-5`: the first group heading sat flush against the brand rule and was clipped. -->
      <nav :class="cn('pt-5 pb-6', rail ? 'px-3' : 'px-5')">
        <div v-for="group in NAV" :key="group.heading || 'first'" class="mb-4">
          <!-- An empty heading renders nothing at all, rather than an empty paragraph holding its own
               margin open. -->
          <p
            v-if="group.heading && layout.heading !== 'none'"
            :class="
              cn(
                'mb-4 px-3 leading-5 text-muted-foreground/70',
                layout.heading === 'uppercase' ? 'text-xs uppercase' : 'text-sm',
                rail && 'text-center',
              )
            "
          >
            {{ rail ? "···" : group.heading }}
          </p>

          <!-- **16px between rows.** Two pixels was the single biggest reason the React sidebar read as
               a different product from the reference: theirs breathes and ours was a dense list. -->
          <ul :class="FREE_NAV_LIST">
            <li v-for="entry in group.entries" :key="entry.label">
              <a v-if="entry.href" :href="to(entry.href)" :class="row(entry)"
                 :aria-current="isCurrent(entry.href) ? 'page' : undefined"
                 :title="rail ? entry.label : undefined">
                <NavIcon v-if="rail || layout.navIcons" :name="entry.icon" class="size-6 shrink-0" />
                <template v-if="!rail">{{ entry.label }}</template>
              </a>

              <!--
                **Collapsed, a group opens a flyout beside the rail.**

                It rendered nothing at all, on the reasoning that a 90px column has no room for a
                submenu. True of a panel *inside* the column and irrelevant to one beside it, and the
                cost was that seven of ten rail rows were buttons that toggled state nothing rendered
                from: six of the nineteen pages were unreachable without expanding first (`PD-116`).

                Reka's `DropdownMenu` rather than a hand-rolled panel. It portals out of the aside,
                which is `overflow-y-auto` and would clip a flyout (`PD-082`), and it closes on
                outside-click, on Escape and on choosing an item. `side="right"` is native here, which
                is the one place this port is simpler than React's.
              -->
              <template v-else-if="rail">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    bare
                    :class="cn(row(entry), 'justify-center px-0')"
                    :aria-label="entry.label"
                    :title="entry.label"
                  >
                    <NavIcon :name="entry.icon" class="size-6 shrink-0" />
                  </DropdownMenuTrigger>
                  <!-- `RAIL_INSET + ANCHOR_GAP`: the panel clears the **rail**, not the button. The
                       row is inset by the nav's `px-3`, so anchoring to the button tucks the flyout's
                       left edge under the sidebar border. -->
                  <DropdownMenuContent
                    side="right"
                    align="start"
                    :side-offset="RAIL_INSET + ANCHOR_GAP"
                    :class="FREE_FLYOUT_PANEL"
                  >
                    <p :class="FREE_FLYOUT_HEADING">{{ entry.label }}</p>
                    <ul class="flex flex-col gap-1">
                      <li v-for="child in entry.children ?? []" :key="child.href">
                        <!--
                          `DropdownMenuItem as-child`, not a bare anchor with `role="menuitem"`.
                          Reka registers close-on-select and arrow-key focus through this primitive's
                          Collection, and a hand-rolled role attribute is invisible to it: the panel
                          navigated and then stayed open over the new page (`PD-118`). `as-child`
                          keeps one element rather than nesting an anchor inside a menuitem div.
                        -->
                        <DropdownMenuItem as-child :class="childRow(child.href)">
                          <a
                            :href="to(child.href)"
                            :aria-current="isCurrent(child.href) ? 'page' : undefined"
                          >
                            {{ child.label }}
                          </a>
                        </DropdownMenuItem>
                      </li>
                    </ul>
                  </DropdownMenuContent>
                </DropdownMenu>
              </template>

              <template v-else>
                <button
                  type="button"
                  :class="row(entry)"
                  :aria-expanded="open.includes(entry.label)"
                  :aria-controls="submenuId(entry.label)"
                  @click="toggle(entry.label)"
                >
                  <NavIcon v-if="layout.navIcons" :name="entry.icon" class="size-6 shrink-0" />
                  <span class="flex-1 text-left">{{ entry.label }}</span>
                  <!-- Three disclosure styles, because the reference uses three. Plus-minus states
                       the action and a chevron states the direction; `none` is for the documentation
                       layouts whose sections are always open, where an indicator that never changes
                       is furniture. -->
                  <NavIcon
                    v-if="layout.expander === 'chevron'"
                    name="chevron-down"
                    :class="
                      cn(
                        'size-4 shrink-0 transition-transform duration-200',
                        open.includes(entry.label) && 'rotate-180',
                      )
                    "
                  />
                  <NavIcon
                    v-else-if="layout.expander === 'plus-minus'"
                    :name="open.includes(entry.label) ? 'minus' : 'plus'"
                    class="size-4 shrink-0"
                  />
                </button>

                <Submenu :id="submenuId(entry.label)" :open="open.includes(entry.label)">
                  <div class="relative">
                    <span
                      v-if="layout.submenuRule"
                      aria-hidden="true"
                      :class="FREE_SUBMENU_RULE"
                    />
                    <ul :class="FREE_SUBMENU_LIST">
                      <li v-for="child in entry.children ?? []" :key="child.href">
                        <a
                          :href="to(child.href)"
                          :class="childRow(child.href)"
                          :aria-current="isCurrent(child.href) ? 'page' : undefined"
                        >
                          {{ child.label }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Submenu>
              </template>
            </li>
          </ul>
        </div>
        <UpgradeCard v-if="!rail" />
      </nav>
    </aside>

    <div :class="cn(PAGE_ROOT, 'min-w-0 flex-1')">
      <Header :collapsed="collapsed" @toggle="collapsed = !collapsed" />
      <!-- The footer scrolls with the page rather than being pinned: a fixed strip over a data table
           steals a row's worth of height on every screen to say the same sentence. -->
      <div :class="cn(PAGE_SCROLL, 'flex flex-col')">
        <div :class="PAGE_CONTENT"><slot /></div>
        <Footer v-if="layout.footer === 'compact'" />
      </div>
    </div>
  </div>
</template>
