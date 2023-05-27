<script setup lang="ts">
import { computed } from "vue";
import {
  Profile,
  ColorPalette,
  storeAndApply,
  switchColorPalette,
} from "vue-profile/src/profile";

interface Props {
  profile: Profile;
}

const props = defineProps<Props>();

const onSwitchColorPalette = () => {
  switchColorPalette(props.profile);
  storeAndApply(props.profile);
};

const isDarkTheme = computed({
  get: (): boolean => props.profile.palette == ColorPalette.Dark,
  set: () => onSwitchColorPalette(),
});
</script>

<template>
  <div class="navbar">
    <switch-button
      v-model="isDarkTheme"
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
