import { createApp } from 'vue'
import App from './App.vue'
import { include as includeFieldsComponents } from "vue-fields/src/main"
import { include as includeButtonsComponents } from "vue-buttons/src/main"

const app = createApp(App)
includeFieldsComponents(app)
includeButtonsComponents(app)
app.mount("#app")