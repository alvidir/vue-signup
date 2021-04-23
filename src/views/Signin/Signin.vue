<template src="./Signin.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Signin.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import SwitchButton from "@/components/SwitchButton";
import {Controller as CardController} from "@/components/Card";
import Field, { Controller as FieldController } from "@/components/Field";
import List,  {ListController, ItemController} from "@/objects/List";
import RegexFactory from "@/utils/regex";
import {loginRequest} from '@/proto/user';



export default defineComponent({
  name: "Signin",
  components: {
    SwitchButton,
    Field,
    List
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
          }
      }
  },

  methods: {
    getIconByTheme() {
        return this.dark ? MainLogoLight : MainLogoDark;
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
        const messages = this.$refs["messages"] as ListController<ItemController>;
        const item = new CardController(this.error.cases.invalidCreds.id,
                                        this.error.cases.invalidCreds);
        messages.add(item);
        return;
      }
      
      this.loading = true;
      loginRequest(idField.getValue(), pwdField.getValue(), "hello-world", this.callback);
    },

    async callback(err: any) {    
      if (err) {
        const messages = this.$refs["messages"] as ListController<ItemController>;
        const item = new CardController(this.error.cases.invalidCreds.id,
                                        this.error.cases.invalidCreds);
        messages.add(item);
      } else {
        const messages = this.$refs["messages"] as ListController<ItemController>;
        messages.removeByIndex(0);
      }
      
      this.loading = false;
    }
  }
});
</script>
