<template src='./SignInCard.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./SignInCard.css' >
</style>

<script lang="ts">
import Banner from '../Banner'
import SwitchButton from '../SwitchButton'
import Warning from '../warning'
import Credentials from '../Credentials'

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
    Banner,
    SwitchButton,
    Credentials,
    Warning,
  },

  data () {
      return {
          dark: false,
          signin: true,
          loading: false,
          enabled: false,

          error: {
            code: null,
            title: null,
            subtitle: null,
            cases: {
              name: "Special characters are not allowed in your name. Neather more than 32 characters.",
              email: "This does not looks like an email...",
              password: "Your password must contains upper and lower case, as well as numbers and special characters.",
              repeat: "Does not match your password.",
            }
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
    
  },

  methods: {
    submit() {
      this.loading = true
      var content = this.$refs.credentials.getContent()

      if (this.signin) {
        proto.login_request(content.email, content.password, "hello-world", this.callback)
      } else {
        proto.signup_request(content.name, content.email, content.password, this.callback)
      }
    },

    optionSwitch() {
      this.signin = !this.signin
      this.$nextTick(function () {
        // container IS finished rendering to the DOM
        this.$refs.credentials.check()
      })
    },

    switchTheme() {
      this.dark = !this.dark
      if (this.themeSwitch) {
        this.themeSwitch(this.dark)
      }
    },

    onChange(id, error) {
      if (error) {
        this.enabled = false
        return
      }

      if (!this.signin && this.$refs.credentials) {
        this.enabled = !this.$refs.credentials.hasEmpty() &&
                        this.$refs.credentials.check()
      }
    },

    async callback(err) {      
      if (err) {
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
