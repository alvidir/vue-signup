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

    onChange(id: string, value: string): string {
      if (RegexFactory.check('6code', value)) {
        this.submitEnabled = true;
        this.submit();
        return value
      }

      this.submitEnabled = this.loading? true : false;
      const over: string = this.formatCode(value, 0);
      return over;
    },

    formatCode(value: string, init: number): string {
      if (init < 0 || init >= value.length) {
        return value;
      }

      let over = value;
      if (RegexFactory.check('number', value[init])) {
        let next = init+1;
        if (init == 3) {
          over = value.substr(0, 3) + "-";
          over += value.length > 3? value.substr(3) : "";
          next += 1;
        }

        return this.formatCode(over, next);
      }

      over = value.substr(0, init) + value.substr(init+1)
      return this.formatCode(over, init)
    },

    submit() {
      this.callback(null);
      this.loading = true;
    },

    async callback(err: any) {    
      await new Promise( resolve => setTimeout(resolve, 5000) );

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
