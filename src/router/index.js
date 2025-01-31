import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from "@/stores/AuthStore"
import Tr from "@/i18n/translation"
import LoggedInLayout from "@/Views/LoggedInLayout.vue"
import DashboardView from "@/Views/DashboardView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:locale?",
      beforeEnter: Tr.routeMiddleware,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../Views/NotFound.vue'),
    },
    {
      path: '/',
      redirect: to => {
        return { name: 'auth', params: { locale: Tr.defaultLocale } }
      }
    },
    {
      path: '/:locale/auth',
      name: 'auth',
      component: () => import('../Views/AuthView.vue'),
    },
    {
      path: '/:locale/dashboard',
      name: 'dashboardLayout', // Change this name
      component: LoggedInLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard', // Keep this name
          component: DashboardView
        }
      ]
    },
    {
      path: '/Logout',
      name: 'Logout',
    },
    {
      path: '/:locale',
      name: 'loggedin',
      component: LoggedInLayout,
      children: [
        {
          path: 'lines',
          name: 'lines',
          component: () => import('../Views/LinesView.vue'),
        },
        {
          path: 'add-line',
          name: 'add-line',
          component: () => import('../Views/Lines/AddLine.vue'),
        },
        {
          path: 'lines/edit-line/:id',
          name: 'editLine',
          component: () => import('../Views/Lines/EditLineView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../Views/SettingsView.vue'),
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../Views/AccountView.vue'),
        },
        {
          path: 'account/edit-display-name',
          name: 'editDisplayName',
          component: () => import('../Views/Account/editDisplayName.vue'),
        },
        {
          path: 'settings/edit-email',
          name: 'editEmail',
          component: () => import('../Views/Account/editEmail.vue'),
        },
        {
          path: 'settings/edit-password',
          name: 'editPassword',
          component: () => import('../Views/Account/editPassword.vue'),
        },
        {
          path: 'settings/edit-bookname',
          name: 'editBookName',
          component: () => import('../Views/Account/editBookName.vue'),
        },
      ]
    },
  ],
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  await authStore.checkAuthState();

  const isAuthenticated = authStore.isLoggedIn;
  console.log("Navigating to:", to.name, "Locale:", to.params.locale);


  if (to.params.locale === undefined || to.params.locale === '') {
    to.params.locale = Tr.defaultLocale;
  }

  if (Tr.currentLocale !== to.params.locale) {
    let isSupportedLocale = Tr.isLocaleSupported(to.params.locale);
    if (isSupportedLocale) {
      await Tr.switchLanguage(to.params.locale);
    } else {
      to.params.locale = Tr.defaultLocale;
      await Tr.switchLanguage(Tr.defaultLocale);
    }
  }

  // Handle authentication
  if (to.name === 'auth' && isAuthenticated) {
    console.log('Redirecting authenticated user from auth to dashboard');
    return next({ name: 'dashboard', params: { locale: to.params.locale } });
  }

  if (to.name === 'Logout') {
    console.log('Logging out user');
    await authStore.logoutUser();
    return next({ name: 'auth', params: { locale: to.params.locale } });
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Unauthenticated user trying to access protected route');
    return next({ name: 'auth', params: { locale: to.params.locale } });
  }

  // if (to.meta.requiresAuth && !authStore.isLoggedIn) {
  //   next('/login');
  // } else if (to.path === '/login' && authStore.isLoggedIn) {
  //   next('/');
  // } else {
  //   next();
  // }

  console.log(isAuthenticated)

  if (to.path === '/') {
    console.log('Root path accessed, redirecting based on auth status');
    return next(isAuthenticated
        ? { name: 'dashboard', params: { locale: to.params.locale } }
        : { name: 'auth', params: { locale: to.params.locale } }
    );
  }

  console.log('Proceeding with navigation');
  next();
});

export default router