<script setup lang="ts">
import { ref } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import { Token, login } from "@/services/rauth.rpc";
import config from "@/config.json";
import { setCookie } from "@/cookies";
import { redirect } from "@/queryParams";
import { Code, Warning } from "@/warning";
import { useWarningStore } from "@/stores/warning";
import i18n from "@/i18n/en.json";

const warningStore = useWarningStore();

const user = ref("");
const password = ref("");
const totp = ref("");

const showTotp = ref(false);
const isValid = ref(false);
const loading = ref(false);

const onInput = () => {
  isValid.value =
    user.value.length > 0 &&
    password.value.length > 7 &&
    (!showTotp.value || totp.value.length > 5);
};

const onSubmit = () => {
  loading.value = true;

  login(user.value, password.value, totp.value, {})
    .then((token: Token) => {
      const key = config.TOKEN_COOKIE_KEY;
      const domain = config.ALVIDIR_BASE_URI;
      setCookie(key, token, domain);

      const targetLocation = redirect ?? config.LOGIN_REDIRECT;
      window.location.replace(targetLocation);
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
    <view-header :title="i18n.LoginTitle"></view-header>
    <regular-field
      v-model="user"
      v-show="!showTotp"
      :placeholder="i18n.UsernameOrEmail"
      :readonly="loading"
      @input="onInput"
      large
    ></regular-field>

    <regular-field
      v-model="password"
      v-show="!showTotp"
      :placeholder="i18n.Password"
      :readonly="loading"
      type="password"
      @input="onInput"
      large
    ></regular-field>

    <discret-field
      v-model="totp"
      v-show="showTotp"
      lenght="6"
      :placeholder="i18n.OneTimePassword"
      :readonly="loading"
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
      {{ i18n.Login }}
    </submit-button>

    <nav>
      <router-link to="/signup">{{ i18n.CreateAnAccount }}</router-link>
      <span>&#124;</span>
      <router-link to="/reset">{{ i18n.ForgotPassword }}</router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
