<template src="./Signin.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Signin.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import Warning from "@/components/Warning";
import SwitchButton from "@/components/SwitchButton";
import Field, { Controller as FieldController } from "@/components/Field";
import RegexFactory from "@/utils/regex";
import {loginRequest} from '@/proto/user';

export default defineComponent({
  name: "Signin",
  components: {
    SwitchButton,
    Warning,
    Field
  },

  props: {
    dark: Boolean,
    onSwitchTheme: Function
  },

  data () {
      return {
          loading: false,

          error: {
            ident: "",
            password: "",
            
            title: "",
            subtitle: "Make sure your credentials are alright",

            cases: {
              fieldRequired: "Required field.",
              invalidCreds: "Invalid username or password",
            }
          }
      }
  },

  methods: {
    getIconByTheme() {
        return this.dark ? MainLogoLight : MainLogoDark;
    },

    submit() {
      this.loading = true;
      const idField = this.$refs.id as FieldController;
      if (idField.getValue().length == 0) {
        this.error.ident = this.error.cases.fieldRequired;
      } else {
        this.error.ident = "";
      }

      const pwdField = this.$refs.pwd as FieldController;
       if (pwdField.getValue().length == 0) {
        this.error.password = this.error.cases.fieldRequired;
      } else {
        this.error.password = "";
      }

      if (this.error.ident.length ||
          this.error.password.length) {
        return
      }

      if ((!RegexFactory.check('name', idField.getValue()) &&
          !RegexFactory.check('name', idField.getValue())) ||
          !RegexFactory.check('password', pwdField.getValue())){
        this.error.title = this.error.cases.invalidCreds
        return
      }
      
      loginRequest(idField.getValue(), pwdField.getValue(), "hello-world", this.callback)
    },

    async callback(err: any) {    
      if (err) {
        this.error.title = this.error.cases.invalidCreds
      } else {
        this.error.title = ""
      }
      
      this.loading = false
    }
  }
});
</script>
