<template src='./Banner.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./Banner.scss' >
</style>

<script lang="ts">
import { defineComponent } from "vue";
import logoDark from "../../assets/logo.dark.png"
import logoLight from "../../assets/logo.light.png"
import linkDark from "../../assets/link.dark.svg"
import linkLight from "../../assets/link.light.svg"

export default defineComponent({
  name: 'Banner',
  props: {
    name: {
      type: String,
      required: false,
      default:'Alvidir'
    },
    title: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: {},

  data () {
      return {  }
  },

  watch: {  },

  computed: {
    getMainLogo(){
      if (this.dark) {
        return logoLight
      } else {
        return logoDark
      }
    },

    getLinkIcon(){
      return this.dark? linkLight : linkDark
    },
  },

  methods: { 
    onClick() {

    }
  },

  mounted() {

  }
})
</script>
