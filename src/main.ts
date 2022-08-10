import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { i18n } from './util/i18n'

createApp(App)
    .use(ElementPlus)
    .use(createPinia())
    .use(i18n)
    .mount("#app");
