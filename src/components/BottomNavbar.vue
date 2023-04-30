<script setup lang="ts">
import { defineProps } from "vue";
import Profile from "vue-menus/src/profile";

interface Props {
  profile: Profile;
}

defineProps<Props>();
</script>

<template>
  <div class="navbar">
    <switch-button
      @switch="profile.theme.switchTheme()"
      :checked="profile.theme.isDarkTheme()"
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
