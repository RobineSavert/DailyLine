<template>
  <NavBar />
  <div class="container px-2">
    <RouterView />
  </div>

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
const authStore = useAuthStore();

  onMounted(() => {
    authStore.init();
  });
</script>