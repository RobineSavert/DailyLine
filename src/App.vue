<template>
  <component
      :is="layoutComponent"
      v-bind="layoutComponentProps"
  >
    <Modal v-if="eventBus.state.showModal">
      <template #title>{{ eventBus.state.modalTitle }}</template>
      <template #body>
        <component :is="eventBus.state.modalBody" />
      </template>
      <template #button>
        <component :is="eventBus.state.modalButton" />
      </template>
    </Modal>
  </component>
</template>

<script setup>
import eventBus from '@/eventBus';
import {onMounted, computed, watch} from 'vue';
import {useAuthStore} from './stores/AuthStore';
import {useThemeStore} from './stores/themeStore';
import Modal from "@/components/Modal.vue";
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import AccountLayout from './layouts/AccountLayout.vue';
import LinesLayout from "@/layouts/LinesLayout.vue";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import {useRoute} from 'vue-router';

const authStore = useAuthStore();
const themeStore = useThemeStore();

onMounted(() => {
  authStore.init();
  themeStore.fetchUserTheme(authStore.userId); // Load the saved theme for the user, but this might not work because userId is nothing in the auth store...
});

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
    default:
      return MainLayout;
  }
});

const currentTheme = computed(() => themeStore.themeName);


onMounted(async () => {
  await authStore.init(); // Initialize auth
  watch(
      () => authStore.user?.uid,
      async (uid) => {
        if (uid) {
          await themeStore.fetchUserTheme(); // Fetch and apply the user's theme
        }
      },
      { immediate: true }
  );
});

const layoutComponentProps = computed(() => {
  return {
    'data-theme': currentTheme.value, // Pass data-theme explicitly
  };
});

</script>
