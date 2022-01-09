<template>
  <div class="signup round-corners fib-6">
    <img src="@/assets/logo.light.png" />
    <label>Sign on Alvidir</label>
    <regular-field class="field"
                   placeholder="username or email"
                   large></regular-field>
    <regular-field class="field"
                   placeholder="password"
                   type="password"
                   large></regular-field>
    <regular-field v-if="verifyPassword"
                   class="field"
                   placeholder="repeat password"
                   type="password"
                   large></regular-field>
    <submit-button large disabled>Sign up</submit-button>
    <div class="shortcuts">
      <a href="#">Log in</a> |
      <a href="#">Forgot password</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignUp',
  props: {
    verifyPassword: Boolean,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/global.scss";

.signup {
  display: flex;
  flex-direction: column;
  width: $fib-13 * 1px;
  border: 1px dashed;
  border-color: find-fib-color(disabled);
  background: white;

  -moz-box-shadow:     0px 0px 3px 1px #aeaeae90;
  -webkit-box-shadow:  0px 0px 3px 1px #aeaeae90;
  box-shadow:          0px 0px 3px 1px #aeaeae90;

  img {
    margin-top: $fib-8 * 1px;
    margin-bottom: $fib-6 * 1px;
    margin-left: auto;
    margin-right: auto;
    height: $fib-10 * 1px;
  }

  label {
    font-size: $fib-11 * 0.01rem;
    text-align: center;
    margin-bottom: $fib-9 * 1px;
  }

  .regular-field, #submit-button {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    transform: translateX(-2px);
  }

  #submit-button {
    margin-top: $fib-5 * 1px;
    margin-bottom: $fib-5 * 1px;
    justify-content: center;
  }

  .shortcuts {
    font-size: $fib-6 * 1px;
    margin-bottom: $fib-5 * 1px;
    text-align: center;

    a {
      padding-left: $fib-6 * 1px;
      padding-right: $fib-6 * 1px;
    }
  }
}

</style>
