<script setup lang="ts">
import type { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/vue3";
import {
  CALENDAR_LEVELS,
  CALENDAR_LEVEL_RING,
  cn,
  toISODate,
  todayISO,
} from "@viliha/vui-core";
import { Button, Card, Dialog, Input, Label } from "@viliha/vui-vue";
import { computed, onMounted, ref } from "vue";

import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";
import DateField from "../forms/DateField.vue";
import ModalField from "../forms/ModalField.vue";

/**
 * The calendar, on FullCalendar, which is what the reference draws with.
 *
 * **This screen was a hand-rolled month grid.** Seven weekday headers, a table of numbered cells and
 * an "Upcoming" list the reference does not have: a picture of a calendar rather than a calendar. It
 * had no week or day view, no drag-select, no event click and no way to add anything, so `check:parity`
 * reported 28 differences and none of them were styling (`PD-135`).
 *
 * FullCalendar's plugins are framework-agnostic and `@fullcalendar/vue3` is the same adapter shape as
 * `@fullcalendar/react`, so both editions run the same scheduler over the same options. `PD-073`
 * already recorded that FullCalendar is in the **free** tier's manifest, so this applies that decision
 * to the edition that has to match rather than making a new one.
 *
 * Its own DOM is styled from `@viliha/vui-css/fullcalendar.css`, which moved into the design system with
 * this change: the library renders its own markup and there is no class to hand a day cell, so the
 * theming is a stylesheet against `.fc-*` and it belongs where every edition can reach it.
 */
type Level = (typeof CALENDAR_LEVELS)[number];

interface CalendarEvent extends EventInput {
  extendedProps: { calendar: Level };
}

/**
 * A date this many days from today, as ISO.
 *
 * **Computed after mount, not at module scope.** Evaluated while the module loads, "today" is baked
 * into a static build, so an exported demo shows the week it was built rather than the week it is
 * opened. The reference sets its seed events in an effect for exactly this reason.
 */
const day = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return toISODate(date);
};

const events = ref<CalendarEvent[]>([]);

onMounted(() => {
  events.value = [
    { id: "1", title: "Event Conf.", start: day(0), extendedProps: { calendar: "Danger" } },
    { id: "2", title: "Meeting", start: day(1), extendedProps: { calendar: "Success" } },
    { id: "3", title: "Workshop", start: day(2), end: day(3), extendedProps: { calendar: "Primary" } },
  ];
});

const open = ref(false);
const editing = ref<CalendarEvent | null>(null);
const title = ref("");
const start = ref("");
const end = ref("");
/* Both fields open on today, set on mount so a static export cannot bake a build date (`PD-159`). */
onMounted(() => {
  start.value = start.value || todayISO();
  end.value = end.value || todayISO();
});
const level = ref<Level>("Primary");
const submitted = ref(false);

function reset() {
  editing.value = null;
  title.value = "";
  start.value = "";
  end.value = "";
  level.value = "Primary";
  submitted.value = false;
}

function openBlank() {
  reset();
  open.value = true;
}

function onSelect(info: DateSelectArg) {
  reset();
  start.value = info.startStr;
  end.value = info.endStr || info.startStr;
  open.value = true;
}

function onEventClick(info: EventClickArg) {
  const event = info.event;
  editing.value = event as unknown as CalendarEvent;
  title.value = event.title;
  start.value = event.start ? toISODate(event.start) : "";
  end.value = event.end ? toISODate(event.end) : "";
  level.value = (event.extendedProps.calendar as Level) ?? "Primary";
  open.value = true;
}

const errors = computed(() => ({
  title: title.value.trim() ? undefined : "Give the event a name.",
  end: end.value && start.value && end.value < start.value
    ? "The end cannot be before the start."
    : undefined,
}));
const valid = computed(() => !errors.value.title && !errors.value.end && Boolean(start.value));

function remove() {
  if (!editing.value) return;
  events.value = events.value.filter((event) => event.id !== editing.value?.id);
  open.value = false;
  reset();
}

/** Nothing here is disabled: a disabled confirm is a button that will not say why. */
function save() {
  submitted.value = true;
  if (!valid.value) return;
  const next: CalendarEvent = {
    id: editing.value?.id ?? String(Date.now()),
    title: title.value,
    start: start.value,
    end: end.value || undefined,
    allDay: true,
    extendedProps: { calendar: level.value },
  };
  events.value = editing.value
    ? events.value.map((event) => (event.id === editing.value?.id ? next : event))
    : [...events.value, next];
  open.value = false;
  reset();
}

const options = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "prev,next addEventButton",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  events: events.value,
  selectable: true,
  select: onSelect,
  eventClick: onEventClick,
  buttonText: { dayGridMonth: "Month", timeGridWeek: "Week", timeGridDay: "Day" },
  customButtons: { addEventButton: { text: "Add Event", click: openBlank } },
  height: "auto",
}));

