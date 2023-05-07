<script setup lang="ts">
import { logout } from "@/services/rauth.rpc";
import config from "@/config.json";
import { deleteCookie } from "@/cookies";
import { redirect } from "@/queryParams";
import { useWarningStore } from "@/stores/warning";
import { Warning } from "@/warning";
import i18n from "@/i18n/en.json";

const warningStore = useWarningStore();

logout({})
  .then(() => {
    const key = config.TOKEN_COOKIE_KEY;
    const domain = config.ALVIDIR_BASE_URI;
    deleteCookie(key, domain);
    const targetLocation = redirect ?? config.LOGOUT_REDIRECT;
    window.location.replace(targetLocation);
  })
  .catch((warning: Warning) => {
    warningStore.add(warning);
  });
</script>

<template>
  <div>
    <img :src="config.DAWN_ICON_URI" :alt="i18n.LogoutTitle" />
    <p>{{ i18n.LogoutTitle }}</p>
    <span>{{ i18n.HopeToSeeYouSoon }} <i class="bx bx-happy-beaming"></i></span>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: 1;
}

img {
  height: $fib-11 * 1px;
}

p {
  margin-top: $fib-8 * 1px;
  text-align: center;
  color: var(--color-text-primary);
  font-size: x-large;
}

span {
  width: 100%;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: medium;
  margin-top: $fib-4 * 1px;
}
</style>
