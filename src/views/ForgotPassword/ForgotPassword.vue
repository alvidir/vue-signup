<template src="./ForgotPassword.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./ForgotPassword.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import Warning from "@/components/Warning";
import SwitchButton from "@/components/SwitchButton";
import RegexFactory from "@/utils/regex";
import DeferredField from "@/components/Field/Deferred";
import {Controller as FieldController} from "@/components/Field";
import {loginRequest} from '@/proto/user';

export default defineComponent({
  name: "ForgotPassword",
  components: {
    SwitchButton,
    Warning,
    DeferredField,
  },

  props: {
    dark: Boolean,
    onSwitchTheme: Function
  },

  data () {
      return {
          loading: false,
          submitEnabled: false,
          innerEnabled: true,

          error: {
            ident: "",
            password: "",
            
            title: "",
            subtitle: "Make sure your credentials are alright",

            cases: {
              fieldRequired: "Required field.",
              invalidCreds: "Invalid username or password",
            }
          },

          messages: [
            {
              body: "As soon as you click to Send, an email with the 6code is going to you. Provide it down below."
            }
          ]
      }
  },

  methods: {
    getIconByTheme() {
        return this.dark ? MainLogoLight : MainLogoDark;
    },

    onInnerAction() {
      this.innerEnabled = false;
    },

    submit() {
      if (!this.submitEnabled) {
        return;
      }

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
      
      this.loading = true;
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
