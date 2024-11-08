<template>
  <NavBar v-if="isLoggedIn" />

  <RouterView></RouterView>

  <Modal v-if="eventBus.state.showModal">
    <template #title>
      {{ eventBus.state.modalTitle }}
    </template>
    <template #body>
      <component :is="eventBus.state.modalBody" />
    </template>
    <template #button>
      <component :is="eventBus.state.modalButton" />
    </template>
  </Modal>
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

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(useAuthStore())

onMounted(() => {
  authStore.init();
});
</script>