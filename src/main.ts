import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from 'pinia'
import { i18n } from './util/i18n'

createApp(App)
    .use(createPinia())
    .use(i18n)
    .mount("#app");
