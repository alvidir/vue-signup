<template src='./SignInCard.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src='./SignInCard.css' >
</style>

<script>
import image_logo_dark from "../../assets/logo.dark.png"
import image_logo_light from "../../assets/logo.light.png"
import image_link_dark from "../../assets/link.dark.svg"
import image_link_light from "../../assets/link.light.svg"
import SwitchButton from '../SwitchButton'

export default {
  name: 'SignInCard',
  props: {
    theme_switch: {
      type: Function(),
      required: false,
    }
  },

  components: {
    SwitchButton,
  },

  data () {
      return {
          dark_theme: false,
          signin: true,
          loading: false,
      }
  },

  watch: {
    signin() {

    }
  },

  computed: {
    get_logo(){
      if (this.dark_theme) {
        return image_logo_light
      } else {
        return image_logo_dark
      }
    },

    get_link(){
      return this.dark_theme? image_link_light : image_link_dark
    },

    get_signin_option() {
      return this.signin? "Sign up to Alvidir" : "Sign in to Alvidir"
    },

    get_sign_button_text() {
      return this.signin? "Sign in" : "Sign up"
    },

    get_action_title() {
      return this.signin? 'Sign in with' : 'Sign up to'
    }
  },

  methods: {
    link_button_clicked(){
      
    },

    login_button_clicked() {
      this.loading = true
    },

    signup_button_clicked() {
      this.signin = !this.signin
    },

    theme_button_clicked() {
      this.dark_theme = !this.dark_theme
      if (this.theme_switch) {
        this.theme_switch(this.dark_theme)
      }
    },

  },

  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.theme_button_clicked()
    }
  }
}
</script>
