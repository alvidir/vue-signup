<template>
  <div class="card">
    <banner version="Alpha"
            :title="bannerTitle"
            :icon="`logo.${theme}.png`">
    </banner>
    <sign-on v-if="showSignOn"
             :title="submitTitle"
             :loading="loading"
             :email="addEmailField"
             :username="addUsernameField"
             :password="addPasswordField"
             :totp="addTotpField"
             @redirect="onRedirect"
             @submit="onSubmit">
    </sign-on>
    <div v-if="verifying" class="loader-container">
      <grid-loader :size="'33px'" :radius="'10px'" color="#00aa8880"></grid-loader>
    </div>
    <options v-if="showOptions"
             v-bind="optionsProps">
    </options>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GridLoader from 'vue-spinner/src/GridLoader.vue'
import SignOn, {
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from './components/SignOn.vue'
import Banner from './components/Banner.vue'
import Options from './components/Options.vue'
import RauthService from './rauth.service'

const SIGNUP_PATH = /^\/signup$/
const LOGIN_PATH = /^\/login$/
const RESET_PATH = /^\/reset$/
const VERIFY_PATH = /^\/verify$/
const QUERY_PARAMS_REGEX = /\?\w.*/

const SIGNUP_PATH_ROOT = "/signup"
const LOGIN_PATH_ROOT = "/login"
const RESET_PATH_ROOT = "/reset"
const VERIFY_PATH_ROOT = "/verify"

const BANNER_TITLES: {[key: string]: string} = {
  [SIGNUP_PATH_ROOT]: "Sign up on Alvidir",
  [LOGIN_PATH_ROOT]: "Log in Alvidir",
  [RESET_PATH_ROOT]: "Recover account",
  [VERIFY_PATH_ROOT]: "Creating account",
}

const SUBMIT_TITLES: {[key: string]: string} = {
  [SIGNUP_PATH_ROOT]: "Sign up",
  [LOGIN_PATH_ROOT]: "Log in",
  [RESET_PATH_ROOT]: "Send email",
}

const OPTIONS_PROPS: {[key: string]: unknown} = {
  [SIGNUP_PATH_ROOT]: {
    secondary: "Already have an account? Log in!",
    secondaryHref: LOGIN_PATH_ROOT,
  },

  [LOGIN_PATH_ROOT]: {
    primary: BANNER_TITLES[SIGNUP_PATH_ROOT],
    primaryHref: SIGNUP_PATH_ROOT,
    secondary: "Forgot password?",
    secondaryHref: RESET_PATH_ROOT
  },

  [RESET_PATH_ROOT]: {
    secondary: "Return to the log in page",
    secondaryHref: LOGIN_PATH_ROOT,
  },
}

const url = "http://localhost:8080"
const rauthService = new RauthService(url)

export default defineComponent({
  name: 'App',
  components: {
    Banner,
    SignOn,
    Options,
    GridLoader
  },

  data() {
    return {
      theme: "light",
      loading: false,
      disableEmail: false,
      disablePassword: RESET_PATH.test(window.location.pathname),
      disableTotp: true,
      verifying: VERIFY_PATH.test(window.location.pathname),
    }
  },

  computed: {
    bannerTitle(): string {
      console.log(window.location.pathname)
      return BANNER_TITLES[window.location.pathname]

    },

    submitTitle(): string {
      return SUBMIT_TITLES[window.location.pathname]
    },

    optionsProps(): unknown {
      return OPTIONS_PROPS[window.location.pathname]
    },

    showSignOn(): boolean {
      return !this.verifying && !VERIFY_PATH.test(window.location.pathname)
    },

    showOptions(): boolean {
      const pathname = window.location.pathname
      return !this.verifying && (SIGNUP_PATH.test(pathname) ||
             LOGIN_PATH.test(pathname)  ||
             RESET_PATH.test(pathname))
    },

    addEmailField(): boolean {
      const pathname = window.location.pathname
      return !this.disableEmail && (SIGNUP_PATH.test(pathname) ||
             LOGIN_PATH.test(pathname) ||
             RESET_PATH.test(pathname))
    },

    addUsernameField(): boolean {
      return !this.disableEmail && LOGIN_PATH.test(window.location.pathname)
    },

    addPasswordField(): boolean {
      const pathname = window.location.pathname
      return !this.disablePassword && (SIGNUP_PATH.test(pathname) ||
             LOGIN_PATH.test(pathname)  ||
             RESET_PATH.test(pathname))
    },

    addTotpField(): boolean {
      return !this.disableTotp && LOGIN_PATH.test(window.location.pathname)
    },

  },

  methods: {
    onRedirect(path: string): void {
      let params = window.location.href.match(QUERY_PARAMS_REGEX)?? ""
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

.centered_column {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#app {
  @extend .centered_column;
  padding-top: $fib-5 * 1vh;
}

.loader-container {
  @extend .centered_column;
  padding-bottom: $fib-9 * 1px; 
}

.card {
  @extend .round-corners, .fib-6;
  
  width: $fib-13 * 1px;
  padding-top: $fib-7 * 1px;
  padding-bottom: $fib-7 * 1px;
  border: 1px solid;
  border-color: find-fib-color(disabled);
  background: white;

  &.shadowed {
    -moz-box-shadow:     0px 3px 3px 1px #00000020;
    -webkit-box-shadow:  0px 3px 3px 1px #00000020;
    box-shadow:          0px 3px 3px 1px #00000020;
  }
}

</style>
