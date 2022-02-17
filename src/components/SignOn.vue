<template>
  <div class="signon round-corners fib-6 shadowed">
    <slot name="banner"></slot>
    <regular-field v-if="email" 
                   class="field separator"
                   :placeholder="usernameFieldPlaceholder"
                   @input="onInput($event, FIELD_USERNAME)"
                   large></regular-field>
    
    <regular-field v-if="password"
                  class="field separator"
                  placeholder="Password"
                  type="password"
                  :ref="FIELD_PASSWORD"
                  :class="{smaller: isLogin}"
                  @input="onInput($event, FIELD_PASSWORD)"
                  large></regular-field>
    
    <discret-field v-if="totp"
                   :lenght="TOTP_LENGTH"
                   class="separator larger"
                   placeholder="One time password"
                   @input="onInput($event, FIELD_TOTP)">
    </discret-field>

    <submit-button :disabled="!isValid" 
                   :loading="loading"
                   @submit="onSubmit()" large>{{title}}
    </submit-button>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export const FIELD_USERNAME = "username"
export const FIELD_PASSWORD = "password"
export const FIELD_TOTP = "totp"
export const TOTP_LENGTH = 6

export const SUBMIT_EVENT_NAME = "submit"
export const REDIRECT_EVENT_NAME = "redirect"

const FIELDS_REGEX: {[key: string]: RegExp} = {
  [FIELD_USERNAME]: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
  [FIELD_PASSWORD]: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

export default defineComponent({
  name: 'SignOn',

  emits: [
    SUBMIT_EVENT_NAME,
    REDIRECT_EVENT_NAME
  ],

  props: {
    title: String,
    totp: Boolean,
    username: {
      type: Boolean,
      default: true,
    },
    email: {
      type: Boolean,
      default: true,
    },
    password: {
      type: Boolean,
      default: true,
    },
    loading: Boolean,
  },

  setup() {
    return {
      FIELD_USERNAME,
      FIELD_PASSWORD,
      FIELD_TOTP,
      TOTP_LENGTH,
    }
  },

  data() {
    let fieldsStatus: {[key: string]: boolean} = {}
    fieldsStatus[FIELD_USERNAME] = false
    fieldsStatus[FIELD_PASSWORD] = false
    fieldsStatus[FIELD_TOTP] = false
    
    return {
      isValid: false,
      fieldsStatus: fieldsStatus,
      fieldsValues: {} as {[key: string]: string}
    }
  },

  computed: {
    usernameFieldPlaceholder(): string {
      return this.email && this.username? "Username or email" :
             this.username? "Username" :
             this.email? "Email" : ""
    },
  },

  methods: {
    validateEmail(input: string): void {
      this.fieldsStatus[FIELD_USERNAME] = !!input.length && FIELDS_REGEX[FIELD_USERNAME].test(input)
    },

    validatePassword(input: string): void {
      this.fieldsStatus[FIELD_PASSWORD] = !!input.length && FIELDS_REGEX[FIELD_PASSWORD].test(input)
    },

    validateTotp(input: string): void {
      this.fieldsStatus[FIELD_TOTP] = input.length == TOTP_LENGTH
    },

    onInput(input: string, field: string): void {
      this.fieldsValues[field] = input;
      const validators: {[key: string]: any} = {
        [FIELD_USERNAME]: this.validateEmail,
        [FIELD_PASSWORD]: this.validatePassword,
        [FIELD_TOTP]: this.validateTotp,
      }

      validators[field](input)
      this.isValid = !Object.keys(this.fieldsStatus)
        .some(field => !this.fieldsStatus[field])
    },

    onSubmit(): void {
      if (this.isValid) {
        this.$emit(SUBMIT_EVENT_NAME, this.fieldsValues) 
      }
    },

    onRedirect(target: string): void {
      this.$emit(REDIRECT_EVENT_NAME, target)
    },
  }
});
</script>

<style scoped lang="scss">
@import "fibonacci-styles";

.signon {
  display: flex;
  flex-direction: column;
  width: $fib-13 * 1px;
  border: 1px solid;
  border-color: find-fib-color(disabled);
  padding-top: $fib-7 * 1px;
  padding-bottom: $fib-6 * 1px;
  background: white;

  &.shadowed {
    -moz-box-shadow:     0px 3px 3px 1px #00000020 !important;
    -webkit-box-shadow:  0px 3px 3px 1px #00000020 !important;
    box-shadow:          0px 3px 3px 1px #00000020 !important;
  }

  #pwd-container {
    display: flex;
    flex-direction: column;
  }

  // overwrite submit-button styles
  .submit {
    margin-top: $fib-5 * 1px;
    margin-bottom: $fib-5 * 1px;
  }

  .regular-field, .discret-field, .submit, a {
    margin-left: auto;
    margin-right: auto;
  }

  .regular-field, .submit, a{
    width: 90%;
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
}

</style>
