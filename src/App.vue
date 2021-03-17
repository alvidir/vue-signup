<template>
  <div id="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/signin">Signin</router-link>
  </div>
  <router-view v-bind:class="{dark: dark}"/>
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
  mounted() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.dark = true;
    }
  }
})
</script>

<style lang="scss">
@import "./scss/_globals.scss";

.light {
  $bg-primary: $bg-primary-light;
}

.dark {
  $bg-primary: $bg-primary-dark;
  background: $bg-primary;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
