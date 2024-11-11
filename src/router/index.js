import { createRouter, createWebHashHistory } from 'vue-router';

import LinesView from '../Views/LinesView.vue';
import EditLineView from '../Views/Lines/EditLineView.vue';
import AuthView from '../Views/AuthView.vue';
import ForgotPassword from "@/Views/ForgotPassword.vue";
import AccountView from "@/Views/AccountView.vue";
import SettingsView from "@/Views/SettingsView.vue";
import AddLine from "@/Views/Lines/AddLine.vue";
import editDisplayName from "@/Views/Account/editDisplayName.vue";
import editEmail from "@/Views/Account/editEmail.vue"
import editPassword from "@/Views/Account/editPassword.vue"
import StatsView from '../Views/Account/StatsView.vue';
import Tr from "@/i18n/translation"
import {useAuthStore} from "@/stores/AuthStore";

const routes = [
  {
    path: '/auth',
    component: AuthView,
    name: 'auth',
    meta: { layout: 'auth' }
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgot-password',
    meta: { layout: 'auth' }
  },
  {
    path: '/:locale?/account',
    component: AccountView,
    name: 'account',
    meta: { layout: 'main' }
  },

  {
    path: "/:locale?",
    beforeEnter: Tr.routeMiddleware,
    component: LinesView,
    name: 'lines',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/edit-line/:id',
    component: EditLineView,
    name: 'editLine',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/stats',
    component: StatsView,
    name: 'stats',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/edit-display-name',
    component: editDisplayName,
    name: 'editDisplayName',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/edit-email',
    component: editEmail,
    name: 'editEmail',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/edit-password',
    component: editPassword,
    name: 'editPassword',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/settings',
    component: SettingsView,
    name: 'settings',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/add',
    component: AddLine,
    name: 'add',
    meta: { layout: 'main' }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  const locale = to.params.locale || Tr.defaultLocale;

  console.log(Tr.currentLocale)

  if (Tr.currentLocale) {
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

  next();
});

export default router
