<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import { Field } from "vue-fields/src/types";
import { signup } from "@/services/rauth.rpc";
import config from "@/config.json";
import { setCookie } from "@/cookies";
import { redirect, token } from "@/queryParams";
import { useWarningStore } from "@/stores/warning";
import { emailRegex, passwordRegex } from "@/regex";

const warningStore = useWarningStore();

const email = ref<Field | undefined>(undefined);
const emailError = ref("");

const password = ref<Field | undefined>(undefined);
const passwordError = ref("");

const loading = ref(false);

const isValid = computed((): boolean => {
  return (
    !!email.value?.text() &&
    !!password.value?.text() &&
    !emailError.value &&
    !passwordError.value
  );
});

const onEmailInput = () => {
  const ident = email.value?.text() ?? "";
  if (ident.length && !emailRegex.test(ident)) {
    emailError.value = "Invalid email address.";
  } else {
    emailError.value = "";
  }
};

const onPasswordInput = () => {
  const pwd = password.value?.text() ?? "";
  if (pwd.length && !passwordRegex.test(pwd)) {
    passwordError.value =
      "A password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, one number, and one special character.";
  } else {
    passwordError.value = "";
  }
};

const onSubmit = () => {
  loading.value = true;
  const ident = email.value?.text() ?? "";
  const pwd = password.value?.text() ?? "";
  const headers = token
    ? {
        [config.JWT_HEADER]: token,
      }
    : {};

  signup(ident, pwd, headers)
    .then((token) => {
      const key = config.TOKEN_COOKIE_KEY;
      const domain = config.ALVIDIR_BASE_URI;
      setCookie(key, token, domain);
      const targetLocation = redirect ?? config.LOGIN_REDIRECT;
      window.location.replace(targetLocation);
    })
    .catch((warning) => {
      warningStore.add(warning);
    })
    .finally(() => {
      loading.value = false;
    });
};

onBeforeMount(() => {
  if (token) onSubmit();
});
</script>

<template>
  <div>
    <view-header title="Sign on Alvidir"></view-header>
    <regular-field
      placeholder="Email"
      :error="emailError"
      ref="email"
      @input="onEmailInput"
      large
    ></regular-field>

    <regular-field
      placeholder="Password"
      :error="passwordError"
      type="password"
      ref="password"
      @input="onPasswordInput"
      large
    ></regular-field>

    <submit-button
      :disabled="!isValid"
      :loading="loading"
      @submit="onSubmit()"
      large
    >
      Sign up
    </submit-button>

    <nav>
      <router-link to="/login">Already have an account? Log in!</router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
