<script setup lang="ts">
import {
  INPUT,
  PICKER_ACTION,
  PICKER_ACTION_MUTED,
  PICKER_ACTION_PRIMARY,
  PICKER_FOOTER,
  cn,
  formatDayFirst,
  fromISODate,
  isoToDayFirst,
  maskDayFirst,
  toISODate,
} from "@viliha/vui-core";
import { Calendar, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@viliha/vui-vue";
import { computed, ref, watch } from "vue";

import NavIcon from "../NavIcon.vue";

/**
 * A date field: the design system's own calendar behind an input-shaped trigger.
 *
 * Not a native `<input type="date">`, for the reason the reference records: the browser's picker
 * cannot be themed, so the one control on a themed form would arrive in the operating system's
 * colours.
 *
 * **The model is an ISO string, matching the reference exactly.** It was a `Date` here, which reads
 * more naturally in Vue and is the wrong call: the hidden input that carries the value for the label
 * then held a formatted `dd/mm/yyyy` where the reference holds `2026-08-26`, so the two editions
 * disagreed about what the field's value *is*, which `check:parity` compares directly (`PD-135`). ISO
 * on the wire and day-first on screen, in both.
 *
 * The trigger wears `INPUT`, so it lines up with every other field on the page rather than being a
 * button that happens to be about the same height.
 */
const props = defineProps<{ id?: string; min?: string; invalid?: boolean; describedBy?: string }>();
const model = defineModel<string>({ default: "" });

const selected = computed(() => (model.value ? fromISODate(model.value) : undefined));
const minDate = computed(() => (props.min ? fromISODate(props.min) : undefined));
const shown = computed(() => (selected.value ? formatDayFirst(selected.value) : "dd/mm/yyyy"));

const open = ref(false);

/**
 * What the input shows while it is being typed (`PD-159`).
 *
 * **A picker alone is the wrong control for a date of birth**, so the field is a real text input with
 * a card-expiry mask and the calendar is a button at its trailing edge. Local, because a half-typed
 * date has no ISO value to hand to the model; the watcher is the other direction, for when the
 * calendar, Clear or Today set it.
 *
 * `maskDayFirst` is the reference's function, from `@viliha/vui-core`, so both editions insert the
 * same separators on the same keystroke.
 */
const text = ref(isoToDayFirst(model.value));
const typedInvalid = ref(false);
watch(model, (value) => {
  text.value = isoToDayFirst(value);
  typedInvalid.value = false;
});

function onType(event: Event) {
  const masked = maskDayFirst((event.target as HTMLInputElement).value);
  text.value = masked.text;
  typedInvalid.value = masked.invalid;
  if (masked.iso) model.value = masked.iso;
  else if (masked.text === "") model.value = "";
}

/** The calendar speaks `Date`; the field speaks ISO. This is the one place that converts. */
const picked = computed({
  get: () => selected.value,
  set: (date) => {
    model.value = date ? toISODate(date) : "";
    open.value = false;
  },
});

/**
 * **Clear and Today**, which the panel shipped without and the reference has always had.
 *
 * They are the two things a reader wants that the grid cannot express: "no date" is not a cell, and
 * "the day I mean is today" is a cell you have to go and find once the value has wandered off to
 * another month. `check:parity` compares settled pages and this panel exists only while it is open,
 * so a control missing from it is invisible to the sweep: found by reading the two fields side by
 * side rather than by any check (`PD-154`).
 *
 * Clear is disabled with nothing to clear rather than hidden, because a control that appears and
 * disappears under the cursor is worse than one that is plainly unavailable.
 */
function clear() {
  model.value = "";
  open.value = false;
}

function pickToday() {
  const now = new Date();
  // Respect `min`: on the end-date field, "today" before the start is not a date this field may
  // hold, and silently accepting it would make the form invalid on submit.
  if (minDate.value && now < minDate.value) return;
  model.value = toISODate(now);
  open.value = false;
}
</script>

<template>
  <div class="relative">
    <!-- The `id` is on the visible input. It used to sit on a hidden one beside a button, because a
         button carries no value and a label cannot point at it; an input needs neither trick. -->
    <input
      :id="props.id"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      placeholder="dd/mm/yyyy"
      :value="text"
      :aria-invalid="invalid || typedInvalid || undefined"
      :aria-describedby="describedBy"
      :class="cn(INPUT, 'pr-12', (invalid || typedInvalid) && 'border-destructive')"
      @input="onType"
    />
    <span class="absolute inset-y-0 right-0 flex items-center pr-1.5">
      <DropdownMenu v-model:open="open">
        <DropdownMenuTrigger
          bare
          :aria-label="selected ? `Change date, currently ${formatDayFirst(selected)}` : 'Choose a date'"
          class="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <NavIcon name="calendar" aria-hidden="true" class="size-5 shrink-0" />
        </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="p-0">
      <!-- `min` greys out every day before it in the calendar itself, so the impossible choice is not
           offered rather than being refused after the fact. -->
      <Calendar v-model="picked" :min-value="minDate" />
      <div :class="PICKER_FOOTER">
        <button
          type="button"
          :disabled="!model"
          :class="cn(PICKER_ACTION, PICKER_ACTION_MUTED)"
          @click="clear"
        >
          Clear
        </button>
        <button
          type="button"
          :class="cn(PICKER_ACTION, PICKER_ACTION_PRIMARY)"
          @click="pickToday"
        >
          Today
        </button>
      </div>
    </DropdownMenuContent>
      </DropdownMenu>
    </span>
  </div>
</template>
