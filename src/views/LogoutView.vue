<script setup lang="ts">
import { onBeforeMount } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import { logout } from "@/services/rauth.rpc";
import config from "@/config.json";
import { deleteCookie } from "@/cookies";
import { redirect } from "@/queryParams";
import { useWarningStore } from "@/stores/warning";

const warningStore = useWarningStore();

onBeforeMount(() => {
  logout({})
    .then(() => {
      const key = config.TOKEN_COOKIE_KEY;
      const domain = config.ALVIDIR_BASE_URI;
      deleteCookie(key, domain);

      const targetLocation = redirect ?? config.LOGOUT_REDIRECT;
      window.location.replace(targetLocation);
    })
    .catch((warning) => {
      warningStore.add(warning);
    });
});
</script>

<template>
  <div>
    <view-header title="Log in Alvidir"></view-header>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";
</style>
