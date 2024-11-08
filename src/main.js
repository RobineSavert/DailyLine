import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import "bootstrap"
import i18n from './i18n'
import { BootstrapIcon } from '@dvuckovic/vue3-bootstrap-icons'
import { injectBootstrapIcons } from '@dvuckovic/vue3-bootstrap-icons/utils'
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/AuthStore';
import "@/assets/scss/styles.scss"
import BootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg?raw'

const app = createApp(App);

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  const isAuthenticated = authStore.user.uid ? true : false;

  if (isAuthenticated && to.name === 'auth') {
    return { name: 'lines' };
  }

  if (!isAuthenticated && to.name !== 'auth') {
    return { name: 'auth' };
  }
});

const pinia = createPinia();
injectBootstrapIcons(BootstrapIcons)
app.component('BootstrapIcon', BootstrapIcon)
app.use(i18n)
app.use(router);
app.use(pinia);
app.mount('#app');
