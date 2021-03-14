<template src='./Field.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src='./Field.css' >
</style>

<script>
export default {
  name: 'Field',
  props: {
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
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
          value: '',
          error: null,
      }
  },

  watch: {
    value: function(new_val) {
      if (this.onChange) {
        this.error = this.onChange(this.id, new_val)
      }
    }
  },

  methods: { 
    getValue() {
      return this.value
    },

    match(regex, msg) {
      if (regex && this.value && !this.value.match(regex)) {
        this.error = msg
        return false
      }

      this.error = null
      return true
    }
  },

  mounted() {

  }
}
</script>
