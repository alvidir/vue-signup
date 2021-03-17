<template src='./SwitchButton.html'>
</template>

<style scoped lang="scss" src='./SwitchButton.css'>
</style>

<script lang="ts">
  export default {
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
  };
</script>