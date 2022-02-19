<template>
  <div class="card shadowed">
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
             @submit="onSubmit">
    </sign-on>
    <div v-if="fetching" class="loader-container">
      <grid-loader :size="'33px'" :radius="'10px'" color="#00aa8850"></grid-loader>
    </div>
    <options v-if="showOptions"
             v-bind="optionsProps">
    </options>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import GridLoader from "vue-spinner/src/GridLoader.vue"
import SignOn, {
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from "@/components/SignOn.vue"
import Banner from "@/components/Banner.vue"
import Options from "@/components/Options.vue"
import RauthService from "@/rauth.service"

const SIGNUP_PATH = /^\/signup$/
const LOGIN_PATH = /^\/$|\/login$/ // default
const RESET_PATH = /^\/reset$/
const QUERY_PARAMS_REGEX = /\?\w.*/

const SIGNUP_PATH_ROOT = "/signup"
const LOGIN_PATH_ROOT = "/login"
const RESET_PATH_ROOT = "/reset"

const BANNER_TITLES: {[key: string]: string} = {
  [SIGNUP_PATH_ROOT]: "Sign up on Alvidir",
  [LOGIN_PATH_ROOT]: "Log in Alvidir",
  [RESET_PATH_ROOT]: "Recover account",
}

const SUBMIT_TITLES: {[key: string]: string} = {
  [SIGNUP_PATH_ROOT]: "Sign up",
  [LOGIN_PATH_ROOT]: "Log in",
  [RESET_PATH_ROOT]: "Send email",
}

const queryParams = (window.location.href.match(QUERY_PARAMS_REGEX)?? [""])[0]

const OPTIONS_PROPS: {[key: string]: unknown} = {
  [SIGNUP_PATH_ROOT]: {
    secondary: "Already have an account? Log in!",
    secondaryHref: `${LOGIN_PATH_ROOT}${queryParams}`,
  },

  [LOGIN_PATH_ROOT]: {
    primary: BANNER_TITLES[SIGNUP_PATH_ROOT],
    primaryHref: `${SIGNUP_PATH_ROOT}${queryParams}`,
    secondary: "Forgot password?",
    secondaryHref: `${RESET_PATH_ROOT}${queryParams}`
  },

  [RESET_PATH_ROOT]: {
    secondary: "Return to the log in page",
    secondaryHref: `${LOGIN_PATH_ROOT}${queryParams}`,
  },
}

const rauthService = new RauthService(process.env.VUE_APP_RAUTH_URI)

export default defineComponent({
  name: "App",
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
      fetching: false,
      disableEmail: false,
      disablePassword: RESET_PATH.test(window.location.pathname),
      disableTotp: true,
    }
  },

  mounted() {
    this.fetching = !!this.token
    if (!this.fetching) return

    this.onSubmit({}).then(() => {
      this.fetching = false
      if (RESET_PATH.test(window.location.pathname)) {
        window.location.href = LOGIN_PATH_ROOT
        return
      }

      //window.location.replace(process.env.VUE_APP_DEFAULT_REDIRECT)
    })
  },

  computed: {
    token(): string | undefined {
      if (!queryParams) return undefined
      
      let paramsByKey: {[key: string]: string} = {} 
      queryParams.match(/\w=\w*/)?.forEach((param: string) => {
        const item = param.split("=")
        paramsByKey[item[0]] = item[1]
      });


      return paramsByKey[process.env.VUE_APP_TOKEN_QUERY_PARAM]
    },

    bannerTitle(): string {
      return BANNER_TITLES[window.location.pathname]?? BANNER_TITLES[LOGIN_PATH_ROOT]

    },

    submitTitle(): string {
      return SUBMIT_TITLES[window.location.pathname]?? SUBMIT_TITLES[LOGIN_PATH_ROOT]
    },

    optionsProps(): unknown {
      return OPTIONS_PROPS[window.location.pathname]?? OPTIONS_PROPS[LOGIN_PATH_ROOT]
    },

    showSignOn(): boolean {
      return !this.fetching
    },

    showOptions(): boolean {
      const pathname = window.location.pathname
      return !this.fetching && (SIGNUP_PATH.test(pathname) ||
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
    hash(data: string): string {
      let hash = 0;
      for(let i = 0; i < data.length; i++) 
            hash = Math.imul(31, hash) + data.charCodeAt(i) | 0;

      return hash.toString(64);
    },

    async onSubmit(fields: any) {
      this.loading = true

      const email = fields[FIELD_USERNAME]?? undefined
      const pwd = fields[FIELD_PASSWORD]?? undefined
      const totp = fields[FIELD_TOTP]?? undefined
      const headers: {[key: string]: string} = {}
      
      if (this.token) {
        const tokenHeader = process.env.VUE_APP_JWT_HEADER
        headers[tokenHeader] = this.token
      }

      const securePwd = pwd? this.hash(pwd) : ""
      const requests: {[key: string]: any} = {
        [SIGNUP_PATH_ROOT]: () => rauthService.signup(email, securePwd, headers),
        [LOGIN_PATH_ROOT]: () => rauthService.login(email, securePwd, totp, headers),
        [RESET_PATH_ROOT]: () => rauthService.reset(email, securePwd, totp, headers),
      }

      requests[window.location.pathname]()
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
  font-family: "Raleway", Helvetica, Arial, sans-serif;
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
    -moz-box-shadow:     0px 2px 3px 1px #00000020 !important;
    -webkit-box-shadow:  0px 2px 3px 1px #00000020 !important;
    box-shadow:          0px 2px 3px 1px #00000020 !important;
  }
}

</style>
