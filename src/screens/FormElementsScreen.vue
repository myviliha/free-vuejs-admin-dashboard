<script setup lang="ts">
import { FILE_INPUT, UPLOAD_DROP, UPLOAD_DROP_BADGE, UPLOAD_DROP_HINT, cn, todayISO } from "@viliha/vui-core";
import {
  Checkbox,
  Input,
  MultiCombobox,
  PasswordInput,
  RadioGroup,
  RadioGroupItem,
  Select,
  StatusField,
  Switch,
  Textarea,
} from "@viliha/vui-vue";
import { onMounted, ref } from "vue";

import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";
import DateField from "../forms/DateField.vue";
import TimeField from "../forms/TimeField.vue";
import FormField from "../forms/FormField.vue";
import SectionCard from "../forms/SectionCard.vue";

/**
 * Every form control, in the reference's ten sections and two columns.
 *
 * **This screen was seven `Demo` cards holding a subset.** Select Inputs, Input Group and Dropzone
 * were absent entirely, along with the date and time pickers and two of the three textareas, and the
 * sections it did have were wrapped in a card the reference does not use. `check:parity` reported 36
 * differences (`PD-134`).
 *
 * The order is the reference's, column by column, because a reader comparing the two previews reads
 * top to bottom and a section in the other column is a section in the wrong place.
 */
