<template>
  <component :is="layoutComponent">
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
import eventBus from '@/eventBus'
import { onMounted } from 'vue';
import { useAuthStore } from './stores/AuthStore';
import Modal from "@/components/Modal.vue";
import {storeToRefs} from "pinia";
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import AccountLayout from './layouts/AccountLayout.vue';
import LinesLayout from "@/layouts/LinesLayout.vue";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(useAuthStore())

onMounted(() => {
  authStore.init();
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

</script>