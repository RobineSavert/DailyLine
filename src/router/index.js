import { createRouter, createWebHistory } from 'vue-router';

import LinesView from '../Views/LinesView.vue';
import EditLineView from '../Views/Lines/EditLineView.vue';
import AuthView from '../Views/AuthView.vue';
import ForgotPassword from "@/Views/Auth/ForgotPassword.vue";
import AccountView from "@/Views/AccountView.vue";
import SettingsView from "@/Views/SettingsView.vue";
import AddLine from "@/Views/Lines/AddLine.vue";
import editDisplayName from "@/Views/Account/editDisplayName.vue";
import editEmail from "@/Views/Account/editEmail.vue"
import editPassword from "@/Views/Account/editPassword.vue"
import Tr from "@/i18n/translation"
import DashboardView from "@/Views/DashboardView.vue";
import editBookName from "@/Views/Account/editBookName.vue";

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
    meta: {layout: 'account'}
  },
  {
    path: '/:locale?/account/edit-display-name',
    component: editDisplayName,
    name: 'editDisplayName',
    meta: { layout: 'account' }
  },
  {
    path: '/:locale?/account/edit-email',
    component: editEmail,
    name: 'editEmail',
    meta: { layout: 'account' }
  },
  {
    path: '/:locale?/account/edit-password',
    component: editPassword,
    name: 'editPassword',
    meta: { layout: 'account' }
  },
  {
    path: '/:locale?/account/edit-bookname',
    component: editBookName,
    name: 'editBookName',
    meta: { layout: 'account' }
  },
  {
    path: "/:locale?/dashboard",
    component: DashboardView,
    name: 'dashboard',
    meta: { layout: 'main' }
  },
  {
    path: "/:locale?/lines",
    component: LinesView,
    name: 'lines',
    meta: {layout: 'lines'}
  },
  {
    path: '/:locale?/lines/edit-line/:id',
    component: EditLineView,
    name: 'editLine',
    meta: { layout: 'main' }
  },
  {
    path: '/:locale?/settings',
    component: SettingsView,
    name: 'settings',
    meta: { layout: 'settings' }
  },
  {
    path: '/:locale?/add-line',
    component: AddLine,
    name: 'add-line',
    meta: { layout: 'main' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  console.log('Navigating to:', to.name, 'Meta:', to.meta);

  const locale = to.params.locale || Tr.defaultLocale;
  if (!Tr.isLocaleSupported(locale)) {
    next({ ...to, params: { ...to.params, locale: Tr.defaultLocale } });
  } else {
    await Tr.switchLanguage(locale);
    next();
  }
});


export default router
