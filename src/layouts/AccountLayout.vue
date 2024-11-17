<template>
  <template v-if="showInBetweenScreen">
    <InBetweenScreen :duration="3000" @finished="handleFinished">
      <template v-slot:image>
        <img class="w-100 img-fluid" :src="img" :alt="'t(loading)'" />
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
    <Toast />
  </template>
</template>
<script setup>
import NavBar from '@/components/Layout/NavBar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';
import img from '@/assets/img/img.png';
import InBetweenScreen from "@/Views/InBetweenScreen.vue";
import {ref} from "vue";

let showInBetweenScreen = ref(true)


function handleFinished() {
  showInBetweenScreen.value = false;
}

const { isLoggedIn } = storeToRefs(useAuthStore());
</script>