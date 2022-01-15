import { createApp } from 'vue'
import App from './App.vue'
import { include as includeFieldsComponents } from "vue-fields/src/main"
import { include as includeButtonsComponents } from "vue-buttons/src/main"

const app = createApp(App)
includeFieldsComponents(app)
includeButtonsComponents(app)
app.mount("#app")

// Components as a library
import SignUp from "./components/SignUp.vue"

const SIGN_UP_TAG = "sign-up"

export {
    SignUp,
}

export function include(app: any): any {
    app.component(SIGN_UP_TAG, SignUp)
}