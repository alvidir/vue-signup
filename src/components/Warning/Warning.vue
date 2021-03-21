<template src='./Warning.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./Warning.scss' >
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'Warning',
  props: {
    code: {
      type: Number,
      required: false,
      default: 0,
    },
    title: {
      type: String,
      required: false,
      default: "Got some error",
    },
    subtitle: {
      type: String,
      required: false,
      default: "Some other data about the error, if any :)",
    },
  }
})
</script>
