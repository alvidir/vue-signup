import { createApp } from "vue";
import App from "./App.vue";
import includeFields from "vue-fields/src/main";
import includeButtons from "vue-buttons/src/main";
import includeCards from "vue-cards/src/main";

const app = createApp(App);
includeFields(app);
includeButtons(app);
includeCards(app);
app.mount("#app");

// Components as a library
import SignOn from "./components/SignOn.vue";
import RauthService from "./rauth.service";

const SIGN_ON_TAG = "sign-on";

export { SignOn, RauthService };

// eslint-disable-next-line
export function include(app: any): any {
  app.component(SIGN_ON_TAG, SignOn);
}
