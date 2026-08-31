<script setup lang="ts">
import { cn } from "@viliha/vui-core";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@viliha/vui-vue";
import { ref } from "vue";

import Demo from "../Demo.vue";
import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";

/**
 * The five overlay examples, and the page the reference links from nowhere in its own sidebar.
 *
 * Every one is the library's `Dialog` rather than markup wearing its classes. That matters more here
 * than anywhere else on the site: focus trapping, the Escape handler, the scroll lock, the backdrop blur
 * and the corner close control are the parts of an overlay that are tedious to get right and invisible
 * when they are, and a demo that hand-rolls them is demonstrating a div.
 *
 * **All five carry a header band and a close control.** The reference drops the X on its centred modal,
 * and that is the thing not to copy: four dialogs on one page, three with a close control and one
 * without, teaches a reader the corner is unreliable (`PD-088`).
 */
const open = ref<string | null>(null);
const shown = (id: string) => open.value === id;
const close = () => {
  open.value = null;
};

const FIELDS = [
  { id: "m-first", label: "First Name", placeholder: "Ada", type: "text" },
  { id: "m-last", label: "Last Name", placeholder: "Okafor", type: "text" },
  { id: "m-email", label: "Email Address", placeholder: "ada@example.com", type: "email" },
  { id: "m-phone", label: "Phone", placeholder: "+65 8000 0000", type: "tel" },
] as const;

/**
 * The four state dialogs.
 *
 * Their version paints a decorative starburst behind each icon and its buttons are raw palette markup.
 * Ours is a tinted disc in the state's own token and real `Button`s, which is fewer moving parts and the
 * only version that survives a retheme.
 */
const ALERTS = [
  {
    key: "success",
    label: "Success Alert",
    heading: "Payment Received",
    body: "Invoice INV-2043 has been settled in full. A receipt is on its way.",
    icon: "check-circle",
    tint: "bg-success/10",
    ink: "text-success",
    button: "bg-success text-success-foreground hover:bg-success/90",
    cta: "Got It",
  },
  {
    key: "info",
    label: "Info Alert",
    heading: "Export Ready",
    body: "Your 12,480 row export finished and is available for the next seven days.",
    icon: "info",
    tint: "bg-info/10",
    ink: "text-info",
    button: "bg-info text-info-foreground hover:bg-info/90",
    cta: "Got It",
  },
  {
    key: "warning",
    label: "Warning Alert",
    heading: "Card Expiring Soon",
    body: "The card ending 4242 expires next month. Update it to avoid a failed renewal.",
    icon: "alert-triangle",
    tint: "bg-warning/10",
    ink: "text-warning",
    button: "bg-warning text-warning-foreground hover:bg-warning/90",
    cta: "Got It",
  },
  {
    key: "error",
    label: "Danger Alert",
    heading: "Delete This Workspace",
    body: "Every project, member and invoice in it goes too. This cannot be undone.",
    icon: "alert-triangle",
    tint: "bg-destructive/10",
    ink: "text-destructive",
    button: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    cta: "Delete Anyway",
  },
] as const;

const active = () => ALERTS.find((one) => one.key === open.value);
</script>

