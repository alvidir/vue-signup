<template src='./Card.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./Card.scss' >
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'Card',
  props: {
    title: String,
    subtitle: String,
    body: String,
    color: String
  },

  methods: {
    getCustomStyle(flags: string): string {
      let styles = "";
      if (flags.indexOf("tbg") != -1) {
        styles += "background-color: " + (this.color? this.color : "#808080") + "10;";
      } else if (flags.indexOf("bg") != -1) {
        styles += "background-color: " + (this.color? this.color : "#808080") + ";";
      } 

      if (flags.indexOf("bd") != -1) {
        styles += "border-color: " + (this.color? this.color : "#808080") + ";";
      }

      return styles;
    }
  }
})
</script>
