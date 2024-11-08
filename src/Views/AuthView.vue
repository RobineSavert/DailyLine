<template>

  <Tabs :id="'auth-tabs'" :tabs="tabs" />
</template>

<script setup>
import Tabs from '@/components/Tabs.vue'
  import { computed, reactive, ref } from 'vue';
  import { useAuthStore } from '@/stores/AuthStore';
  import { storeToRefs } from "pinia"
import LoginView from "@/Views/LoginView.vue";
import RegisterView from "@/Views/RegisterView.vue";

  const register = ref(false);

  const authStore = useAuthStore();

  const { errorMessage } = storeToRefs(useAuthStore())

  const credentials = reactive({
    email: '',
    password: ''
  });

  const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login';
  });

  const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert('Please enter email and password');
      return;
    }

    if (register.value) {
      authStore.registerUser(credentials);
    } else {
      authStore.loginUser(credentials);
    }
  };

const tabs = computed(() => [
  {key: 'login-tab', component: LoginView, icon: 'rss-fill', translation: 'login' },
  {key: 'register-tab', component: RegisterView, icon: 'rss-fill', translation: 'register' },
])
</script>
