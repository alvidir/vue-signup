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
  },

  components: {},

  data () {
      return {
          value: "",
          error: "",
      }
  },

  watch: {
    value: function(value) {
      if (this.onChange) {
        const err = this.onChange(this.id, value);
        this.error = err && err.length? err : "";
      }
    }
  },

  methods: { 
    getValue() {
      return this.value
    },

    match(regex: string, msg: string): boolean {
      if (regex && this.value && !this.value.match(regex)) {
        this.error = msg && msg.length? msg : "";
        return false;
      }

      this.error = "";
      return true;
    },

    setError(msg: string) {
      this.error = msg
    }
  }
})
</script>
