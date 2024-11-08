import { createRouter, createWebHashHistory } from 'vue-router';

import LinesView from '../Views/LinesView.vue';
import StatsView from '../Views/StatsView.vue';
import EditLineView from '../Views/EditLineView.vue';
import AuthView from '../Views/AuthView.vue';
import ForgotPassword from "@/Views/ForgotPassword.vue";
import Tr from "@/i18n/translation"

const routes = [
  {
    path: "/:locale?",
    beforeEnter: Tr.routeMiddleware,
    component: LinesView,
    name: 'lines',
  },
  {
    path: '/:locale?/edit-line/:id',
    component: EditLineView,
    name: 'editLine'
  },
  {
    path: '/:locale?/stats',
    component: StatsView,
    name: 'stats'
  },
  {
    path: '/auth',
    component: AuthView,
    name: 'auth'
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgot-password'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  console.log(to.name) //forgot-password



  const locale = to.params.locale || Tr.defaultLocale;

  if (Tr.currentLocale && Tr.currentLocale.toLowerCase() !== locale.toLowerCase()) {
    const isSupportedLocale = Tr.isLocaleSupported(locale);

    if (isSupportedLocale) {
      await Tr.switchLanguage(locale);
    } else {
      to.params.locale = Tr.defaultLocale;
      await Tr.switchLanguage(Tr.defaultLocale);
    }
  } else if (!to.params.locale) {
    to.params.locale = Tr.defaultLocale;
    await Tr.switchLanguage(to.params.locale);
  }

  // Ga verder met de navigatie
  next();
});

export default router
