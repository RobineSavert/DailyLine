<template>
  <component :is="layoutComponent"></component>
</template>

<script setup>
import { onMounted, computed, watch, nextTick } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useThemeStore } from '@/stores/themeStore';
import AuthLayout from '@/layouts/AuthLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue'
import AccountLayout from '@/layouts/AccountLayout.vue';
import LinesLayout from "@/layouts/LinesLayout.vue";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const route = useRoute();

const layoutComponent = computed(() => {
  switch (true) {
    case route.path.startsWith('/' + route.params.locale + '/account'):
      return AccountLayout;
    case route.path.startsWith('/' + route.params.locale + '/lines'):
      return LinesLayout;
    case route.path.startsWith('/' + route.params.locale + '/settings'):
      return SettingsLayout;
    case route.meta.layout === 'auth':
      return AuthLayout;
    case route.meta.layout === 'main':
      return MainLayout;
    case route.path.startsWith('/' + route.params.locale + '/dashboard'):
      return MainLayout;
    default:
      return MainLayout;
  }
});

const currentTheme = computed(() => themeStore.themeName);

function updateBodyTheme(theme) {
  document.body.setAttribute('data-bs-theme', theme);
}

onMounted(async () => {
  watch(
      () => currentTheme.value,
      async (newTheme) => {
        await nextTick();
        updateBodyTheme(newTheme);
      },
      {immediate: true}
  );

  watch(
      () => authStore.user?.uid,
      async (uid) => {
        if (uid) {
          await themeStore.fetchUserTheme();
        }
      },
      {immediate: true}
  );

  await authStore.init();
  await themeStore.fetchUserTheme(authStore.userId);
});

const {isLoggedIn} = storeToRefs(useAuthStore());

watch(() => isLoggedIn.value, (newValue) => {
  console.log("isLoggedIn changed:", newValue);
});
</script>