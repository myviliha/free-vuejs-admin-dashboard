<script setup lang="ts">
import { Button, Checkbox, Input, Label, PasswordInput, StatusField } from "@viliha/vui-vue";
import { ref } from "vue";

import { to } from "../router";

import AuthLayout from "../AuthLayout.vue";
import AuthParts from "../AuthParts.vue";
import { RULES, useAuth } from "../auth-form";

/**
 * Sign in, on the reference's structure and with validation it does not have.
 *
 * **The password rule here is deliberately not a length check.** Telling somebody their password is too
 * short on a *sign-in* form tells an attacker the password they guessed cannot have been this account's.
 * "Password is required" is all this screen may say; the strength rule belongs where one is chosen.
 *
 * **"Forgot password?" is not a link, because there is nowhere for it to go.** The reference points at
 * `/reset-password`, which this demo does not ship. A visitor who has forgotten their password landing
 * on a blank Sign Up form is worse than a label that admits the screen is not built.
 */
const form = useAuth({ email: RULES.email, password: RULES.required("Password") });
const remember = ref(false);
</script>

<template>
  <AuthLayout>
    <AuthParts verb="Sign in">
      <template #heading>
        <div class="mb-5 sm:mb-8">
          <h1 class="mb-2 text-2xl font-semibold sm:text-3xl">Sign In</h1>
          <p class="text-sm text-muted-foreground">Enter your email and password to sign in.</p>
        </div>
      </template>

      <div v-if="form.done.value" class="rounded-2xl border border-success/40 bg-success/10 p-6 text-center">
        <p class="font-semibold text-success">Signed in</p>
        <p class="mt-1 text-sm text-muted-foreground">
          There is no server behind this demo, so this is where a real session would start.
        </p>
      </div>

      <template v-else>
        <!-- `novalidate`: the browser's own bubble competes with the field's inline state, and two error
             affordances for one field is worse than either alone. -->
        <form novalidate class="space-y-6" @submit.prevent="form.submit()">
          <div>
            <Label for="signin-email" class="mb-1.5 block text-sm font-medium">
              Email <span aria-hidden="true" class="text-destructive">*</span>
            </Label>
            <!-- `messageBelow`, which is what `StatusField`'s own doc asks for on a blocking auth field:
                 without it a touch or keyboard user gets a red border and no reason. -->
            <StatusField :state="form.errors.value.email ? 'error' : undefined" :message="form.errors.value.email" message-below>
              <Input
                id="signin-email"
                type="email"
                autocomplete="email"
                placeholder="info@gmail.com"
                :model-value="form.values.value.email"
                required
                @update:model-value="form.set('email', String($event))"
              />
            </StatusField>
          </div>

          <div>
            <Label for="signin-password" class="mb-1.5 block text-sm font-medium">
              Password <span aria-hidden="true" class="text-destructive">*</span>
            </Label>
            <StatusField :state="form.errors.value.password ? 'error' : undefined" :message="form.errors.value.password" message-below>
              <PasswordInput
                id="signin-password"
                autocomplete="current-password"
                placeholder="Enter your password"
                :model-value="form.values.value.password"
                required
                @update:model-value="form.set('password', String($event))"
              />
            </StatusField>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <!-- `Checkbox`, not a raw input. A native box with no token styling has no focus ring and
                 no dark variant, so the control vanished into the card in dark mode. React's
                 `auth-form.tsx` builds the same control from the design system, and "every control here
                 is a VUI component, not markup wearing VUI's classes" is the standard being kept. -->
            <label class="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
              <Checkbox v-model="remember" />
              Keep me logged in
            </label>
            <span title="Password reset is not part of the free demo" class="cursor-not-allowed text-sm text-muted-foreground">
              Forgot password?
            </span>
          </div>

          <Button type="submit" variant="primary" size="lg" class="w-full">Sign In</Button>
        </form>
        <p class="mt-5 text-center text-sm text-muted-foreground sm:text-start">
          Don't have an account?
          <a :href="to('/signup')" class="text-primary underline-offset-2 hover:underline">Sign Up</a>
        </p>
      </template>
    </AuthParts>
  </AuthLayout>
</template>
