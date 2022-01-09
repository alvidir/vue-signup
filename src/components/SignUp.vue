<template>
  <div class="signup">
    hello world
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignUp',
  props: {
    type: String,

  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/global.scss";

.signup {
  width: $fib-13 * 1px;
  height: $fib-13 * 1px;
  background: red;
}

</style>
