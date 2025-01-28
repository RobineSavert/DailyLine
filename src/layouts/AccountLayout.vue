<template>

    <template v-if="showInBetweenScreen">
      <InBetweenScreen :duration="3000" @finished="handleFinished">
        <template v-slot:image>
          <img class="w-100 img-fluid absolute-height" :src="img" :alt="$t('loading')" />
        </template>
      </InBetweenScreen>
    </template>
    <template v-else>
      <div class="container-fluid">
        <div class="row clearfix pt-3 pb-5 mb-5 account">
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

</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/Layout/NavBar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';
import eventBus from "@/eventBus";
import Modal from "@/components/Modal.vue";
import img from '@/assets/img/img.png';
import InBetweenScreen from "@/Views/InBetweenScreen.vue";

const { isLoggedIn } = storeToRefs(useAuthStore());
let showInBetweenScreen = ref(true);

function handleFinished() {
  showInBetweenScreen.value = false;
}
</script>
<style lang="scss">
.absolute-height {
  height: 100lvh;
}
</style>