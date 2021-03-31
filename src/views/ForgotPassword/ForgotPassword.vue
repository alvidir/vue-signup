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

import qrcode from "@/assets/qr-code.svg";

export default defineComponent({
  name: "ForgotPassword",
  components: {
    SwitchButton,
    Warning,
    DeferredField
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
            code: "",
            
            title: "",
            subtitle: "Make sure your credentials are alright",

            cases: {
              fieldRequired: "Required field",
              invalidCode: "The provided 6code is not valid",
              codeFormat: "A 6code is composed by six numbers as XYZ-JQK",
              code: ""
            }
          },

          messages: [
            {
              icon: qrcode,
              title: "Via email",
              details: "Clicking on Send, we will provide you the 6code via email."
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
      const codeField = this.$refs.code as FieldController;
      if (codeField.getValue().length == 0) {
        this.error.code = this.error.cases.fieldRequired;
      } else if (!RegexFactory.check('6code', codeField.getValue())) {
        this.error.code = this.error.cases.code;
      } else {
        this.error.code = "";
      }

      this.callback(null);
      this.loading = true;
    },

    async callback(err: any) {    
      await new Promise( resolve => setTimeout(resolve, 5000) );

      if (err) {
        this.error.title = this.error.cases.invalidCode
      } else {
        this.error.title = ""
      }
      
      this.loading = false
    }
  }
});
</script>
