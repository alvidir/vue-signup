<template>
  <div class="container">
    <notice-card
      v-if="warning"
      class="warning-message"
      v-bind="warning"
      @close="quitWarning"
    >
    </notice-card>
    <regular-card class="shadow-box">
      <banner version="Alpha" :title="bannerTitle" :icon="`logo.${theme}.png`">
      </banner>
      <sign-on
        :title="submitTitle"
        :loading="fetching"
        :email="showEmailField"
        :username="showUsernameField"
        :password="showPasswordField"
        :totp="showTotpField"
        :disable-errors="!isSignup"
        @submit="onSubmit"
      >
      </sign-on>
      <options v-if="showOptions" v-bind="optionsProps"> </options>
    </regular-card>
  </div>
  <span class="inflate"></span>
  <navbar
    class="footer"
    @theme-switch="onSwitchTheme"
    :checked="theme == THEME_DARK_KEY"
  >
    hello world
  </navbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  THEME_LIGHT_KEY,
  THEME_DARK_KEY,
  GetTheme,
  SwitchTheme,
} from "fibonacci-styles/util";
import SignOn, {
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from "@/components/SignOn.vue";
import Banner from "@/components/AppBanner.vue";
import Options from "@/components/SignOptions.vue";
import Navbar from "@/components/NavBar.vue";
import RauthService, { Metadata, Error } from "@/rauth.service";
import * as constants from "@/constants";
import * as cookies from "@/cookies";

const rauthService = new RauthService(
  process.env.VUE_APP_RAUTH_URI ?? "http://localhost/rpc"
);

interface InputFields {
  [FIELD_USERNAME]: string;
  [FIELD_PASSWORD]: string;
  [FIELD_TOTP]: string;
}

export default defineComponent({
  name: "App",
  components: {
    Banner,
    SignOn,
    Options,
    Navbar,
  },

  setup() {
    return {
      THEME_LIGHT_KEY,
      THEME_DARK_KEY,
    };
  },

  data() {
    return {
      theme: THEME_LIGHT_KEY,
      fetching: false,
      disableEmail: false,
      disablePassword: false,
      disableTotp: true,
      warning: undefined as constants.WarningProp | undefined,
    };
  },

  created() {
    if (this.token && constants.SIGNUP_PATH.test(window.location.pathname))
      this.onSubmit({
        [FIELD_USERNAME]: "",
        [FIELD_PASSWORD]: "",
        [FIELD_TOTP]: "",
      });
  },

  computed: {
    token(): string | undefined {
      if (!constants.queryParams) return undefined;

      let paramsByKey: { [key: string]: string } = {};
      constants.queryParams.match(/\w=\w*/)?.forEach((param: string) => {
        const item = param.split("=");
        paramsByKey[item[0]] = item[1];
      });

      return paramsByKey[process.env.VUE_APP_TOKEN_QUERY_PARAM];
    },

    redirect(): string | undefined {
      if (!constants.queryParams) return undefined;

      let paramsByKey: { [key: string]: string } = {};
      constants.queryParams.match(/\w=\w*/)?.forEach((param: string) => {
        const item = param.split("=");
        paramsByKey[item[0]] = item[1];
      });

      return paramsByKey[process.env.VUE_APP_REDIRECT_QUERY_PARAM];
    },

    isSignup(): boolean {
      return constants.SIGNUP_PATH.test(window.location.pathname);
    },

    bannerTitle(): string {
      const pathname = window.location.pathname;
      if (this.token && constants.RESET_PATH.test(pathname))
        return constants.BANNER_TITLES[pathname];

      return (
        constants.BANNER_TITLES[pathname] ??
        constants.BANNER_TITLES[constants.LOGIN_PATH_ROOT]
      );
    },

    submitTitle(): string {
      return (
        constants.SUBMIT_TITLES[window.location.pathname] ??
        constants.SUBMIT_TITLES[constants.LOGIN_PATH_ROOT]
      );
    },

    optionsProps(): unknown {
      return (
        constants.OPTIONS_PROPS[window.location.pathname] ??
        constants.OPTIONS_PROPS[constants.LOGIN_PATH_ROOT]
      );
    },

    showOptions(): boolean {
      const pathname = window.location.pathname;
      return (
        this.disableTotp &&
        !this.fetching &&
        (constants.SIGNUP_PATH.test(pathname) ||
          constants.LOGIN_PATH.test(pathname) ||
          constants.RESET_PATH.test(pathname))
      );
    },

    showEmailField(): boolean {
      const pathname = window.location.pathname;
      return (
        this.disableTotp &&
        !this.disableEmail &&
        (constants.SIGNUP_PATH.test(pathname) ||
          constants.LOGIN_PATH.test(pathname) ||
          (constants.RESET_PATH.test(pathname) && !this.token))
      );
    },

    showUsernameField(): boolean {
      return (
        !this.disableEmail &&
        constants.LOGIN_PATH.test(window.location.pathname)
      );
    },

    showPasswordField(): boolean {
      const pathname = window.location.pathname;
      return (
        this.disableTotp &&
        !this.disablePassword &&
        (constants.SIGNUP_PATH.test(pathname) ||
          constants.LOGIN_PATH.test(pathname) ||
          (constants.RESET_PATH.test(pathname) && !!this.token))
      );
    },

    showTotpField(): boolean {
      return !this.disableTotp;
    },
  },

  methods: {
    async onSubmit(fields: InputFields) {
      this.fetching = true;

      const email = fields[FIELD_USERNAME];
      const pwd = fields[FIELD_PASSWORD];
      const totp = fields[FIELD_TOTP];
      const headers: { [key: string]: string } = {};

      if (this.token) {
        const tokenHeader = process.env.VUE_APP_JWT_HEADER;
        headers[tokenHeader] = this.token;
      }

      const requests: { [key: string]: () => void } = {
        [constants.SIGNUP_PATH_ROOT]: () =>
          rauthService.signup(email, pwd, headers),
        [constants.LOGIN_PATH_ROOT]: () =>
          rauthService.login(email, pwd, totp, headers),
        [constants.RESET_PATH_ROOT]: () =>
          rauthService.reset(email, pwd, totp, headers),
      };

      let pathname = window.location.pathname;
      if (constants.LOGIN_PATH.test(pathname))
        pathname = constants.LOGIN_PATH_ROOT;

      requests[pathname]();
    },

    performRedirect(): void {
      let targetLocation =
        this.redirect ?? process.env.VUE_APP_DEFAULT_REDIRECT;
      window.location.replace(targetLocation);
    },

    onResponseData(_: unknown): void {
      // a response has been received
      this.fetching = false;
    },

    onResponseStatus(error?: Error): void {
      if (!error) return;

      if (error == Error.ERR_UNAUTHORIZED) {
        this.disableTotp = false;
        return;
      }

      this.warning = constants.WARNING_PROPS[error];
      if (this.warning) return;

      this.warning = constants.WARNING_PROPS[Error.ERR_UNKNOWN];
      if (this.warning) this.warning.text = error;
    },

    onResponseMetadata(metadata: Metadata): void {
      const header = process.env.VUE_APP_JWT_HEADER;
      const domain = process.env.VUE_APP_COOKIES_DOMAIN;

      if (!metadata || !metadata[header]) {
        return;
      }

      const key = process.env.VUE_APP_TOKEN_COOKIE_KEY;
      cookies.setCookie(key, metadata[header], domain);

      let pathname = window.location.pathname;
      if (constants.RESET_PATH.test(pathname)) {
        window.location.href = constants.LOGIN_PATH_ROOT;
        return;
      }

      this.performRedirect();
    },

    quitWarning() {
      this.warning = undefined;
    },

    onSwitchTheme() {
      this.theme = SwitchTheme(process.env.VUE_APP_THEME_STORAGE_KEY);
    },
  },

  mounted() {
    this.theme = GetTheme(process.env.VUE_APP_THEME_STORAGE_KEY);
    rauthService.subscribe(this);
  },
});
</script>

<style lang="scss">
@import "fibonacci-styles";

* {
  margin: 0;
  padding: 0;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
}

body {
  min-height: 100vh;
  width: 100%;
  background: var(--color-bg-secondary);
}

.container {
  width: $fib-13 * 1px;
  padding-top: $fib-5 * 1vh;
}

.centered-column {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#app {
  @extend .centered-column;
  height: 100vh;
}

.loader-container {
  @extend .centered-column;
  padding-bottom: $fib-9 * 1px;
}

.warning-message {
  margin-bottom: $fib-7 * 1px;
}

.inflate {
  flex: 1;
}

.footer {
  margin-top: $fib-5 * 1vh;
}
</style>
