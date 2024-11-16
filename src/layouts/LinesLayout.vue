<template>
  <div class="container-fluid">
    <div class="row clearfix pt-3 pb-5 mb-5 lines">
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
  <NavBar v-if="isLoggedIn" />
  <Modal v-if="eventBus.state.showModal">
    <template #title>{{ eventBus.state.modalTitle }}</template>
    <template #body>
      <component :is="eventBus.state.modalBody" />
    </template>
    <template #button>
      <component :is="eventBus.state.modalButton" />
    </template>
  </Modal>
  <Toast />
</template>
<script setup>
import NavBar from '@/components/Layout/NavBar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';
import eventBus from "@/eventBus";
import Modal from "@/components/Modal.vue";

const { isLoggedIn } = storeToRefs(useAuthStore());
</script>