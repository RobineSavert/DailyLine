<template>
  <form @submit.prevent="onSubmit">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="credentials.email">
      <label for="floatingInput">
        {{ t('auth.forgot_password.form.email')}}
      </label>
    </div>

    <Alert :variant="'danger'" />

    <div class="my-3 row justify-content-center">
      <Button class="w-auto"
              :icon="'key-fill'"
              :content="'buttons.forgot_password'" />

    </div>
    <a @click.prevent="backToLogin" class="cursor-pointer text-sm">Back to login</a>
  </form>
</template>
<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import Alert from "@/components/Alert.vue"
import Button from "@/components/Buttons/Button.vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";

const emit = defineEmits(['backtologin'])
const router = useRouter();
const { t } = useI18n()
const authStore = useAuthStore();

const credentials = reactive({
  email: '',
  password: ''
});

const onSubmit = () => {
  if (!credentials.email) {
    alert('Please enter email');
    return;
  }
  authStore.resetPassword(credentials.email).then(() => {
    router.push({ name: 'auth' });
  })
};


function backToLogin(){
  emit('backtologin', true)
}

</script>