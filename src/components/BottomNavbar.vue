<script setup lang="ts">
import { inject } from "vue";
import { Profile, Theme, storeAndApply } from "vue-profile/src/profile";

const profile = inject<Profile>("profile");

const switchTheme = () => {
  if (!profile) return;

  let next = {
    [Theme.Dark]: Theme.Light,
    [Theme.Light]: Theme.Dark,
  };

  profile.theme = next[profile.theme ?? Theme.Light];
  storeAndApply(profile);
};
</script>

<template>
  <div class="navbar">
    <switch-button
      @switch="switchTheme()"
      :checked="profile?.theme == Theme.Dark"
      color="var(--color-accent)"
    ></switch-button>
    <i class="bx bxs-moon"></i>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";
i {
  color: var(--color-text-secondary);
  margin: 10px;
}

.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  height: $fib-9 * 1px;
  width: 100%;
  border-top: 1px solid;
  border-color: var(--color-border-disabled);
  background: var(--color-bg-secondary);
  margin-top: auto;
  padding: $fib-6 * 1px;
  box-sizing: border-box;
}
</style>
