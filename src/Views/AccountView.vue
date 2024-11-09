<template>
  <a @click="onLogout">logout</a>
</template>
<script setup>
import {useAuthStore} from "@/stores/AuthStore";


const authStore = useAuthStore();
const onLogout = () => {
  authStore.logoutUser();
};
</script>
