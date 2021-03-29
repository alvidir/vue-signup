<template src="./Deferred.html" >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Deferred.scss" >
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Deferred",
  props: {
    id: String,
    dark: Boolean,
    onChange: Function,
    onInnerAction: Function,
    max: Number,
    seconds: Number,
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
    error: String
  },

  components: {},

  data () {
      return {
          value: "",
          enabled: true,
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
      this.enabled = false;
      if(this.onInnerAction) {
        this.onInnerAction();
      }
    }
  }
})
</script>
