<template>
  <sign-on :title="buttonTitle"
           :loading="loading"
           :email="addEmailField"
           :username="addUsernameField"
           :password="addPasswordField"
           :totp="addTotpField"
           @redirect="onRedirect"
           @submit="onSubmit">
    <template #banner>
      <app-banner version="Alpha"
              :title="actionTitle"
              :icon="`logo.${theme}.png`">
      </app-banner>
    </template>
    <template #footer>
      <sign-options :primary="'Sign up to Alvidir'"
                    :secondary="'Forgot password?'">
      </sign-options>
    </template>
  </sign-on>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppBanner from './components/AppBanner.vue'
import SignOn, {
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from './components/SignOn.vue'
import SignOptions from './components/SignOptions.vue'
import RauthService from './rauth.service'

const SIGNUP_PATH = /^\/signup$/
const LOGIN_PATH = /^\/login$/
const RESET_PATH = /^\/reset$/
const QUERY_REGEX = /\?\w.*/

const url = "http://localhost:8080"
const rauthService = new RauthService(url)

export default defineComponent({
  name: 'App',
  components: {
    AppBanner,
    SignOn,
    SignOptions
  },

  data() {
    return {
      theme: "light",
      loading: false,
      disableEmail: false,
      disablePassword: RESET_PATH.test(window.location.pathname),
      disableTotp: true
    }
  },

  computed: {
    actionTitle(): string {
      return "Sign on Alvidir"
    },

    buttonTitle(): string {
      return "Sign on"
    },

    addEmailField(): boolean {
      return !this.disableEmail && (SIGNUP_PATH.test(window.location.pathname) ||
             LOGIN_PATH.test(window.location.pathname) ||
             RESET_PATH.test(window.location.pathname))
    },

    addUsernameField(): boolean {
      return !this.disableEmail && LOGIN_PATH.test(window.location.pathname)
    },

    addPasswordField(): boolean {
      return !this.disablePassword && (SIGNUP_PATH.test(window.location.pathname) ||
             LOGIN_PATH.test(window.location.pathname)  ||
             RESET_PATH.test(window.location.pathname))
    },

    addTotpField(): boolean {
      return !this.disableTotp && LOGIN_PATH.test(window.location.pathname)
    },

  },

  methods: {
    onRedirect(path: string): void {
      let params = window.location.href.match(QUERY_REGEX)?? ""
      window.location.href = `/${path}${params}`
    },

    async onSubmit(fields: any) {
      this.loading = true

      const email = fields[FIELD_USERNAME]?? undefined
      const pwd = fields[FIELD_PASSWORD]?? undefined
      const totp = fields[FIELD_TOTP]?? undefined
      const headers = {
      }

      // const requests: {[key: string]: any} = {
      //   [TYPE_SIGNUP]: () => rauthService.signup(email, pwd, headers),
      //   [TYPE_LOGIN]: () => rauthService.login(email, pwd, totp, headers),
      // }

      //requests[this.action]()
      this.loading = false
    }
  }
});
</script>

<style lang="scss">
@import "fibonacci-styles";

* {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
}

body {
  min-height: 100vh;
  width: 100%;

  //background: white;
  background-image: url(https://images.unsplash.com/photo-1593763803214-d8dd436d9717?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80);
  background-size: cover;
  background-position: 100% 50%;
  background-repeat: no-repeat;
}

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: $fib-5 * 1vh;
}
</style>
