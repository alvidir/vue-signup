<script setup lang="ts">
import { ref, computed } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import { reset } from "@/services/rauth.rpc";
import config from "@/config.json";
import { token } from "@/queryParams";
import { Code, Warning } from "@/warning";
import { useWarningStore } from "@/stores/warning";
import { emailRegex, passwordRegex } from "@/regex";
import router from "@/router";
import i18n from "@/i18n/en.json";

const warningStore = useWarningStore();

const email = ref("");
const emailError = ref("");

const password = ref("");
const passwordError = ref("");

const totp = ref("");

const showTotp = ref(false);
const loading = ref(false);

const isValid = computed((): boolean => {
  return (
    (!token && !!email.value && !emailError.value) ||
    (!!token && !!password.value && !passwordError.value) ||
    (showTotp.value && !!totp.value)
  );
});

const onEmailInput = () => {
  if (email.value.length && !emailRegex.test(email.value)) {
    emailError.value = i18n.ErrInvalidEmail;
  } else {
    emailError.value = "";
  }
};

const onPasswordInput = () => {
  if (password.value.length && !passwordRegex.test(password.value)) {
    passwordError.value = i18n.ErrInvalidPassword;
  } else {
    passwordError.value = "";
  }
};

const onSubmit = () => {
  loading.value = true;
  const headers = token
    ? {
        [config.JWT_HEADER]: token,
      }
    : {};

  reset(email.value, password.value, totp.value, headers)
    .then(() => {
      router.push("/login");
    })
    .catch((warning: Warning) => {
      if (warning.code === Code.ErrUnauthorized) showTotp.value = true;
      else warningStore.add(warning);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div>
    <view-header :title="i18n.ResetTitle"></view-header>
    <regular-field
      v-model="email"
      v-show="!token"
      :placeholder="i18n.Email"
      :error="emailError"
      :readonly="loading"
      @input="onEmailInput"
      large
    ></regular-field>

    <regular-field
      v-model="password"
      v-show="token && !showTotp"
      :placeholder="i18n.Password"
      :error="passwordError"
      :readonly="loading"
      type="password"
      @input="onPasswordInput"
      large
    ></regular-field>

    <discret-field
      v-model="totp"
      v-show="showTotp"
      lenght="6"
      :placeholder="i18n.OneTimePassword"
      :readonly="loading"
      @input="onPasswordInput"
      large
    >
    </discret-field>

    <submit-button
      :disabled="!isValid"
      :loading="loading"
      @submit="onSubmit()"
      large
    >
      {{ i18n.Reset }}
    </submit-button>

    <nav>
      <router-link to="/login">{{ i18n.ReturnToLogin }}</router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
