<template>
  <div id="background" v-bind:class="{ dark: dark_theme, light: !dark_theme}" >
    <!-- img alt="Vue logo" src="./assets/logo.png" -->
    <SignInCard :theme_switch="theme_switch"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SignInCard from './components/SignInCard'

export default {
  name: 'App',
  components: {
    SignInCard,
  },

  data () {
      return {
          dark_theme: false,
      }
  },

  methods: {
    theme_switch(dark_theme) {
      this.dark_theme = dark_theme
    },
  },

}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /*padding-bottom: 5%;*/
  width: 100%;
  height: 100%;
}

#background {
  width: 100%;
  height: 100%;
  padding-top: 5%;

  transition: background-color 0.25s ease-in-out;
}

.light {
  background: #FFF;
  color: #333;
}

.dark {
  background: #333;
    color: #FFF;
}

html {
  /* overflow: hidden; */
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  margin: 0px;
}

/*
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
*/
</style>