<template>
  <PageHeader title="Modals" />
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
    <Demo title="Default Modal">
      <Button variant="primary" size="lg" @click="open = 'default'">Open Modal</Button>
    </Demo>
    <Demo title="Vertically Centered Modal">
      <Button variant="primary" size="lg" @click="open = 'centered'">Open Modal</Button>
    </Demo>
    <Demo title="Form In Modal">
      <Button variant="primary" size="lg" @click="open = 'form'">Open Modal</Button>
    </Demo>
    <Demo title="Full Screen Modal">
      <Button variant="primary" size="lg" @click="open = 'full'">Open Modal</Button>
    </Demo>
    <Demo title="Modal Based Alerts">
      <div class="flex flex-wrap items-center gap-3">
        <Button
          v-for="alert in ALERTS"
          :key="alert.key"
          size="lg"
          variant="primary"
          :class="cn('border-transparent shadow-none', alert.button)"
          @click="open = alert.key"
        >
          {{ alert.label }}
        </Button>
      </div>
    </Demo>
  </div>

  <Dialog :open="shown('default')" @update:open="close" label="Renewal" class="max-w-[600px]">
    <DialogHeader><DialogTitle>Confirm Renewal</DialogTitle></DialogHeader>
    <DialogBody class="space-y-5 text-sm leading-6 text-muted-foreground">
      <p>
        Renewal is scheduled for 1 September. The invoice is raised seven days before the charge, so a
        change made today still applies to the next cycle.
      </p>
      <p>Nothing is charged until the renewal date, and the plan can be changed at any point before it.</p>
    </DialogBody>
    <DialogFooter>
      <Button variant="outline" size="lg" @click="close">Close</Button>
      <Button variant="primary" size="lg" @click="close">Save Changes</Button>
    </DialogFooter>
  </Dialog>

  <Dialog :open="shown('centered')" @update:open="close" label="All done" class="max-w-[507px]">
    <DialogHeader><DialogTitle>Subscription Updated</DialogTitle></DialogHeader>
    <DialogBody class="py-6 text-center">
      <span class="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-success/10">
        <NavIcon name="check-circle" class="size-8 text-success" />
      </span>
      <p class="text-sm leading-6 text-muted-foreground">
        The plan is updated and the receipt is on its way to the billing address on file.
      </p>
    </DialogBody>
    <DialogFooter class="justify-center">
      <Button variant="outline" size="lg" @click="close">Close</Button>
      <Button variant="primary" size="lg" @click="close">View Receipt</Button>
    </DialogFooter>
  </Dialog>

  <Dialog :open="shown('form')" @update:open="close" label="Personal information" class="max-w-[584px]">
    <!-- A real `form` with a real submit, so Enter in any field does what a reader expects. Theirs is a
         `form` with no handler and a button that is not a submit, which means the keyboard does nothing. -->
    <form @submit.prevent="close">
      <DialogHeader><DialogTitle>Personal Information</DialogTitle></DialogHeader>
      <DialogBody>
        <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div v-for="field in FIELDS" :key="field.id">
            <Label :for="field.id" class="mb-1.5 block text-sm font-medium">{{ field.label }}</Label>
            <Input :id="field.id" :type="field.type" :placeholder="field.placeholder" />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" size="lg" @click="close">Close</Button>
        <Button type="submit" variant="primary" size="lg">Save Changes</Button>
      </DialogFooter>
    </form>
  </Dialog>

  <Dialog
    :open="shown('full')" @update:open="close"
    label="Full screen"
    class="h-dvh w-screen max-w-none rounded-none"
   
  >
    <DialogHeader><DialogTitle>Full Screen Modal</DialogTitle></DialogHeader>
    <DialogBody class="grid h-full place-items-center text-center">
      <div>
        <p class="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
          For the task that deserves the whole window: an import wizard, a diff, a document. The close
          control is still in the corner and Escape still works.
        </p>
        <Button variant="primary" size="lg" class="mt-8" @click="close">Close</Button>
      </div>
    </DialogBody>
  </Dialog>

  <!-- **One dialog, not four.** Only one can be open at a time, so four mounted overlays each holding
       their own boolean is four chances for two to be open at once. -->
  <Dialog
    :open="Boolean(active())" @update:open="close"
    :label="active()?.heading ?? 'Alert'"
    class="max-w-[600px]"
   
  >
    <template v-if="active()">
      <DialogHeader><DialogTitle>{{ active()!.heading }}</DialogTitle></DialogHeader>
      <DialogBody class="py-6 text-center">
        <span :class="cn('mx-auto mb-6 grid size-20 place-items-center rounded-full', active()!.tint)">
          <NavIcon :name="active()!.icon" :class="cn('size-10', active()!.ink)" />
        </span>
        <p class="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">{{ active()!.body }}</p>
      </DialogBody>
      <DialogFooter class="justify-center">
        <Button variant="outline" size="lg" @click="close">Close</Button>
        <Button
          size="lg"
          variant="primary"
          :class="cn('border-transparent shadow-none', active()!.button)"
          @click="close"
        >
          {{ active()!.cta }}
        </Button>
      </DialogFooter>
    </template>
  </Dialog>
</template>
