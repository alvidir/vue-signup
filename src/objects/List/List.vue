<template src='./List.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./List.scss' >
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'List',
  props: {
    id: String
  },

  data () {
      return {
          
      }
  },

  methods: {
    getCustomStyle(flags: string): string {
      let styles = "";
      if (flags.indexOf("tbg") != -1) {
        styles += "background-color: " + this.color + "10;";
      } else if (flags.indexOf("bg") != -1) {
        styles += "background-color: " + this.color + ";";
      } 

      if (flags.indexOf("bd") != -1) {
        styles += "border-color: " + this.color + ";";
      }

      return styles;
    }
  }
})
</script>
