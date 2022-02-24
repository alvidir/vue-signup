<template>
  <div class="container">
    <warning v-for="(warning, index) in warnings"
             :key ="index"
             class="warning-message"
             v-bind="warning"
             @close="quitWarning(index)">
    </warning>
    <div class="card shadowed">
      <banner version="Alpha"
              :title="bannerTitle"
              :icon="`logo.${theme}.png`">
      </banner>
      <sign-on :title="submitTitle"
               :loading="fetching"
               :email="addEmailField"
               :username="addUsernameField"
               :password="addPasswordField"
               :totp="addTotpField"
               :disable-errors="!isSignup"
               @submit="onSubmit">
      </sign-on>
      <options v-if="showOptions"
               v-bind="optionsProps">
      </options>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SignOn, {
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from "@/components/SignOn.vue"
import Banner from "@/components/Banner.vue"
import Options from "@/components/Options.vue"
import Warning from "@/components/Warning.vue"
import RauthService, {ResponseHandler, Error} from "@/rauth.service"
import * as constants from "@/constants"


export default defineComponent({
  name: "App",
  components: {
    Banner,
    SignOn,
    Options,
    Warning,
  },

  data() {
    return {
      theme: "light",
      fetching: false,
      disableEmail: false,
      disablePassword: constants.RESET_PATH.test(window.location.pathname),
      disableTotp: true,
      rauthService: new RauthService(process.env.VUE_APP_RAUTH_URI, this as unknown as ResponseHandler),
      warnings: [] as unknown[],
    }
  },

  created() {
    if (this.token) this.onSubmit({})
  },

  computed: {
    token(): string | undefined {
      if (!constants.queryParams) return undefined
      
      let paramsByKey: {[key: string]: string} = {} 
      constants.queryParams.match(/\w=\w*/)?.forEach((param: string) => {
        const item = param.split("=")
        paramsByKey[item[0]] = item[1]
      });


      return paramsByKey[process.env.VUE_APP_TOKEN_QUERY_PARAM]
    },

    redirect(): string | undefined {
      if (!constants.queryParams) return undefined
      
      let paramsByKey: {[key: string]: string} = {} 
      constants.queryParams.match(/\w=\w*/)?.forEach((param: string) => {
        const item = param.split("=")
        paramsByKey[item[0]] = item[1]
      });


      return btoa(paramsByKey[process.env.VUE_APP_REDIRECT_QUERY_PARAM])
    },

    isSignup(): boolean {
      return constants.SIGNUP_PATH.test(window.location.pathname)
    },

    bannerTitle(): string {
      return constants.BANNER_TITLES[window.location.pathname]?? constants.BANNER_TITLES[constants.LOGIN_PATH_ROOT]

    },

    submitTitle(): string {
      return constants.SUBMIT_TITLES[window.location.pathname]?? constants.SUBMIT_TITLES[constants.LOGIN_PATH_ROOT]
    },

    optionsProps(): unknown {
      return constants.OPTIONS_PROPS[window.location.pathname]?? constants.OPTIONS_PROPS[constants.LOGIN_PATH_ROOT]
    },

    showOptions(): boolean {
      const pathname = window.location.pathname
      return !this.fetching && (constants.SIGNUP_PATH.test(pathname) ||
             constants.LOGIN_PATH.test(pathname)  ||
             constants.RESET_PATH.test(pathname))
    },

    addEmailField(): boolean {
      const pathname = window.location.pathname
      return !this.disableEmail && (constants.SIGNUP_PATH.test(pathname) ||
             constants.LOGIN_PATH.test(pathname) ||
             constants.RESET_PATH.test(pathname))
    },

    addUsernameField(): boolean {
      return !this.disableEmail && constants.LOGIN_PATH.test(window.location.pathname)
    },

    addPasswordField(): boolean {
      const pathname = window.location.pathname
      return !this.disablePassword && (constants.SIGNUP_PATH.test(pathname) ||
             constants.LOGIN_PATH.test(pathname)  ||
             constants.RESET_PATH.test(pathname))
    },

    addTotpField(): boolean {
      return !this.disableTotp && constants.LOGIN_PATH.test(window.location.pathname)
    },

  },

  methods: {
    async onSubmit(fields: any) {
      this.fetching = true

      const email = fields[FIELD_USERNAME]?? undefined
      const pwd = fields[FIELD_PASSWORD]?? undefined
      const totp = fields[FIELD_TOTP]?? undefined
      const headers: {[key: string]: string} = {}
      
      if (this.token) {
        const tokenHeader = process.env.VUE_APP_JWT_HEADER
        headers[tokenHeader] = this.token
      }

      const requests: {[key: string]: any} = {
        [constants.SIGNUP_PATH_ROOT]: () => this.rauthService.signup(email, pwd, headers),
        [constants.LOGIN_PATH_ROOT]: () => this.rauthService.login(email, pwd, totp, headers),
        [constants.RESET_PATH_ROOT]: () => this.rauthService.reset(email, pwd, totp, headers),
      }

      let pathname = window.location.pathname
      if ( constants.LOGIN_PATH.test(pathname))
        pathname = constants.LOGIN_PATH_ROOT
      
      requests[pathname]()
    },

    performRedirect(): void {
      let targetLocation = this.redirect?? process.env.VUE_APP_DEFAULT_REDIRECT
      window.location.replace(targetLocation)
    },

    onResponseError(error: Error): void {
      this.fetching = false
      
      let pathname = window.location.pathname
      if ( constants.LOGIN_PATH.test(pathname))
        pathname = constants.LOGIN_PATH_ROOT
      
      const props = constants.WARNING_PROPS[pathname][error]
      this.warnings.unshift(props)
    },

    onResponseSuccess(response: any): void {
      this.fetching = false

      let pathname = window.location.pathname
      if (constants.RESET_PATH.test(pathname)) {
        window.location.href = constants.LOGIN_PATH_ROOT
        return
      }
      
      if (constants.LOGIN_PATH.test(pathname))
        pathname = constants.LOGIN_PATH_ROOT

      this.performRedirect()
    },

    quitWarning(index: number) {
      this.warnings.splice(index, 1)
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
  background: #eeeeee;
}

.container {
  width: $fib-13 * 1px;
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

.warning-message {
  margin-bottom: $fib-7 * 1px;
}

</style>
