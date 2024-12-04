import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import "bootstrap"
import i18n from './i18n'
import { createPinia } from 'pinia';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/scss/styles.scss'
import '@/assets/themes/wildflowers.scss'
import '@/assets/themes/dark.scss'
import '@/assets/themes/stars.scss'
import 'core-js/es/array/includes'
import Toast from '/src/components/Toast.vue'


const app = createApp(App);


const pinia = createPinia();
app.use(i18n)
app.use(router);
app.use(pinia);
app.component('Toast', Toast)
app.mount('#app');
