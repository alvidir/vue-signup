import { createApp } from 'vue'
import App from './App.vue'
import { include as includeFieldsComponents } from "vue-fields/src/main"
import { include as includeButtonsComponents } from "vue-buttons/src/main"

const app = createApp(App)
includeFieldsComponents(app)
includeButtonsComponents(app)
app.mount("#app")

// Components as a library
import SignOn from "./components/SignOn.vue"

const SIGN_ON_TAG = "sign-on"

export {
    SignOn,
}

export function include(app: any): any {
    app.component(SIGN_ON_TAG, SignOn)
}