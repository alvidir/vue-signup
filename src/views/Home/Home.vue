<template src="./Home.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Home.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import Field from "@/components/Field";

export default defineComponent({
  name: "Home",
  components: {
    Field
  }
});
</script>
