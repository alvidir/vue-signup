import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

createApp(App)
  .use(router)
  .component('scale-loader', ScaleLoader)
  .mount("#app");
