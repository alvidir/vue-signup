<template>
  <sign-up email="login">
  </sign-up>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUp from './components/SignUp.vue';

export default defineComponent({
  name: 'App',
  components: {
    SignUp
  }
});
</script>

<style lang="scss">
@import "global.scss";

* {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
}

body {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

</style>
