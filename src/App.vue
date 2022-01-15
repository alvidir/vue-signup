<template>
  <sign-on app="Alvidir" version="Alpha" :icon="`logo.${theme}.png`" :type="action"></sign-on>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignOn, {TYPE_SIGNUP, TYPE_LOGIN, TYPE_RESET} from './components/SignOn.vue'

const SIGNUP_PATH = /^\/signup$/
const LOGIN_PATH = /^\/login$/
const RESET_PATH = /^\/you-loser$/

export default defineComponent({
  name: 'App',
  components: {
    SignOn
  },

  data() {
    return {
      theme: "light",
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
