<script setup lang="ts">
import { ref, computed } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import { Field } from "vue-fields/src/types";
import { reset } from "@/services/rauth.rpc";
import config from "@/config.json";
import { token } from "@/queryParams";
import { Code } from "@/warning";
import { useWarningStore } from "@/stores/warning";
import { emailRegex, passwordRegex } from "@/regex";
import router from "@/router";

const warningStore = useWarningStore();

const email = ref<Field | undefined>(undefined);
const emailError = ref("");

const password = ref<Field | undefined>(undefined);
const passwordError = ref("");

const totp = ref<Field | undefined>(undefined);

const showTotp = ref(false);
const loading = ref(false);

const isValid = computed((): boolean => {
  return (
    (!token && !!email.value?.text() && !emailError.value) ||
    (!!token && !!password.value?.text() && !passwordError.value) ||
    (showTotp.value && !!totp.value?.text())
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
  const tfa = totp.value?.text() ?? "";
  const headers = token
    ? {
        [config.JWT_HEADER]: token,
      }
    : {};

  reset(ident, pwd, tfa, headers)
    .then(() => {
      router.push("/login");
    })
    .catch((warning) => {
      if (warning === Code.ErrUnauthorized) showTotp.value = true;
      else warningStore.add(warning);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div>
    <view-header title="Recover account"></view-header>
    <regular-field
      v-show="!token"
      placeholder="Email"
      :error="emailError"
      ref="email"
      @input="onEmailInput"
      large
    ></regular-field>

    <regular-field
      v-show="token && !showTotp"
      placeholder="Password"
      :error="passwordError"
      type="password"
      ref="password"
      @input="onPasswordInput"
      large
    ></regular-field>

    <discret-field
      v-show="showTotp"
      lenght="6"
      ref="totp"
      placeholder="One time password"
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
      Reset
    </submit-button>

    <nav>
      <router-link to="/login">Return to the log in page</router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
