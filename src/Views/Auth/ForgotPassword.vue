<template>
  <form @submit.prevent="onSubmit">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInputForgotPassword" :placeholder="'auth.register.placeholder.email'" v-model="credentials.email">
      <label for="floatingInputForgotPassword">
        {{ t('auth.forgot_password.form.email')}}
      </label>
    </div>

    <Alert :variant="'danger'" />

    <div class="my-3 row justify-content-center">
      <Button class="w-auto"
              :icon="'key-fill'"
              :content="'buttons.forgot_password'" />

    </div>
    <a @click.prevent="backToLogin" class="btn btn-link text-light text-sm">
      {{ $t('auth.forgot_password.back_to_login') }}
    </a>
  </form>
</template>
<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import Alert from "@/components/Alert.vue"
import Button from "@/components/Buttons/Button.vue";
import {useI18n} from "vue-i18n";
import { useRouter} from "vue-router";
import {useMessageStore} from "@/stores/MessagesStore";

const emit = defineEmits(['backtologin'])
const router = useRouter();
const { t } = useI18n()
const authStore = useAuthStore();
const { addMessage } = useMessageStore()

const credentials = reactive({
  email: '',
  password: ''
});

const onSubmit = () => {
  if (!credentials.email) {
    alert('Please enter email');
    addMessage(1,{ title: 'Please change something', type: 'danger' });
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