<script setup lang="ts">
import { reactive, provide } from "vue";
import { Profile, apply, load } from "vue-profile/src/profile";
import WarningList from "@/components/WarningList.vue";
import BottomNavbar from "./components/BottomNavbar.vue";

const profile = reactive<Profile>(load());
provide("profile", profile);
apply(profile);
</script>

<template>
  <div id="main">
    <warning-list></warning-list>
    <regular-card class="shadow-box">
      <router-view />
    </regular-card>
  </div>
  <span class="inflate"></span>
  <bottom-navbar :profile="profile"></bottom-navbar>
</template>

<style lang="scss">
@import "fibonacci-styles";

* {
  margin: 0;
  padding: 0;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
}

body {
  min-height: 100vh;
  width: 100%;
  background: var(--color-bg-secondary);
}

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

#main {
  width: $fib-13 * 1px;
  padding-top: $fib-10 * 1px;
}

nav {
  display: flex;
  justify-content: center;

  a {
    font-size: small;
    text-align: center;

    &.primary {
      font-weight: 600;
    }
  }

  span {
    color: var(--color-border);
    margin-left: $fib-5 * 1px;
    margin-right: $fib-5 * 1px;
  }
}

.regular-card.shadow-box {
  margin-bottom: $fib-10 * 1px;
}

.regular-field {
  margin-bottom: $fib-6 * 1px;
}

button.submit {
  margin-top: $fib-7 * 1px;
  margin-bottom: $fib-6 * 1px;
}
</style>
