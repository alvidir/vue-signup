import { createApp } from 'vue'
import App from './App.vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

const app = createApp(App)
app.component('scale-loader', ScaleLoader)
app.mount('#app')
