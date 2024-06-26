import '@/assets/bootstrap.scss'
import '@/assets/no-touch-zoom.css'
import * as bootstrap from 'bootstrap'
import '@/assets/darkmode.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount('#app')
