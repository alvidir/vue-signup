import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import Card from './components/Card'

createApp(App)
  .use(router)
  .component('scale-loader', ScaleLoader)
  .component('fade-loader', FadeLoader)
  .component('card', Card)
  .mount("#app");

  //GridLoader; PacmanLoader; PulseLoader
