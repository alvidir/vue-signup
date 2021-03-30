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
    readonly: Boolean,
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
          count: 0,
          unit: "s",
          enabled: true,
      }
  },

  watch: {
    value: function(value) {
      if (this.onChange) {
        const over: string = this.onChange(this.id, value);
        if(over != undefined) {
          this.value = over;
        }
      }
    }
  },

  methods: { 
    getValue(): string {
      return this.value
    },

    onClick() {
      if (this.seconds && this.seconds > 0){
        this.enabled = false;
        this.clock();
      }
      
      if(this.onInnerAction) {
        this.onInnerAction();
      }
    },

    async clock() {
      this.count = this.seconds ? this.seconds : 0;
      while (this.count > 0) {
        this.count--;
        // sleep for 1000 milliseconds -> 1 second
        await new Promise( resolve => setTimeout(resolve, 1000) );
      }

      this.enabled = true;
    }
  }
})
</script>
