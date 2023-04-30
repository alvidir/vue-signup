<script setup lang="ts">
import { ref } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import { Field } from "vue-fields/src/types";
import { login } from "@/services/rauth.rpc";
import config from "@/config.json";
import { setCookie } from "@/cookies";
import { redirect } from "@/queryParams";
import { Code } from "@/warning";
import { useWarningStore } from "@/stores/warning";

const warningStore = useWarningStore();

const user = ref<Field | undefined>(undefined);
const password = ref<Field | undefined>(undefined);
const totp = ref<Field | undefined>(undefined);

const showTotp = ref(false);
const isValid = ref(false);
const loading = ref(false);

const onInput = () => {
  const ident = user.value?.text() ?? "";
  const pwd = password.value?.text() ?? "";
  const tfa = totp.value?.text() ?? "";

  isValid.value =
    ident.length > 0 && pwd.length > 7 && (!showTotp.value || tfa.length > 5);
};

const onSubmit = () => {
  loading.value = true;

  const ident = user.value?.text() ?? "";
  const pwd = password.value?.text() ?? "";
  const tfa = totp.value?.text() ?? "";

  login(ident, pwd, tfa, {})
    .then((token) => {
      const key = config.TOKEN_COOKIE_KEY;
      const domain = config.ALVIDIR_BASE_URI;
      setCookie(key, token, domain);

      const targetLocation = redirect ?? config.LOGIN_REDIRECT;
      window.location.replace(targetLocation);
    })
    .catch((warning) => {
      console.log(warning);
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
    <view-header title="Log in Alvidir"></view-header>
    <regular-field
      v-show="!showTotp"
      placeholder="Username or email"
      ref="user"
      @input="onInput"
      large
    ></regular-field>

    <regular-field
      v-show="!showTotp"
      placeholder="Password"
      type="password"
      ref="password"
      @input="onInput"
      large
    ></regular-field>

    <discret-field
      v-show="showTotp"
      lenght="6"
      ref="totp"
      placeholder="One time password"
      @input="onInput"
      large
    >
    </discret-field>

    <submit-button
      :disabled="!isValid"
      :loading="loading"
      @submit="onSubmit()"
      large
    >
      Log in
    </submit-button>

    <nav>
      <router-link to="/signup">Create an account</router-link>
      <span>&#124;</span>
      <router-link to="/reset">Forgot password?</router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
