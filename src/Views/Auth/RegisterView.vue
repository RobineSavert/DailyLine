<template>
<!--  <form @submit.prevent="onSubmit">-->
<!--    <div class="card auth-form">-->
<!--      <div class="card-content">-->
<!--        <div class="title has-text-centered">{{ $t("register") }}</div>-->
<!--        <div class="content">-->
<!--          <div class="field">-->
<!--            <label class="label">Email</label>-->
<!--            <div class="control">-->
<!--              <input class="input" type="email" placeholder="Email Address" v-model="credentials.email" />-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="field">-->
<!--            <label class="label">Password</label>-->
<!--            <div class="control">-->
<!--              <input-->
<!--                  class="input"-->
<!--                  type="Password"-->
<!--                  placeholder="Enter Password"-->
<!--                  v-model="credentials.password"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--          {{ errorMessage}}-->
<!--          <div class="field is-grouped is-grouped-right">-->
<!--            <p class="control">-->
<!--              <button class="button is-danger">{{ $t("register") }}</button>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </form>-->
















  <form @submit.prevent="onSubmit">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="credentials.email">
      <label for="floatingInput">
        {{ t('auth.register.form.email')}}
      </label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="credentials.password">
      <label for="floatingPassword">
        {{ t('auth.register.form.password')}}
      </label>
    </div>

    <Alert :variant="'danger'" />

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
import { storeToRefs } from "pinia"
import Alert from "@/components/Alert.vue";
import Button from "@/components/Buttons/Button.vue";
import {useI18n} from "vue-i18n";


const { t } = useI18n()

const authStore = useAuthStore();


const credentials = reactive({
  email: '',
  password: ''
});


const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter email and password');
    return;
  }

    authStore.registerUser(credentials);

};


</script>