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
import NavBar from './components/Layout/NavBar.vue';
import { useAuthStore } from './stores/AuthStore';
import Modal from "@/components/Modal.vue";
import {storeToRefs} from "pinia";
import Alert from "@/components/Alert.vue"
import Card from "@/components/Card.vue"
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(useAuthStore())

onMounted(() => {
  authStore.init();
});




const route = useRoute();

const layoutComponent = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : MainLayout;
});
</script>