<template src="./Signin.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Signin.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import Warning from "@/components/Warning";
import SwitchButton from "@/components/SwitchButton";
import Card from "@/components/Card";
import Field, { Controller as FieldController } from "@/components/Field";
import RegexFactory from "@/utils/regex";
import {loginRequest} from '@/proto/user';

type Message = {
  id: string,
  color: string,
  title: string,
  subtitle: string,
  body: string
}

export default defineComponent({
  name: "Signin",
  components: {
    SwitchButton,
    Warning,
    Field,
    Card
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

            cases: {
              fieldRequired: "Required field.",
              invalidCreds: {
                id: "INVALID_CREDENTIALS",
                color: "#e04f5f",
                title: "Invalid username or password",
                subtitle: "Make sure your credentials are set correctly.",
                body: "",
              },
            }
          },

          messages: new Array<Message>(),
      }
  },

  methods: {
    getIconByTheme() {
        return this.dark ? MainLogoLight : MainLogoDark;
    },

    addMessage(item: Message) {
      if (this.messages.indexOf(item) == -1) {
        this.messages.push(item);
      }
    },

    removeMessage(item: Message) {
      if (this.messages.length > 0){
        const index = this.messages.indexOf(item)
        delete this.messages[index];
      }
    },

    submit() {
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
        return;
      }

      if ((!RegexFactory.check('name', idField.getValue()) &&
          !RegexFactory.check('name', idField.getValue())) ||
          !RegexFactory.check('password', pwdField.getValue())){
        this.addMessage(this.error.cases.invalidCreds);
        return;
      }
      
      this.loading = true;
      loginRequest(idField.getValue(), pwdField.getValue(), "hello-world", this.callback);
    },

    async callback(err: any) {    
      if (err) {
        this.addMessage(this.error.cases.invalidCreds);
      } else {
        this.removeMessage(this.error.cases.invalidCreds);
      }
      
      this.loading = false;
    }
  }
});
</script>
