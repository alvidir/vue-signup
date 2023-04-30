<script setup lang="ts">
import { defineProps } from "vue";
import config from "@/config.json";

interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <img id="logo" :src="config.ALVIDIR_LOGO_URI" />
  <div>
    <span>{{ title }}</span>
    <small>{{ config.ALVIDIR_VERSION }}</small>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";

div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: $fib-9 * 1px;
}

span {
  font-size: x-large;
  text-align: center;
  color: var(--color-text-primary);
}

small {
  cursor: default;
  $item-color: var(--color-accent);

  width: fit-content;
  height: fit-content;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  margin-left: $fib-4 * 1px;
  padding: $fib-2 * 1px $fib-4 * 1px $fib-2 * 1px $fib-4 * 1px;
  border: 1px solid $item-color;
  border-radius: 10px;
  font-size: small;
  color: $item-color;

  &:not(:active) {
    background: transparent;
  }
}

img {
  box-sizing: border-box;
  padding: $fib-5 * 1px;
  margin-top: $fib-8 * 1px;
  margin-bottom: $fib-5 * 1px;
  height: $fib-10 * 1px;
  width: 100%;
}
</style>
