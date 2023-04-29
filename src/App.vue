<!-- <script lang="ts">
import { defineComponent } from "vue";
import Profile from "vue-profile/src/profile";
import SignOn, {
  FIELD_USERNAME,
  FIELD_PASSWORD,
  FIELD_TOTP,
} from "@/components/SignOn.vue";
import Banner from "@/components/AppBanner.vue";
import Options from "@/components/OptionLinks.vue";
import BottomBar from "@/components/BottomBar.vue";
import RauthService, { Metadata, Error } from "@/services/rauth.rpc.js";
import Config from "@/config.json";
import * as constants from "@/constants";
import * as cookies from "@/cookies";

const rauthService = new RauthService(Config.RAUTH_SERVER_URI);

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
    BottomBar,
  },

  setup() {
    const profile = new Profile();
    profile.setDomain(Config.ALVIDIR_BASE_URI);

    return {
      profile,
      Config,
    };
  },

  data() {
    return {
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

      return paramsByKey[Config.TOKEN_QUERY_PARAM];
    },

    redirect(): string | undefined {
      if (!constants.queryParams) return undefined;

      let paramsByKey: { [key: string]: string } = {};
      constants.queryParams.match(/\w=\w*/)?.forEach((param: string) => {
        const item = param.split("=");
        paramsByKey[item[0]] = item[1];
      });

      return paramsByKey[Config.REDIRECT_QUERY_PARAM];
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
        const tokenHeader = Config.JWT_HEADER;
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
      let targetLocation = this.redirect ?? Config.DEFAULT_REDIRECT;
      window.location.replace(targetLocation);
    },

    // onResponseData(): void {
    //   // a response has been received
    //   this.fetching = false;
    // },

    // onResponseStatus(error?: Error): void {
    //   if (!error) return;

    //   if (error == Error.ERR_UNAUTHORIZED) {
    //     this.disableTotp = false;
    //     return;
    //   }

    //   this.warning = constants.WARNING_PROPS[error];
    //   if (this.warning) return;

    //   this.warning = constants.WARNING_PROPS[Error.ERR_UNKNOWN];
    //   if (this.warning) this.warning.text = error;
    // },

    // onResponseMetadata(metadata: Metadata): void {
    //   const header = Config.JWT_HEADER;
    //   const domain = Config.ALVIDIR_BASE_URI;

    //   if (!metadata || !metadata[header]) {
    //     return;
    //   }

    //   const key = Config.TOKEN_COOKIE_KEY;
    //   cookies.setCookie(key, metadata[header], domain);

    //   let pathname = window.location.pathname;
    //   if (constants.RESET_PATH.test(pathname)) {
    //     window.location.href = constants.LOGIN_PATH_ROOT;
    //     return;
    //   }

    //   this.performRedirect();
    // },

    quitWarning() {
      this.warning = undefined;
    },

    onSwitchTheme() {
      this.context.switchTheme();
    },
  },

  mounted() {
    rauthService.subscribe(this);
  },
});
</script> -->

<script setup lang="ts">
import { ref } from "vue";
import Profile from "vue-menus/src/profile";
import WarningList from "@/components/WarningList.vue";
import config from "@/config.json";

const profile = ref<Profile>(new Profile(""));
</script>

<template>
  <div id="main">
    <warning-list></warning-list>
    <regular-card class="shadow-box">
      <img id="logo" :src="config.ALVIDIR_LOGO_URI" />
      <router-view />
    </regular-card>
  </div>
  <span class="inflate"></span>
</template>

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

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

#main {
  width: $fib-13 * 1px;
  padding-top: $fib-5 * 1vh;
}

img {
  margin-top: $fib-7 * 1px;
  margin-bottom: $fib-6 * 1px;
  height: $fib-10 * 1px;
  width: 100%;
}

nav {
  display: flex;
  justify-content: center;

  a {
    font-size: small;
    text-align: center;

    &.primary {
      font-weight: 600;
    }
  }

  span {
    color: var(--color-border);
    margin-left: $fib-5 * 1px;
    margin-right: $fib-5 * 1px;
  }
}
</style>
