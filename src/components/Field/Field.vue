<template src="./Field.html" >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Field.scss" >
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Field",
  props: {
    id: String,
    dark: Boolean,
    onChange: Function,
    max: Number,
    line: {
      type: String,
      default: "single",
    },
    type: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
      required: true,
    },
    error: String
  },

  components: {},

  data () {
      return {
          value: "",
      }
  },

  watch: {
    value: function(value) {
      if (this.onChange) {
        const over: string = this.onChange(this.id, value);
        if (over != undefined) {
          this.value = over;
        }
      }
    }
  },

  methods: { 
    getValue(): string {
      return this.value
    },

    clear() {
      this.value = "";
    }
  }
})
</script>
