<template>
  <form @submit.prevent="onSubmit">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" :placeholder="'auth.placeholder.email'" v-model="credentials.email">
      <label for="floatingInput">
        {{ t('auth.register.form.email')}}
      </label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" :placeholder="'auth.placeholder.password'" v-model="credentials.password">
      <label for="floatingPassword">
        {{ t('auth.register.form.password')}}
      </label>
    </div>

    <Alert />

    <div class="my-3 row justify-content-center">
      <Button class="w-auto"
              :icon="'person-fill'"
              :content="'auth.register.button'" />
    </div>
  </form>
</template>
<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import Alert from "@/components/Alert.vue";
import Button from "@/components/Buttons/Button.vue";
import {useI18n} from "vue-i18n";
import {useMessageStore} from "@/stores/MessagesStore";

const { addMessage } = useMessageStore()
const { t } = useI18n()
const authStore = useAuthStore();


const credentials = reactive({
  email: '',
  password: ''
});


const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    addMessage(1, { title: 'auth.please_enter', type: 'danger' })
    return;
  }

    authStore.registerUser(credentials);

};


</script>