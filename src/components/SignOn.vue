<!-- <template>
  <div>
    <regular-field
      v-if="email"
      class="field"
      :class="{ separator: !usernameErrorMessage }"
      :placeholder="usernameFieldPlaceholder"
      :ref="FIELD_USERNAME"
      :error="usernameErrorMessage"
      @input="onInput(FIELD_USERNAME, $event)"
      large
    ></regular-field>

    <regular-field
      v-if="password"
      class="field separator"
      :class="{ separator: !passwordErrorMessage }"
      placeholder="Password"
      type="password"
      :ref="FIELD_PASSWORD"
      :error="passwordErrorMessage"
      @input="onInput(FIELD_PASSWORD, $event)"
      large
    ></regular-field>

    <div v-if="totp" class="center-content">
      <discret-field
        :lenght="TOTP_LENGTH"
        :ref="FIELD_TOTP"
        class="tight separator larger"
        placeholder="One time password"
        @input="onInput(FIELD_TOTP, $event)"
      >
      </discret-field>
    </div>

    <submit-button
      :disabled="!isValid"
      :loading="loading"
      @submit="onSubmit()"
      large
      >{{ title }}
    </submit-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FieldController } from "vue-fields/src/main";

export const FIELD_USERNAME = "username";
export const FIELD_PASSWORD = "password";
export const FIELD_TOTP = "totp";
export const TOTP_LENGTH = 6;

export const SUBMIT_EVENT_NAME = "submit";

const FIELDS_REGEX: { [key: string]: RegExp } = {
  [FIELD_USERNAME]: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
  [FIELD_PASSWORD]:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const ERROR_MESSAGES: { [key: string]: string } = {
  [FIELD_USERNAME]: "Invalid email address.",
  [FIELD_PASSWORD]:
    "A secure password must include at least one upper and lowercase letters, as well as numbers and special characters.",
};

type FieldData = {
  valid: boolean;
  controller: FieldController | undefined;
  error: string;
};

export default defineComponent({
  name: "SignOn",

  emits: [SUBMIT_EVENT_NAME],

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
    disableErrors: Boolean,
  },

  setup() {
    return {
      FIELD_USERNAME,
      FIELD_PASSWORD,
      FIELD_TOTP,
      TOTP_LENGTH,
    };
  },

  data() {
    return {
      isValid: false,
      fields: {} as { [key: string]: FieldData },
    };
  },

  computed: {
    usernameFieldPlaceholder(): string {
      return this.email && this.username
        ? "Username or email"
        : this.username
        ? "Username"
        : this.email
        ? "Email"
        : "";
    },

    usernameErrorMessage(): string {
      if (
        this.disableErrors ||
        !this.fields[FIELD_USERNAME]?.controller?.value() ||
        this.fields[FIELD_USERNAME].valid
      )
        return "";

      return ERROR_MESSAGES[FIELD_USERNAME];
    },

    passwordErrorMessage(): string {
      if (
        this.disableErrors ||
        !this.fields[FIELD_PASSWORD]?.controller?.value() ||
        this.fields[FIELD_PASSWORD].valid
      )
        return "";

      return ERROR_MESSAGES[FIELD_PASSWORD];
    },
  },

  methods: {
    hash(data: string): string {
      let hash = 0;
      for (let i = 0; i < data.length; i++)
        hash = (Math.imul(31, hash) + data.charCodeAt(i)) | 0;

      return hash.toString(32);
    },

    validateUsername(input: string): void {
      this.fields[FIELD_USERNAME].valid =
        !!input.length &&
        (this.username || FIELDS_REGEX[FIELD_USERNAME].test(input));
    },

    validatePassword(input: string): void {
      this.fields[FIELD_PASSWORD].valid =
        !!input.length && FIELDS_REGEX[FIELD_PASSWORD].test(input);
    },

    validateTotp(input: string): void {
      this.fields[FIELD_TOTP].valid = input.length == TOTP_LENGTH;
    },

    onInput(field: string, ctrl: FieldController): void {
      const validators: { [key: string]: (input: string) => void } = {
        [FIELD_USERNAME]: this.validateUsername,
        [FIELD_PASSWORD]: this.validatePassword,
        [FIELD_TOTP]: this.validateTotp,
      };

      validators[field](ctrl.value());
      this.isValid = !Object.keys(this.fields).some(
        (field) => !this.fields[field].valid
      );
    },

    onSubmit(): void {
      if (this.isValid) {
        let secureFields: { [key: string]: string } = {};

        Object.keys(this.fields).forEach((key) => {
          let value = this.fields[key].controller?.value() ?? "";
          if (key == FIELD_PASSWORD) value = this.hash(value);

          secureFields[key] = value;
        });

        this.$emit(SUBMIT_EVENT_NAME, secureFields);
      }
    },
  },

  mounted() {
    this.fields[FIELD_USERNAME] = {
      valid: !this.username && !this.email,
      controller: this.$refs[FIELD_USERNAME] as FieldController,
      error: "",
    };

    this.fields[FIELD_PASSWORD] = {
      valid: !this.password,
      controller: this.$refs[FIELD_PASSWORD] as FieldController,
      error: "",
    };

    this.fields[FIELD_TOTP] = {
      valid: !this.totp,
      controller: this.$refs[FIELD_TOTP] as FieldController,
      error: "",
    };
  },
});
</script>

<style scoped lang="scss">
@import "fibonacci-styles";

div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

// overwrite submit-button styles
.submit {
  margin-top: $fib-5 * 1px;
  margin-bottom: $fib-5 * 1px;
}

.regular-field,
.discret-field,
.submit,
a {
  margin-left: auto;
  margin-right: auto;
}

.separator {
  margin-bottom: $fib-6 * 1px;

  &.larger {
    margin-bottom: $fib-8 * 1px;
  }
}

.center-content {
  display: flex;
  align-items: center;
}

.tight {
  width: fit-content !important;
}
</style> -->
