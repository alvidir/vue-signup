<template src='./SwitchButton.html'>
</template>

<style scoped lang="scss" src='./SwitchButton.scss'>
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SwitchButton",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },

    checked: {
      type: Boolean,
      required: true,
    },
  },
});
</script>