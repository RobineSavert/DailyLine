<template>
  <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
    <div class="container px-2">
      <div class="navbar-brand">
        <LanguageSwitcher />
        <RouterLink :to="{ name: 'lines', params: { locale: Tr.currentLocale } }" class="navbar-item is-size-4 is-family-monospace">
          Lines
        </RouterLink>
        <RouterLink :to="{ name: 'forgot-password' }">
          forgot password
        </RouterLink>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showNavBarMenu }"
          @click.prevent="showNavBarMenu = !showNavBarMenu"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" :class="{ 'is-active': showNavBarMenu }" class="navbar-menu">
        <div class="navbar-start" v-if="authStore.user.uid">
          <button class="button is-info is-small mt-3 ml-3" @click.prevent="onLogout">
            Logout {{ authStore.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink :to="{ name: 'lines', params: { locale: Tr.currentLocale } }" active-class="is-active" class="navbar-item">
            Lines
          </RouterLink>


            <RouterLink :to="{ name: 'stats', params: { locale: Tr.currentLocale } }">Stats</RouterLink>


        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/AuthStore';
  import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
  import Tr from "@/i18n/translation"
  const showNavBarMenu = ref(false);
  const authStore = useAuthStore();

  const onLogout = () => {
    authStore.logoutUser();
  };
</script>

<style scoped>
  @media (max-width: 1023px) {
    .navbar-menu {
      position: absolute;
      left: 0;
      right: 0;
    }
  }
</style>
