<template>
  <div>
    <img :src="require(`../assets/${icon}`)" />
    <span>
      {{ title }}<small>{{ version }}</small>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBanner",

  props: {
    title: String,
    version: String,
    icon: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";
div {
  display: flex;
  flex-direction: column;
}

img {
  margin-top: $fib-7 * 1px;
  margin-bottom: $fib-6 * 1px;
  margin-left: auto;
  margin-right: auto;
  height: $fib-10 * 1px;
}

span {
  font-size: x-large;
  text-align: center;
  margin-bottom: $fib-9 * 1px;
  color: var(--color-text-primary);

  small {
    cursor: default;
    $item-color: var(--color-accent);

    position: absolute;
    width: fit-content;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
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
}
</style>
