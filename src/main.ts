import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

createApp(App)
  .use(router)
  .component('scale-loader', ScaleLoader)
  .component('fade-loader', FadeLoader)
  .mount("#app");

  //GridLoader; PacmanLoader; PulseLoader
