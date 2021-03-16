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
    all: {
      type: Boolean,
      required: false,
      default: false,
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
          },
      }
  },

  watch: {  },

  methods: { 
    check() {
      var nerr = 0
      if (this.all) {
        nerr += this.$refs.name.match(this.regex.name, this.errors.name)? 0 : 1
        nerr += this.$refs.email.match(this.regex.email, this.errors.email)? 0 : 1
        nerr += this.$refs.password.match(this.regex.password, this.errors.password)? 0 : 1
        nerr += this.$refs.repeat.getValue() === this.$refs.password.getValue()? 0 : 1
      } else {
        nerr += this.$refs.password.match(this.regex.password, null)? 0 : 1
        nerr += (this.$refs.email.match(this.regex.name, null) ||
                 this.$refs.email.match(this.regex.email, null))? 0 : 1
      }

      console.log(nerr)
      return nerr == 0
    },

    hasEmpty() {
      return (!this.$refs.name || this.$refs.name.getValue() === '') ||
             (!this.$refs.email || this.$refs.email.getValue() === '') ||
             (!this.$refs.password || this.$refs.password.getValue() === '') ||
             (!this.$refs.repeat || this.$refs.repeat.getValue() === '')
    },

    getContent() {
      return {
        name: this.$refs.name? this.$refs.name.getValue() : null,
        email: this.$refs.email? this.$refs.email.getValue() : null,
        password: this.$refs.password? this.$refs.password.getValue() : null,
        repeat: this.$refs.repeat? this.$refs.repeat.getValue() : null,
      }
    },

    onUpdate(id, new_value) {
      if (!new_value) {
        // called when some input gets empty
        if (id === 'password') {
          this.$refs.repeat.setError(null)
        }

        return null
      } 

      var error = null
      if (this.$refs.repeat && (id === 'password' || id === 'repeat')) {
        // checking the password and repeat fields do match
        var subject = id === 'repeat'? this.$refs.password : this.$refs.repeat
        error = subject.getValue() === new_value? null : this.errors.repeat
        this.$refs.repeat.setError(error)
        
        // the error here is for the repeat field, not for password
        error = id === 'password'? null : error
      }

      if (this.all && this.regex[id] &&
          !new_value.match(this.regex[id])) {
        error = this.errors[id]
      }

      if (this.onChange) {
        this.onChange(id, error)
      }

      return error
    },
  },

  mounted() {
  
  }
}
</script>
