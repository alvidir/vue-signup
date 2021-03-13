<template>
  <div id="main" v-bind:class="{ dark: darkTheme, light: !darkTheme}" >
    <div id="separator"></div>
    <div id="wrapper">
      <SignInCard id="card" :theme-switch="themeSwitch"/>
    </div>
    <div id="separator"></div>
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
          darkTheme: false,
          label: null,
      }
  },
/* Full height */
  methods: {
    themeSwitch(darkTheme) {
      this.darkTheme = darkTheme
    },
  },

  mounted() {
    
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: transparent;
}

#main {
  width: 100%;
  height: 100%;
  transition: background-color 0.25s ease-in-out;
}

#separator {
  height: 5%;
}

#card {
  height: fit-content;
  max-width: 350px;
  min-width: 270px;
  margin-left: auto;
  margin-right: auto;
}

#wrapper {
  width: 100%;
}

.light {
  background: #FFF;
  color: #333;
}

.dark {
  background: #333;
  color: #FFF;
}

/** do not set height: 100% here!!! */
html, body {
  height: 100%;
  margin: 0 auto;
}

</style>