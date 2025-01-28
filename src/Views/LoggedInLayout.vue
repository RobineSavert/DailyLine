<template>
  <component
      :is="layoutComponent"
      v-bind="layoutComponentProps"
  >
  </component>
</template>


<script setup>
import {onMounted, computed, watch} from 'vue';
import {useAuthStore} from '@/stores/AuthStore';
import {useThemeStore} from '@/stores/themeStore';
import AuthLayout from '@/layouts/AuthLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue'
import AccountLayout from '@/layouts/AccountLayout.vue';
import LinesLayout from "@/layouts/LinesLayout.vue";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import {useRoute} from 'vue-router';
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const route = useRoute();

const layoutComponent = computed(() => {
  console.log(route)
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


onMounted(async () => {

  watch(
      () => authStore.user?.uid,
      async (uid) => {
        if (uid) {
          await themeStore.fetchUserTheme(); // Fetch and apply the user's theme
        }
      },
      { immediate: true }
  );

  await authStore.init();
  await themeStore.fetchUserTheme(authStore.userId); // Load the saved theme for the user, but this might not work because userId is nothing in the auth store...
});

const layoutComponentProps = computed(() => {
  return {
    'data-theme': currentTheme.value
  };
});
const {isLoggedIn} = storeToRefs(useAuthStore());

console.log(isLoggedIn.value)
watch(() => isLoggedIn.value, (newValue) => {
  console.log("isLoggedIn changed:", newValue);
});

</script>

