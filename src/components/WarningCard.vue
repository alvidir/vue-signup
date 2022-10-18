<template>
  <div class="warning">
    <div class="flag"></div>
    <div class="content">
      <div class="text">
        <span v-if="title">{{ title }}</span>
        <p v-if="text">{{ text }}</p>
      </div>
      <span class="space-between"></span>
      <button class="bx bx-x" @click="onCloseClicked"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export const CLOSE_EVENT_NAME = "close";

export default defineComponent({
  name: "WarningCard",

  emits: [CLOSE_EVENT_NAME],

  props: {
    title: String,
    text: String,
    color: {
      type: String,
      default: "var(--color-accent)",
    },
  },

  methods: {
    onCloseClicked(): void {
      this.$emit(CLOSE_EVENT_NAME);
    },
  },
});
</script>

<style scoped lang="scss">
@import "fibonacci-styles";

$base-color: unquote(v-bind(color));

.warning {
  display: flex;
  flex-direction: row;
  width: 100%;

  .flag,
  .content {
    border: 1px solid $base-color;
  }

  .flag {
    @extend .round-corners, .left-only, .fib-5;
    width: $fib-5 * 1px;
    background: $base-color;
    border: 1px solid $base-color;
  }

  .content {
    @extend .round-corners, .right-only, .fib-5;

    display: flex;
    flex-direction: row;

    width: 100%;
    padding: $fib-5 * 1px;
    color: $base-color;
    background: var(--color-background-primary);
    margin-top: auto;
    margin-bottom: auto;

    .space-between {
      flex: 1;
    }

    span {
      font-weight: 600;
      margin-right: $fib-5 * 1px;
    }

    p {
      margin-top: $fib-5 * 1px;
      margin-right: $fib-5 * 1px;
      font-size: $fib-6 * 1px;
    }

    button {
      cursor: pointer;
      background: none;
      color: $base-color;
      border: none;
      font-size: $fib-7 * 1px;
    }
  }
}
</style>
