<template>
  <sign-up type="login" app="Alvidir" version="Alpha" :icon="`logo.${theme}.png`">
  </sign-up>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUp from './components/SignUp.vue';

export default defineComponent({
  name: 'App',
  components: {
    SignUp
  },

  data() {
    return {
      theme: "light",
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
