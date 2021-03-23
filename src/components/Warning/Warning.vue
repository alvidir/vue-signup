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
    title: String,
    subtitle: String
  }
})
</script>