/** The pill inside a day cell, in the level's own colour. Same markup as the reference's. */
const eventLevel = (info: EventContentArg) =>
  String(info.event.extendedProps.calendar ?? "Primary").toLowerCase();
</script>

<template>
  <PageHeader title="Calendar" />
  <Card class="overflow-hidden">
    <div class="custom-calendar">
      <FullCalendar :options="options">
        <template #eventContent="info">
          <div :class="`event-fc-color fc-event-main flex fc-bg-${eventLevel(info)}`">
            <div class="fc-daygrid-event-dot" />
            <div class="fc-event-time">{{ info.timeText }}</div>
            <div class="fc-event-title">{{ info.event.title }}</div>
          </div>
        </template>
      </FullCalendar>
    </div>
  </Card>

  <!--
    `Dialog` supplies the behaviour that matters here (the overlay, Escape, the focus trap, the scroll
    lock) and its own look is a bordered header, body and footer with tinted bars. The reference's is
    one soft panel: `rounded-3xl`, `max-w-[700px]`, `p-6 lg:p-10`, no dividers. So the parts are not
    used, the sections are plain markup, and `twMerge` lets the radius and width here win.
  -->
  <Dialog
    :open="open"
    :label="editing ? 'Edit event' : 'Add event'"
    class="max-w-[700px] rounded-3xl p-6 lg:p-10"
    @close="open = false"
  >
    <div class="vui-scroll max-h-[80vh] overflow-y-auto px-2">
      <div>
        <!-- One title, not two. The reference reads "Add / Edit Event" in both states, which is the
             better call: the dialog is the same form either way, and a heading that changes under you
             as you click an existing event is a heading you have to re-read. -->
        <h5 class="mb-2 text-xl font-semibold lg:text-2xl">Add / Edit Event</h5>
        <p class="text-sm text-muted-foreground">
          Plan your next big moment: schedule or edit an event to stay on track
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <ModalField
          label="Event Title"
          html-for="event-title"
          required
          :error="submitted ? errors.title : undefined"
        >
          <Input id="event-title" v-model="title" placeholder="Event name" />
        </ModalField>

        <fieldset>
          <!-- A real `fieldset` with a `legend`. Four inputs answering one question are a group, and a
               screen reader only says so if the markup does. -->
          <legend class="mb-4 block text-sm font-medium">Event Color</legend>
          <div class="flex flex-wrap items-center gap-4 sm:gap-5">
            <label
              v-for="name in CALENDAR_LEVELS"
              :key="name"
              class="flex cursor-pointer items-center gap-2 text-sm text-foreground/80"
            >
              <input
                v-model="level"
                type="radio"
                name="event-level"
                :value="name"
                class="peer sr-only"
              />
              <!--
                A thick ring closing over a pale centre, drawn in the level's own colour: the one
                control on this form whose job is to pick a colour has to show you which colour.

                The ring lives on the swatch because the real input is `sr-only`, and a focus ring on
                an off-screen element is a focus ring nobody sees.
              -->
              <span
                aria-hidden="true"
                :class="
                  cn(
                    'grid size-5 place-items-center rounded-full border transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                    level === name ? `border-[6px] ${CALENDAR_LEVEL_RING[name]}` : 'border-border',
                  )
                "
              >
                <span
                  :class="
                    cn(
                      'size-1.5 rounded-full bg-card transition-opacity',
                      level === name ? 'opacity-100' : 'opacity-0',
                    )
                  "
                />
              </span>
              {{ name }}
            </label>
          </div>
        </fieldset>

        <ModalField
          label="Enter Start Date"
          html-for="event-start"
          required
          :error="submitted && !start ? 'Pick a start date.' : undefined"
        >
          <DateField id="event-start" v-model="start" />
        </ModalField>

        <ModalField
          label="Enter End Date"
          html-for="event-end"
          :error="submitted ? errors.end : undefined"
        >
          <DateField id="event-end" v-model="end" :min="start || undefined" />
        </ModalField>
      </div>

      <!--
        Full width and stacked below `sm`, as the reference is: two half-width buttons on a phone are
        two buttons nobody can hit. `size="lg"` on all three, which is the size that matches `INPUT`'s
        height, so the footer lines up with the fields above it.

        Delete is on the left with `sm:mr-auto`, because a destructive action next to the confirm
        action is a mis-click waiting to happen.
      -->
      <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          v-if="editing"
          variant="ghost"
          class="w-full text-destructive sm:mr-auto sm:w-auto"
          @click="remove"
        >
          <NavIcon name="trash" />
          Delete Event
        </Button>
        <Button variant="outline" size="lg" class="w-full sm:w-auto" @click="open = false">
          Close
        </Button>
        <Button variant="primary" size="lg" class="w-full sm:w-auto" @click="save">
          {{ editing ? "Update Changes" : "Add Event" }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>
