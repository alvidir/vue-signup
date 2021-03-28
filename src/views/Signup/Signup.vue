<template src="./Signup.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Signup.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import CryptoJS from "crypto-js";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import Warning from "@/components/Warning";
import SwitchButton from "@/components/SwitchButton";
import Field, { Controller as FieldController } from "@/components/Field";
import RegexFactory from "@/utils/regex";
import {signupRequest} from '@/proto/user';

export default defineComponent({
  name: "Signup",
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
            name: "",
            email: "",
            password: "",
            repeat: "",

            title: "",
            subtitle: "Make sure your credentials are alright",

            cases: {
              fieldRequired: "Required field.",
              name: "Special characters are not allowed in your name. Neather more than 32 characters.",
              email: "This does not looks like an email...",
              password: "Your password must contains upper and lower case, as well as numbers and special characters.",
              repeat: "Does not match your password.",
            }
          }
      }
  },

  methods: {
    getIconByTheme() {
        return this.dark ? MainLogoLight : MainLogoDark;
    },

    onChange(id: string, value: string): any {
      let pwdField: FieldController;
      let repeatField: FieldController;
      let err = "";

      switch (id) {
        case 'name':
          err = !value || RegexFactory.check('name', value)? "" : this.error.cases.name;
          this.error.name = err;
          break;

        case 'email': 
          err = !value || RegexFactory.check('email', value)? "" : this.error.cases.email;
          this.error.email = err;
          break;

        case 'pwd':
          err = !value || RegexFactory.check('password', value)? "" : this.error.cases.password;
          this.error.password = err;

          repeatField = this.$refs.repeat as FieldController;
          err = value === repeatField.getValue()? "" : this.error.cases.repeat;
          this.error.repeat = err;
          break;
          
        case 'repeat':
          pwdField = this.$refs.pwd as FieldController;
          err = pwdField.getValue() === value? "" : this.error.cases.repeat;
          this.error.repeat = err;
          break;
      
        default:
          break;
      }
    },

    submit() {
      const nameField = this.$refs.name as FieldController;
      const emailField = this.$refs.email as FieldController;
      const pwdField = this.$refs.pwd as FieldController;
      const repeatField = this.$refs.repeat as FieldController;

      let nerr = 0;
      if (nameField.getValue().length) {
        nerr += RegexFactory.check('name', nameField.getValue())? 0 : 1;
      } else {
        this.error.name = this.error.cases.fieldRequired;
        nerr++;
      }

      if (emailField.getValue().length) {
        nerr += RegexFactory.check('email', emailField.getValue())? 0 : 1;
      } else {
        this.error.email = this.error.cases.fieldRequired;
        nerr++;
      }

      if (pwdField.getValue().length) {
        nerr += RegexFactory.check('password', pwdField.getValue())? 0 : 1;
      } else {
        this.error.password = this.error.cases.fieldRequired;
        nerr++;
      }

      if (pwdField.getValue().length) {
        nerr += repeatField.getValue() === pwdField.getValue()? 0 : 1;
      } else {
        this.error.repeat = this.error.cases.fieldRequired;
        nerr++;
      }

      if (nerr == 0) {
        this.loading = true;
        const signature = CryptoJS.SHA256(pwdField.getValue()).toString(CryptoJS.enc.Hex);
        signupRequest(nameField.getValue(), emailField.getValue(), signature, this.callback);
      }
    },

    async callback(err: any) {
      console.log(err);    
      if (err) {
        this.error.title = err.message;
      } else {
        this.error.title = "";
      }
      
      this.loading = false
    }
  }
});
</script>
