<template>
  <sign-on app="Alvidir"
           version="Alpha"
           :loading="loading"
           :icon="`logo.${theme}.png`"
           :type="action"
           @redirect="onRedirect"
           @submit="onSubmit">
  </sign-on>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignOn, {
  TYPE_SIGNUP, 
  TYPE_LOGIN,
  TYPE_RESET,
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from './components/SignOn.vue'
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
    SignOn
  },

  data() {
    return {
      theme: "light",
      loading: false,
    }
  },

  computed: {
    action(): string {
      const path = window.location.pathname
      return SIGNUP_PATH.test(path)? TYPE_SIGNUP :
             LOGIN_PATH.test(path)? TYPE_LOGIN :
             RESET_PATH.test(path)? TYPE_RESET :
             TYPE_LOGIN

    }
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

      const requests: {[key: string]: any} = {
        [TYPE_SIGNUP]: () => rauthService.signup(email, pwd, headers),
        [TYPE_LOGIN]: () => rauthService.login(email, pwd, totp, headers),
      }

      requests[this.action]()
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
  background: #eeeeee;
  min-height: 100vh;
  width: 100%;
}

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: $fib-5 * 1vh;
}

</style>
