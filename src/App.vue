<template>
  <!-- div id="nav" -->
  <!-- router-link to="/">Home</router-link-->
  <!-- router-link to="/signin">Signin</router-link-->
  <!-- /div -->
  <router-view :dark="dark" :onSwitchTheme="onSwitchTheme" />
</template>

<script lang="tp">
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "App",
  data() {
    return {
      dark: false
    }
  },

  methods: {
    onSwitchTheme() {
      this.dark = !this.dark
      if (this.dark) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }
    }
  },

  mounted() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        && !this.dark) {
      document.body.classList.add("light"); // default theme
    } else {
      this.onSwitchTheme()
    }
  }
})
</script>

<style lang="scss">
body {
  @import "@/scss/_globals.scss";
  background-color: $bg-primary;
  transition: background-color $lapse-primary;

  &.dark {
    @import "@/scss/_global.dark.scss";
    background: $bg-primary;
  }

  &.light {
    @import "@/scss/_global.light.scss";
    background: $bg-primary;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}

#main {
  transition: background-color 0.25s ease-in-out;
}

</style>
