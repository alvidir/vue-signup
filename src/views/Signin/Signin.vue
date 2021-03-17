<template src="./Signin.html">
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Signin.scss">
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Field",
  props: {
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    line: {
      type: String,
      required: false,
      default: "single",
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    onChange: {
      type: Function,
      required: false,
    }
  },

  components: {},

  data () {
      return {
          value: "",
          error: "",
      }
  },

  watch: {
    value: function(newVal: string) {
      if (this.onChange) {
        this.error = this.onChange(this.id, newVal)
      }
    }
  },

  methods: { 
    getValue() {
      return this.value
    },

    match(regex: string, msg: string): boolean {
      if (regex && this.value && !this.value.match(regex)) {
        this.error = msg
        return false
      }

      this.error = ""
      return true
    },

    setError(msg: string): void {
      this.error = msg
    }
  },
});
</script>
