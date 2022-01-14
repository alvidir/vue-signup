<template>
  <div class="signup round-corners fib-6">
    <img src="../assets/logo.light.png" />
    <span>Sign on Alvidir <a>Alpha</a></span>
    
    <regular-field v-if="isSignup || isLogin" 
                   class="field separator"
                   placeholder="username or email"
                   large></regular-field>
    
    <regular-field v-if="isSignup || isLogin || isRecover"
                   class="field separator"
                   :class="{smaller: isLogin}"
                   placeholder="password"
                   type="password"
                   large></regular-field>
                   
    <a id="forgot-pwd"
       v-if="isLogin"
       class="align-right"
       href="#">Forgot password?</a>

    <regular-field v-if="isSignup || isRecover"
                   class="field separator"
                   placeholder="repeat password"
                   type="password"
                   large></regular-field>
    
    <discret-field v-if="isTotp"
                   class="separator larger"
                   :length="7"
                   placeholder="One time password">
    </discret-field>

    <submit-button large>Sign up</submit-button>
    <a href="#">Already have an account? Log in!</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export const TYPE_SIGNUP = "signup";
export const TYPE_LOGIN = "login";
export const TYPE_TOTP = "totp";
export const TYPE_RECOVER = "recover";

const DATA_REGEX = {
  signup: {
    email: "",
    password: ""
  },

  totp: "",

  recover: "",
}

export default defineComponent({
  name: 'SignUp',
  props: {
    appName: String,
    version: String,
    type: {
      type: String,
      default: TYPE_SIGNUP,
    }
  },

  computed: {
    isSignup(): boolean {
      return this.type === TYPE_SIGNUP
    },

    isLogin(): boolean {
      return this.type === TYPE_LOGIN
    },

    isTotp(): boolean {
      return this.type === TYPE_TOTP
    },

    isRecover(): boolean {
      return this.type === TYPE_RECOVER
    }
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

  -moz-box-shadow:     0px 2px 5px 1px #aeaeae90;
  -webkit-box-shadow:  0px 2px 5px 1px #aeaeae90;
  box-shadow:          0px 2px 5px 1px #aeaeae90;

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
