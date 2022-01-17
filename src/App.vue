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
import { signup, login, reset } from './rauth.service'

const SIGNUP_PATH = /^\/signup$/
const LOGIN_PATH = /^\/login$/
const RESET_PATH = /^\/reset$/
const QUERY_REGEX = /\?\w.*/

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

      let email = fields[FIELD_USERNAME]?? undefined
      let pwd = fields[FIELD_PASSWORD]?? undefined
      let totp = fields[FIELD_TOTP]?? undefined

      const requests: {[key: string]: any} = {
        [TYPE_SIGNUP]: signup,
        [TYPE_LOGIN]: login,
        [TYPE_RESET]: reset,
      }

      requests[this.action](email, pwd, totp)
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
