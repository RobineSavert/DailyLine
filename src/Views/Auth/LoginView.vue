<template>
  <ForgotPassword @backtologin="showLogin" v-if="forgotPassword"></ForgotPassword>


<div v-else>
  <form @submit.prevent="onSubmit" >
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="credentials.email">
      <label for="floatingInput">
        {{ t('auth.login.form.email')}}
      </label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="credentials.password">
      <label for="floatingPassword">
        {{ t('auth.login.form.password')}}
      </label>
    </div>

    <Alert :variant="'danger'" />

    <div class="my-3 row justify-content-center">
      <Button class="w-auto"
              :icon="'key-fill'"
              :content="'auth.login.button'" />

    </div>


  </form>
  <a @click.prevent="showResetPW" class="cursor-pointer text-sm">forgot password</a>
</div>

</template>
<script setup>
import {reactive, ref} from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import Alert from "@/components/Alert.vue"
import Button from "@/components/Buttons/Button.vue";
import {useI18n} from "vue-i18n";
import ForgotPassword from "@/Views/ForgotPassword.vue";

const { t } = useI18n()
const authStore = useAuthStore();
const forgotPassword = ref(false)

const credentials = reactive({
  email: '',
  password: ''
});

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter email and password');
    return;
  }
  authStore.loginUser(credentials);
};


function showResetPW(){
  forgotPassword.value = true
}

function showLogin(){
  forgotPassword.value = false
}

</script>