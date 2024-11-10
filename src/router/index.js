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
  },
  {
    path: '/:locale?/account',
    component: AccountView,
    name: 'account'
  },
  {
    path: '/:locale?/edit-display-name',
    component: editDisplayName,
    name: 'editDisplayName'
  },
  {
    path: '/:locale?/edit-email',
    component: editEmail,
    name: 'editEmail'
  },
  {
    path: '/:locale?/edit-password',
    component: editPassword,
    name: 'editPassword'
  },
  {
    path: '/:locale?/settings',
    component: SettingsView,
    name: 'settings'
  },
  {
    path: '/:locale?/add',
    component: AddLine,
    name: 'add'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
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

  next();
});

export default router
