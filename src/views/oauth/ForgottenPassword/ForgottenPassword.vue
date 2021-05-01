<template src="./ForgottenPassword.html"> </template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./ForgottenPassword.scss"></style>

<script lang="ts">
import { defineComponent } from "vue";
import MainLogoLight from "@/assets/logo.light.png";
import MainLogoDark from "@/assets/logo.dark.png";
import List,  {ListController, ItemController} from "@/objects/List";
import {Controller as CardController} from "@/components/Card";
import SwitchButton from "@/components/SwitchButton";
import RegexFactory from "@/utils/regex";
import DeferredField from "@/components/Field/Deferred";
import {Controller as FieldController} from "@/components/Field";

export default defineComponent({
  name: "ForgottenPassword",
  components: {
    SwitchButton,
    DeferredField,
    List
  },

  props: {
    dark: Boolean,
    onSwitchTheme: Function
  },

  data () {
      return {
          loading: false,
          submitEnabled: false,
          placeholder: "Username / Email",

          titles: {
            email: "Username / Email",
            code: "6code",
          },

          error: {
            code: "",

            cases: {
              fieldRequired: "Required field",
              invalidCode: "The provided 6code is not valid",
              codeFormat: "A 6code is composed by six numbers as XYZ-JQK",
            }
          },

          messages: [
            {
              id:"6CODE_VIA_EMAIL",
              title: "Via email",
              subtitle: "Clicking on Send, we will provide you the 6code via email.",
              color: "#795997",
              body: "",
            }
          ]
      }
  },

  methods: {
    getIconByTheme() {
        return this.dark ? MainLogoLight : MainLogoDark;
    },

    onInnerAction() {
      if (this.placeholder == this.titles.email){
        const codeField = this.$refs.code as FieldController;
        if (!codeField.getValue()) {
          this.error.code = this.error.cases.fieldRequired;
          return false
        }

        this.error.code = "";
        this.placeholder = this.titles.code;
        
        codeField.clear();
        return true;
      }
    },

    onCountOut() {
      const codeField = this.$refs.code as FieldController;
      this.placeholder = this.titles.email;
      this.submitEnabled = false;
      codeField.clear();
    },

    onChange(id: string, value: string): string {
      if (this.placeholder == this.titles.email &&
          this.error.code != "" && value) {
            this.error.code = "";
      } else if (this.placeholder == this.titles.code) {
        if (RegexFactory.check('6code', value)) {
          this.submitEnabled = true;
          this.submit();
          return value
        }

        this.submitEnabled = this.loading? true : false;
        const over: string = this.formatCode(value, 0);
        return over;
      }

      return value;
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
        this.error.code = this.error.cases.codeFormat;
      } else {
        this.error.code = "";
      }

      this.callback(null);
      this.loading = true;
    },

    async callback(err: any) {    
      await new Promise( resolve => setTimeout(resolve, 5000) );

      if (err) {
        this.error.code = this.error.cases.invalidCode
      } else {
        this.error.code = ""
      }
      
      this.loading = false
    }
  },

  mounted() {
    const messages = this.$refs["messages"] as ListController<ItemController>;
    const item = new CardController(this.messages[0].id,
                                    this.messages[0]);
    messages.push(item);
  }
});
</script>
