<template src='./SwitchButton.html'>
</template>

<style scoped src='./SwitchButton.css'>
</style>

<script>
  export default {
    name: "Switch",
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