<script setup lang="ts">
import {
  INPUT,
  TIME_COLUMN,
  TIME_HOURS,
  TIME_MERIDIEM,
  TIME_MINUTES,
  PICKER_ACTION,
  PICKER_ACTION_MUTED,
  PICKER_ACTION_PRIMARY,
  PICKER_FOOTER,
  TIME_OPTION,
  TIME_OPTION_ACTIVE,
  TIME_PANEL,
  cn,
  maskTime,
  partsToValue,
  timeParts,
  toDisplayTime,
} from "@viliha/vui-core";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@viliha/vui-vue";
import { computed, nextTick, ref, watch } from "vue";

import NavIcon from "../NavIcon.vue";

/**
 * A time field: our own panel behind a typed input, not `<input type="time">` (`PD-160`).
 *
 * The reference's reasoning for the native control is answered in its own `time-field.tsx`: the
 * browser's panel cannot be themed, and it sat beside a date field that is entirely ours.
 *
 * Shape, mask and column lists all come from the same place the reference reads them, so a keystroke
 * and a click do the same thing in both editions. `HH:mm` on the wire, 12-hour on screen.
 */
const props = defineProps<{ id?: string; invalid?: boolean; describedBy?: string }>();
const model = defineModel<string>({ default: "" });

const text = ref(toDisplayTime(model.value));
const typedInvalid = ref(false);
const parts = computed(() => timeParts(model.value));

/**
 * What the columns show before it is committed (`PD-163`).
 *
 * Every column click used to write straight to the field, so choosing an hour set a time nobody had
 * finished picking. Scrolling three columns is one decision, so it gets one confirmation.
 */
const draft = ref(timeParts(model.value));
watch(model, (value) => {
  draft.value = timeParts(value);
});

const open = ref(false);
/**
 * A draft that was never confirmed does not survive the panel closing.
 *
 * Watching the model alone was not enough: closing without `Set` changes nothing, so an abandoned
 * pick was still showing when the panel reopened. Opening is the event that matters.
 */
watch(open, (isOpen) => {
  if (isOpen) draft.value = timeParts(model.value);
});
const box = ref<HTMLElement | null>(null);

/**
 * Each column scrolls its chosen row to the same line, so the three read across as one time.
 *
 * The first option's own offset is the column's padding, so the maths needs no magic number. Watched
 * on `open` as well as on the value, because the panel does not exist until it opens.
 */
watch([open, () => model.value], async () => {
  if (!open.value) return;
  await nextTick();
  for (const column of box.value?.querySelectorAll<HTMLElement>('[role="listbox"]') ?? []) {
    const chosen = column.querySelector<HTMLElement>('[aria-selected="true"]');
    const first = column.querySelector<HTMLElement>('[role="option"]');
    if (chosen && first) column.scrollTop = chosen.offsetTop - first.offsetTop;
  }
});

watch(model, (value) => {
  text.value = toDisplayTime(value);
  typedInvalid.value = false;
});

function onType(event: Event) {
  const masked = maskTime((event.target as HTMLInputElement).value);
  text.value = masked.text;
  typedInvalid.value = masked.invalid;
  if (masked.value) model.value = masked.value;
  else if (masked.text === "") model.value = "";
}

/** Choosing one column keeps the other two. Nothing reaches the model until `Set`. */
function choose(part: "hour" | "minute" | "meridiem", chosen: string) {
  const current = draft.value;
  draft.value = {
    hour: part === "hour" ? chosen : current.hour || "12",
    minute: part === "minute" ? chosen : current.minute || "00",
    meridiem: part === "meridiem" ? chosen : current.meridiem || "AM",
  };
}

function commit() {
  const d = draft.value;
  model.value = partsToValue(d.hour || "12", d.minute || "00", d.meridiem || "AM");
  open.value = false;
}

function clear() {
  model.value = "";
  open.value = false;
}

const COLUMNS = [
  { part: "hour", options: TIME_HOURS },
  { part: "minute", options: TIME_MINUTES },
  { part: "meridiem", options: TIME_MERIDIEM },
] as const;
</script>

<template>
  <div class="relative">
    <input
      :id="props.id"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      placeholder="hh:mm AM"
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
          :aria-label="model ? `Change time, currently ${toDisplayTime(model)}` : 'Choose a time'"
          class="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <NavIcon name="clock" aria-hidden="true" class="size-5 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="p-0">
          <div ref="box" :class="TIME_PANEL">
            <div
              v-for="column in COLUMNS"
              :key="column.part"
              :class="TIME_COLUMN"
              role="listbox"
              :aria-label="column.part"
            >
              <button
                v-for="option in column.options"
                :key="option"
                type="button"
                role="option"
                :aria-selected="option === draft[column.part]"
                :class="cn(TIME_OPTION, option === draft[column.part] && TIME_OPTION_ACTIVE)"
                @click="choose(column.part, option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
          <!-- Clear and Set: three columns is one decision made in three moves, so it gets one
               confirmation. Clear is disabled with nothing to clear rather than hidden. -->
          <div :class="PICKER_FOOTER">
            <button
              type="button"
              :disabled="!model"
              :class="cn(PICKER_ACTION, PICKER_ACTION_MUTED)"
              @click="clear"
            >
              Clear
            </button>
            <button type="button" :class="cn(PICKER_ACTION, PICKER_ACTION_PRIMARY)" @click="commit">
              Set
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  </div>
</template>
