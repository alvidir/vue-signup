<template>
  <div class="navbar">
    <div class="side-container"></div>
    <div class="side-container">
      <switch-button
        @switch="spreadEvent"
        :checked="checked"
        color="var(--color-accent)"
      ></switch-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export const THEME_SWITCH_EVENT_NAME = "theme-switch";

export default defineComponent({
  name: "NavBar",

  emits: [THEME_SWITCH_EVENT_NAME],

  props: {
    checked: Boolean,
  },

  methods: {
    spreadEvent(status: boolean) {
      this.$emit(THEME_SWITCH_EVENT_NAME, status);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";
.separator {
  margin-left: $fib-5 * 1px;
  margin-right: $fib-5 * 1px;
}

.centered-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.side-container {
  @extend .centered-row;
  margin-left: $fib-7 * 1px;
  margin-right: $fib-7 * 1px;
}

.navbar {
  @extend .centered-row;
  justify-content: space-between;
  min-height: $fib-9 * 1px;
  width: 100%;
  bottom: 0px;
  background: var(--color-background-tertiary);
}
</style>
