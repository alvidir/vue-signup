<template src='./SignInCard.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src='./SignInCard.css' >
</style>

<script>
import logoDark from "../../assets/logo.dark.png"
import logoLight from "../../assets/logo.light.png"
import linkDark from "../../assets/link.dark.svg"
import linkLight from "../../assets/link.light.svg"
import SwitchButton from '../SwitchButton'
import Warning from '../warning'
import Field from '../Field'

var proto = require('../../services/user')

export default {
  name: 'SignInCard',
  props: {
    themeSwitch: {
      type: Function,
      required: false,
    },
    appLabel: {
      type: String,
      required: false,
    }
  },

  components: {
    SwitchButton,
    Field,
    Warning,
  },

  data () {
      return {
          dark: false,
          signin: true,
          loading: false,

          error: {
            code: null,
            title: null,
            subtitle: null,
          },

          regex: {
            name: `^[-_A-Za-z0-9.]{1,32}$`,
            email: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,32}$`,
            password: `^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,32}$`,
            repeat: null,
          }
      }
  },

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
    linkButtonClicked(){
      
    },

    submit() {
      this.loading = true
      var name = this.$refs.email.getValue()
      var email = this.$refs.password.getValue()

      if (this.signin) {
        proto.login_request(email, password, "hello-world", this.callback)
      } else {
        var password = this.$refs.name.getValue()
        // var repeat = this.$refs.repeat.getValue()
        proto.signup_request(name, email, password, this.callback)
      }
    },

    optionSwitch() {
      this.signin = !this.signin
    },

    switchTheme() {
      this.dark = !this.dark
      if (this.themeSwitch) {
        this.themeSwitch(this.dark)
      }
    },

    onFieldChanged(id, new_value) {
      if (!new_value || new_value.lenght == 0) {
        return null
      } 

      if (id === 'password') {
        this.regex.repeat = '^' + new_value + '$'
      }

      if (!this.signin && !new_value.match(this.regex[id])) {
        if (id === 'name') {
          return "Special characters are not allowed in your nickname"
        } else if (id === 'email') {
          return "This does not looks like an email..."
        } else if (id === 'password') {
          return "Your password must contains upper and lower case, as well as numbers and special characters"
        } else if (id === 'repeat') {
          return "Does not match your password"
        }
      }

      return null
    },

    async callback(err) {      
      if (err) {
        console.log(`${err.code} | ${err.message}`)
        this.error.code = err.code;
        this.error.title = "Some error"
        this.error.subtitle = err.message
      } else {
        this.error.code = 0
      }
      
      this.loading = false
    }
  },

  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.switchTheme()
    }
  }
}
</script>