const COUNTRIES = [
  { value: "sg", label: "Singapore" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

const select = ref("");
const date = ref("");
const time = ref("11:30");
/*
 * Today, set on mount rather than in the initial value (`PD-159`).
 *
 * The reference sets it in an effect for the same reason: these editions are exported statically, so
 * a value computed while rendering is baked at build time.
 */
onMounted(() => {
  date.value = todayISO();
});
const single = ref("");
const many = ref<string[]>(["sg"]);
const dial = ref("sg");
const choice = ref("two");
const toggleOn = ref(true);
const toggleOff = ref(false);
// Editable, so a ref rather than a one-way prop: `model-value` alone gave the textarea a value it
// could not write back to, and the initial text never rendered.
const shortText = ref("Too short");

const CHECKBOX_ROWS = [
  { id: "cb-default", label: "Default", checked: false, disabled: false },
  { id: "cb-checked", label: "Checked", checked: true, disabled: false },
  { id: "cb-disabled", label: "Disabled", checked: false, disabled: true },
];
const checks = ref(CHECKBOX_ROWS.map((row) => row.checked));

/** The dropzone's own state. `overCount` rather than a boolean: see the handler below. */
const files = ref<string[]>([]);
const over = ref(false);
let dragCount = 0;

function accept(list: FileList | null) {
  if (!list?.length) return;
  files.value = Array.from(list).map((file) => file.name);
}

/**
 * A counter, not a flag.
 *
 * `dragleave` fires when the pointer crosses into a *child* of the drop zone, so a boolean flickers
 * off as the reader moves over the icon inside it. Counting enters against leaves is what makes the
 * highlight survive the crossing.
 */
function onEnter(event: DragEvent) {
  event.preventDefault();
  dragCount += 1;
  over.value = true;
}
function onLeave() {
  dragCount -= 1;
  if (dragCount <= 0) over.value = false;
}
function onDrop(event: DragEvent) {
  event.preventDefault();
  dragCount = 0;
  over.value = false;
  accept(event.dataTransfer?.files ?? null);
}

const OPTION = "flex items-center gap-3 text-sm font-medium";
</script>

<template>
  <PageHeader title="Form Elements" />
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
    <div class="space-y-6">
      <SectionCard title="Default Inputs">
        <FormField label="Input" html-for="fe-input"><Input id="fe-input" /></FormField>
        <FormField label="Input with Placeholder" html-for="fe-input-placeholder">
          <Input id="fe-input-placeholder" placeholder="info@gmail.com" />
        </FormField>
        <FormField label="Select Input" html-for="fe-select">
          <Select id="fe-select" v-model="select" :options="COUNTRIES" placeholder="Select an option" />
        </FormField>
        <FormField label="Password Input" html-for="fe-password">
          <PasswordInput id="fe-password" placeholder="Enter your password" />
        </FormField>
        <FormField label="Date Picker Input" html-for="fe-date">
          <DateField id="fe-date" v-model="date" />
        </FormField>
        <FormField label="Time Picker Input" html-for="fe-time">
          <!-- Native, and deliberately: a time is two numbers with no calendar to theme, so the
               platform's own control is better than anything worth building here. -->
          <!-- Ours, not the platform's: see `TimeField.vue` (`PD-160`). -->
          <TimeField id="fe-time" v-model="time" />
        </FormField>
      </SectionCard>

      <SectionCard title="Select Inputs">
        <FormField label="Select Input" html-for="fe-select-2">
          <Select id="fe-select-2" v-model="single" :options="COUNTRIES" placeholder="Select Option" />
        </FormField>
        <FormField label="Multiple Select Options" hint="Pick as many as apply.">
          <MultiCombobox v-model="many" :options="COUNTRIES" placeholder="Select options" />
        </FormField>
      </SectionCard>

      <SectionCard title="Textarea input field">
        <FormField label="Description" html-for="fe-textarea">
          <Textarea id="fe-textarea" :rows="6" placeholder="Tell us about it" />
        </FormField>
        <FormField label="Description" html-for="fe-textarea-disabled" hint="This field is disabled.">
          <Textarea id="fe-textarea-disabled" :rows="6" disabled placeholder="Disabled" />
        </FormField>
        <FormField label="Description" html-for="fe-textarea-error">
          <StatusField state="error" message="Please describe the issue before submitting.">
            <Textarea id="fe-textarea-error" v-model="shortText" :rows="6" />
          </StatusField>
        </FormField>
      </SectionCard>

      <SectionCard
        title="Input States"
        desc="State lives in the control. Hover the icon for the reason."
      >
        <!--
          The default is the icon alone: text under a field pushes the rest of the form down the moment
          it appears, so a form jumps under the reader's hands exactly when they are fixing something.
          `messageBelow` is the other placement, for the field a reader must not have to go looking for.
          Both are shown because the choice is per field, not per product.
        -->
        <FormField label="Email" html-for="fe-state-error">
          <StatusField state="error" message="This is an invalid email address.">
            <Input id="fe-state-error" model-value="demoemail" />
          </StatusField>
        </FormField>
        <FormField label="Email" html-for="fe-state-success">
          <StatusField state="success" message="This email address is available.">
            <Input id="fe-state-success" model-value="demoemail@gmail.com" />
          </StatusField>
        </FormField>
        <FormField label="Email" html-for="fe-state-disabled">
          <Input id="fe-state-disabled" disabled placeholder="Disabled email" />
        </FormField>
        <FormField label="Email" html-for="fe-state-error-below">
          <StatusField state="error" message="This is an error message." message-below>
            <Input id="fe-state-error-below" model-value="demoemail" />
          </StatusField>
        </FormField>
        <FormField label="Email" html-for="fe-state-success-below">
          <StatusField state="success" message="This is an success message." message-below>
            <Input id="fe-state-success-below" model-value="demoemail@gmail.com" />
          </StatusField>
        </FormField>
      </SectionCard>
    </div>

    <div class="space-y-6">
      <SectionCard title="Input Group">
        <FormField label="Email" html-for="fe-group-email">
          <div class="relative">
            <!-- `pl-12` clears the icon, and the icon is `pointer-events-none` so it cannot swallow a
                 click meant for the field behind it. -->
            <NavIcon
              name="mail"
              aria-hidden="true"
              class="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input id="fe-group-email" class="pl-12" placeholder="info@gmail.com" />
          </div>
        </FormField>
        <FormField label="Phone" html-for="fe-group-phone">
          <!--
            A gap rather than a shared edge. `border-r-0` against `rounded-l-none` puts a focus ring,
            which is drawn outside the border box, straight over the neighbour's edge, so the pair looks
            broken at exactly the moment it is being used. A shared edge also means the two halves
            cannot both show a state.

            A real `Select` rather than a painted prefix: the country is a value the form needs, and
            decoration cannot be dialled.
          -->
          <div class="flex gap-3">
            <Select
              v-model="dial"
              :options="[
                { value: 'sg', label: '+65' },
                { value: 'us', label: '+1' },
                { value: 'uk', label: '+44' },
              ]"
              class="w-[104px] shrink-0"
              aria-label="Dialling code"
            />
            <Input id="fe-group-phone" placeholder="8000 0000" />
          </div>
        </FormField>
      </SectionCard>

      <SectionCard title="File Input">
        <FormField label="Upload file" html-for="fe-file">
          <!-- `FILE_INPUT` is the library's: the button the browser draws is the only part of a file
               input a stylesheet reaches, and how it is drawn is a design-system decision rather than
               this page's. -->
          <Input id="fe-file" type="file" :class="FILE_INPUT" />
        </FormField>
      </SectionCard>

      <SectionCard title="Checkbox">
        <div class="flex flex-wrap items-center gap-8">
          <label
            v-for="(row, index) in CHECKBOX_ROWS"
            :key="row.id"
            :class="
              cn(
                'flex items-center gap-3 text-sm font-medium',
                row.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              )
            "
          >
            <Checkbox :id="row.id" v-model="checks[index]" :disabled="row.disabled" />
            {{ row.label }}
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Radio Buttons">
        <!--
          **Two groups, not one with a disabled member.** The row exists to show three states, and the
          third is disabled-and-selected: a radio group only ever has one selection, so a disabled item
          inside the live group can never be the one that is on. Its own group, fixed on its own value,
          is what makes the state visible instead of just greying out an empty ring.
        -->
        <div class="flex flex-wrap items-center gap-8">
          <RadioGroup v-model="choice" class="flex flex-wrap gap-8">
            <label
              v-for="option in [
                { value: 'one', label: 'Default' },
                { value: 'two', label: 'Selected' },
              ]"
              :key="option.value"
              :class="cn(OPTION, 'cursor-pointer')"
            >
              <RadioGroupItem :value="option.value" />
              {{ option.label }}
            </label>
          </RadioGroup>

          <RadioGroup model-value="locked" disabled>
            <label :class="cn(OPTION, 'cursor-not-allowed opacity-60')">
              <RadioGroupItem value="locked" disabled />
              Disabled Selected
            </label>
          </RadioGroup>
        </div>
      </SectionCard>

      <SectionCard title="Toggle switch input">
        <div class="flex flex-wrap items-center gap-8">
          <label class="flex cursor-pointer items-center gap-3 text-sm">
            <Switch v-model="toggleOn" />
            Default
          </label>
          <label class="flex cursor-pointer items-center gap-3 text-sm">
            <Switch v-model="toggleOff" />
            Checked
          </label>
          <label class="flex cursor-not-allowed items-center gap-3 text-sm opacity-60">
            <Switch :model-value="false" disabled />
            Disabled
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Dropzone">
        <label
          :class="cn(UPLOAD_DROP, over && 'border-primary bg-primary/5')"
          @dragenter="onEnter"
          @dragover.prevent
          @dragleave="onLeave"
          @drop="onDrop"
        >
          <span :class="UPLOAD_DROP_BADGE">
            <NavIcon name="upload" class="size-5 text-muted-foreground" aria-hidden="true" />
          </span>
          <span class="text-sm font-medium">
            {{ over ? "Drop the files here" : "Drag and drop files here" }}
          </span>
          <span :class="UPLOAD_DROP_HINT">PNG, JPG or PDF, up to 10 MB each</span>
          <!-- The input is the control, so the label is its trigger: keyboard reachable and announced
               as a file picker without a click handler faking either. -->
          <input
            type="file"
            multiple
            class="sr-only"
            @change="accept(($event.target as HTMLInputElement).files)"
          />
        </label>
        <ul v-if="files.length" class="space-y-1 text-sm text-muted-foreground">
          <li v-for="name in files" :key="name" class="truncate">{{ name }}</li>
        </ul>
      </SectionCard>
    </div>
  </div>
</template>
