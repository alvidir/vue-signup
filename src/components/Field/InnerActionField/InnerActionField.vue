<template src="./InnerActionField.html" >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./InnerActionField.scss" >
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "InnerActionField",
  props: {
    id: String,
    dark: Boolean,
    onChange: Function,
    onInnerAction: Function,
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
    inner: {
      type: String,
      required: false,
      default: "Send",
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true,
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
        this.onChange(this.id, value);
      }
    }
  },

  methods: { 
    getValue(): string {
      return this.value
    },

    onClick() {
      if(this.onInnerAction) {
        this.onInnerAction();
      }
    }
  }
})
</script>
