<template>
  <div class="signup round-corners fib-6">
    <img :src="require(`../assets/${icon}`)" />
    <span>{{title}}<a :href="versionUrl">{{version}}</a></span>
    
    <regular-field v-if="!totp && (isSignup || isLogin)" 
                   class="field separator"
                   :placeholder="usernameFieldPlaceholder"
                   @input="validateInput($event, FIELD_USERNAME)"
                   large></regular-field>
    
    <regular-field v-if="!totp && (isSignup || isLogin || isReset)"
                   :ref="FIELD_PASSWORD"
                   class="field separator"
                   :class="{smaller: isLogin}"
                   placeholder="Password"
                   type="password"
                   @input="validateInput($event, FIELD_PASSWORD)"
                   large></regular-field>
                   
    <a id="forgot-pwd"
       v-if="isLogin"
       class="align-right"
       href="#">Forgot password?</a>

    <regular-field v-if="!totp && (isSignup || isReset)"
                   :ref="FIELD_REPEAT"
                   class="field separator"
                   placeholder="Repeat password"
                   type="password"
                   @input="validateInput($event, FIELD_REPEAT)"
                   large not-show></regular-field>
    
    <discret-field v-if="totp"
                   :lenght="TOTP_LENGTH"
                   class="separator larger"
                   placeholder="One time password"
                   @input="validateInput($event, FIELD_TOTP)">
    </discret-field>

    <submit-button :disabled="!isValid" large>{{buttonText}}</submit-button>
    <a v-if="isSignup" href="#">Already have an account? Log in!</a>
    <a v-if="isLogin" href="#">Don't have an account? Register!</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export const TYPE_SIGNUP = "signup";
export const TYPE_LOGIN = "login";
export const TYPE_RESET = "reset";

const FIELD_USERNAME = "username";
const FIELD_PASSWORD = "password";
const FIELD_REPEAT = "repeat";
const FIELD_TOTP = "totp";
const TOTP_LENGTH = 6;

const FIELDS_REGEX: {[key: string]: RegExp} = {
  [FIELD_USERNAME]: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
  [FIELD_PASSWORD]: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

export default defineComponent({
  name: 'SignUp',
  props: {
    app: String,
    version: String,
    versionUrl: String,
    icon: String,
    totp: Boolean,
    type: {
      type: String,
      default: TYPE_SIGNUP,
    }
  },

  setup() {
    return {
      FIELD_USERNAME,
      FIELD_PASSWORD,
      FIELD_REPEAT,
      FIELD_TOTP,
      TOTP_LENGTH,
    }
  },

  data() {
    let fields: {[key: string]: boolean} = {}
    fields[FIELD_USERNAME] = [TYPE_LOGIN, TYPE_SIGNUP].includes(this.type)? false : true
    fields[FIELD_PASSWORD] = [TYPE_LOGIN, TYPE_SIGNUP].includes(this.type)? false : true
    fields[FIELD_REPEAT] = [TYPE_SIGNUP, TYPE_RESET].includes(this.type)? false : true
    fields[FIELD_TOTP] = !this.totp
    
    return {
      isValid: false,
      fields: fields,
    }
  },

  computed: {
    title(): string {
      return this.type === TYPE_SIGNUP? `Sign on ${this.app}` : 
             this.type === TYPE_LOGIN? `Log in ${this.app}` :
             this.type === TYPE_RESET? "Reset password" : 
             ""
    },

    buttonText(): string {
      return this.type === TYPE_SIGNUP? "Sign up" :
             this.type === TYPE_LOGIN? "Log in" :
             this.type === TYPE_RESET? "Reset" :
             ""
    },

    usernameFieldPlaceholder(): string {
      return this.isSignup? "Email" : "Username or email"
    },

    isSignup(): boolean {
      return this.type === TYPE_SIGNUP
    },

    isLogin(): boolean {
      return this.type === TYPE_LOGIN
    },

    isReset(): boolean {
      return this.type === TYPE_RESET
    },
  },

  methods: {
    validateEmail(input: string): void {
      if (this.isSignup) {
        this.fields[FIELD_USERNAME] = FIELDS_REGEX[FIELD_USERNAME].test(input)
      } else {
        this.fields[FIELD_USERNAME] = !!input.length
      }
    },

    validatePassword(input: string): void {
      if (this.isSignup || this.isReset) {
        let inputRef: any = this.$refs[FIELD_REPEAT]
        this.fields[FIELD_REPEAT] = input === inputRef?.value
        this.fields[FIELD_PASSWORD] = FIELDS_REGEX[FIELD_PASSWORD].test(input)
      } else {
        this.fields[FIELD_PASSWORD] = !!input.length
      }
    },

    validateRepeat(input: string): void {
      let inputRef: any = this.$refs[FIELD_PASSWORD]
      this.fields[FIELD_REPEAT] = !!input.length && input === inputRef?.value
    },

    validateTotp(input: string): void {
      this.fields[FIELD_TOTP] = input.length == TOTP_LENGTH
    },

    validateInput(input: string, field: string): void {
      if (field === FIELD_USERNAME) {
        this.validateEmail(input)
      } else if (field === FIELD_PASSWORD) {
        this.validatePassword(input)
      } else if (field === FIELD_REPEAT) {
        this.validateRepeat(input)
      } else if (field === FIELD_TOTP) {
        this.validateTotp(input)
      }

      this.isValid = !Object.keys(this.fields)
        .some(field => !this.fields[field])
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";

.signup {
  display: flex;
  flex-direction: column;
  width: $fib-13 * 1px;
  border: 1px solid;
  border-color: find-fib-color(disabled);
  background: white;

  -moz-box-shadow:     0px 2px 3px 1px #aeaeae80;
  -webkit-box-shadow:  0px 2px 3px 1px #aeaeae80;
  box-shadow:          0px 2px 3px 1px #aeaeae80;

  img {
    margin-top: $fib-8 * 1px;
    margin-bottom: $fib-6 * 1px;
    margin-left: auto;
    margin-right: auto;
    height: $fib-10 * 1px;
  }

  span {
    font-size: $fib-11 * 0.01rem;
    text-align: center;
    margin-bottom: $fib-9 * 1px;

    a {
      cursor: pointer;
      $item-color: purple;

      position: absolute;
      width: fit-content;
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      margin-left: $fib-4 * 1px;
      padding: $fib-2 * 1px $fib-4 * 1px $fib-2 * 1px  $fib-4 * 1px;
      border: 1px solid $item-color;
      border-radius: 10px;
      font-size: $fib-6 * 1px;
      color: $item-color;

      &:not(:active) {
        background: transparent;
      }
    }
  }

  .regular-field, .discret-field, .submit, a {
    margin-left: auto;
    margin-right: auto;
  }

  .regular-field, .submit, a{
    width: 90%;
  }

  .submit {
    margin-top: $fib-5 * 1px;
    margin-bottom: $fib-5 * 1px;
  }

  .separator {
    margin-bottom: $fib-6 * 1px;

    &.smaller {
      margin-bottom: $fib-4 * 1px;
    }

    &.larger {
      margin-bottom: $fib-8 * 1px;
    }
  }

  a {
    text-decoration: none;
    font-size: $fib-6 * 1px;
    margin-bottom: $fib-5 * 1px;
    text-align: center;

    &.align-right {
      text-align: right !important;
    }

    &#forgot-pwd {
      padding-right: $fib-5 * 1px;
    }
  }
}

</style>
