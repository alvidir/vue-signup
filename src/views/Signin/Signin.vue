<template src="./Signin.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Signin.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import LinkIconLight from "@/assets/link.light.svg";
import LinkIconDark from "@/assets/link.dark.svg";
import Warning from "@/components/Warning";
import SwitchButton from "@/components/SwitchButton";
import Field from "@/components/Field";
import Controller from "@/components/Field";

export default defineComponent({
  name: "Home",
  components: {
    SwitchButton,
    Warning,
    Field
  },

  props: {
    dark: Boolean,
    onSwitchTheme: Function
  },

  methods: {
    onChange() {
      console.log("Change")
      return "trololo"
    },

    getIconByTheme(name: string) {
      if (name === "main") {
        return this.dark ? MainLogoLight : MainLogoDark;
      } else if (name === "link") {
        return this.dark ? LinkIconLight : LinkIconDark;
      }
    }
  }
});
</script>
