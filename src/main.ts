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
