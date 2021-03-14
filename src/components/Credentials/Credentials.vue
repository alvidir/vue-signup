<template src='./Credentials.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src='./Credentials.css' >
</style>

<script>
import Field from '../Field'

export default {
  name: 'Credentials',
  props: {
    hide: {
      type: Boolean,
      required: false,
      default: false,
    },

    dark: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  components: {
    Field,
  },

  data () {
      return {
          errors: {
            name: "Special characters are not allowed in your name. Neather more than 32 characters.",
            email: "This does not looks like an email...",
            password: "Your password must contains upper and lower case, as well as numbers and special characters.",
            repeat: "Does not match your password.",
          },

          regex: {
            name: `^[-_A-Za-z0-9.]{1,32}$`,
            email: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,32}$`,
            password: `^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,32}$`,
            repeat: null,
          }
      }
  },

  watch: {  },

  methods: { 
    isOk() {
      var failed = false
      this.regex.array.forEach(element => {
        if (this.$refs[element.key] && !this.$refs[element.key].match(element.value, this.errors[element.key])) {
          failed = true 
        }
      });

      return failed
    },

    getContent() {
      return {
        name: this.$refs.name? this.$refs.name.getValue() : null,
        email: this.$refs.email? this.$refs.email.getValue() : null,
        password: this.$refs.password? this.$refs.password.getValue() : null,
        repeat: this.$refs.repeat? this.$refs.repeat.getValue() : null,
      }
    },

    onFieldChanged(id, new_value) {
      if (!new_value || new_value.lenght == 0) {
        return null
      } 

      if (id === 'password') {
        if (new_value) {
          this.regex.repeat = '^' + new_value + '$'
        } else {
          this.regex.repeat = null
        }

        if (this.$refs.repeat) {
          this.$refs.repeat.match(this.regex.repeat, this.errors.repeat)
        }
      }

      if (!this.hide && !new_value.match(this.regex[id])) {
        return this.errors[id]
      }

      return null
    },
  },

  mounted() {

  }
}
</script>
