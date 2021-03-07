<template>
  <!-- img alt="Vue logo" src="./assets/logo.png" -->
  <SignInCard/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SignInCard from './components/SignInCard'

export default {
  name: 'App',
  components: {
    SignInCard,
  },
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  padding-bottom: 5%;
  height: fit-content;
}

html {
  /* overflow: hidden; */
  height: 100%;
}

body {
  height: fit-content;
}

@media (prefers-color-scheme: light) {
  body {
    background: #FFF;
    color: #333;
  }
}
@media (prefers-color-scheme: dark) {
  body {
    background: #333;
    color: #FFF;
  }
}

</style>