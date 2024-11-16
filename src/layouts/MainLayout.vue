<template>
  <div class="container-fluid">
    <div class="row clearfix pt-3 pb-5 mb-5">
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
  <NavBar v-if="isLoggedIn" />
  <Toast />
</template>

<script setup>
import NavBar from '@/components/Layout/NavBar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';

const { isLoggedIn } = storeToRefs(useAuthStore());
</script>
