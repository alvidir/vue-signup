<template src='./Warning.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./Warning.css' >
</style>

<script lang="ts">
export default {
  name: 'Warning',
  props: {
    code: {
      type: Number,
      required: false,
      default: 0,
    },
    title: {
      type: String,
      required: false,
      default: "Got some error",
    },
    subtitle: {
      type: String,
      required: false,
      default: "Some other data about the error, if any :)",
    },
  },

  components: {},

  data () {
      return {
          
      }
  },

  watch: {

  },

  computed: {  },

  methods: { 
    
  },

  mounted() {

  }
}
</script>
