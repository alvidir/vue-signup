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
import i18n from "@/i18n/en.json";

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
    emailError.value = i18n.ErrInvalidEmail;
  } else {
    emailError.value = "";
  }
};

const onPasswordInput = () => {
  const pwd = password.value?.text() ?? "";
  if (pwd.length && !passwordRegex.test(pwd)) {
    passwordError.value = i18n.ErrInvalidPassword;
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
    <view-header :title="i18n.SignupTitle"></view-header>
    <regular-field
      :placeholder="i18n.Email"
      :error="emailError"
      ref="email"
      @input="onEmailInput"
      large
    ></regular-field>

    <regular-field
      :placeholder="i18n.Password"
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
      {{ i18n.Signup }}
    </submit-button>

    <nav>
      <router-link to="/login">{{ i18n.AlreadyHaveAnAccount }}</router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
