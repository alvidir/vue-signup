<template>
  <div class="signup round-corners fib-6">
    <img src="../assets/logo.light.png" />
    <span>Sign on Alvidir <button>Alpha</button></span>
    <regular-field class="field separator"
                   placeholder="username or email"
                   large></regular-field>
    <regular-field class="field separator little"
                   placeholder="password"
                   type="password"
                   large></regular-field>
    <a id="forgot-pwd" class="align-right" href="#">Forgot password?</a>
    <regular-field v-if="verify"
                   class="field"
                   placeholder="repeat password"
                   type="password"
                   large></regular-field>
    <discret-field v-if="totp"
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

export default defineComponent({
  name: 'SignUp',
  props: {

    verify: Boolean,
    totp: Boolean,
  },
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

    button {
      cursor: pointer;
      $item-color: purple;

      position: absolute;
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      margin-left: $fib-5 * 1px;
      padding-left: $fib-4 * 1px;
      padding-right: $fib-4 * 1px;
      padding-top: $fib-2 * 1px;
      padding-bottom: $fib-2 * 1px;
      border: 1px solid;
      border-color: $item-color;
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

    &.little {
      margin-bottom: $fib-4 * 1px;
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
