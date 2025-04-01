<template>
    <template v-if="showInBetweenScreen">
      <InBetweenScreen :duration="3000" @finished="handleFinished">
        <template v-slot:image>
          <div class="fullscreen-image-container">
            <img class="fullscreen-image" :src="showImageBasedOnTheme" :alt="$t('loading')" />
          </div>
        </template>
      </InBetweenScreen>
    </template>
    <template v-else>
      <div class="container-fluid mb-5 pb-5">
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
import {computed, ref} from 'vue';
import NavBar from '@/components/Layout/NavBar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';
import eventBus from "@/eventBus";
import Modal from "@/components/Modal.vue";
import InBetweenScreen from "@/Views/InBetweenScreen.vue";
import moonWaiting from '@/assets/img/moon/waiting.png';
import wildflowersWaiting from '@/assets/img/wildflowers/waiting.png';
import {useThemeStore} from "@/stores/ThemeStore";

const { isLoggedIn } = storeToRefs(useAuthStore());
let showInBetweenScreen = ref(true);

function handleFinished() {
  showInBetweenScreen.value = false;
}

const themeStore = useThemeStore();

const { themeName } = storeToRefs(themeStore);

const showImageBasedOnTheme = computed(() => {
  if(themeName.value === "moon"){
    return moonWaiting
  } else if(themeName.value === "wildflowers"){
    return wildflowersWaiting
  }
});

</script>
<style lang="scss">
.fullscreen-image-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; // Ensure it's on top of everything
}

.fullscreen-image {
  width: 100%;
  height: 100%;
  object-fit: cover; // This will cover the entire container while maintaining aspect ratio
  object-position: center; // Center the image within the container
}

</style>