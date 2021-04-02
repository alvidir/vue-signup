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
    callback: Function,
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
          secs: 0,
          mins: 0,
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

    clear() {
      this.value = "";
    },

    onClick() {
      let doClock = true;
      if(this.onInnerAction) {
        doClock = this.onInnerAction();
      }

      if (doClock && this.seconds && this.seconds > 0){
        this.enabled = false;
        this.clock();
      }
    },

    async clock() {
      const mind = this.seconds? this.seconds % (60 * 60) : 0;
      this.mins = Math.floor(mind / 60);

      const secd = mind % 60;
      this.secs = Math.ceil(secd);

      while (this.mins + this.secs > 0) {
        if (this.secs <= 0 && this.mins > 0) {
          this.secs = 60;
          this.mins--;
        }
        
        // sleep for 1000 milliseconds -> 1 second
        this.secs--;
        await new Promise( resolve => setTimeout(resolve, 1000) );
      }

      this.enabled = true;
      if (this.callback) {
        this.callback();
      }
    }
  }
})
</script>
