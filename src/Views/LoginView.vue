<template>
  <form @submit.prevent="onSubmit">
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ $t("login") }}</div>
        <div class="content">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" placeholder="Email Address" v-model="credentials.email" />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                  class="input"
                  type="Password"
                  placeholder="Enter Password"
                  v-model="credentials.password"
              />
            </div>
          </div>
          {{ errorMessage}}
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-danger">{{ $t("login") }}</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from "pinia"

const register = ref(false);

const authStore = useAuthStore();

const { errorMessage } = storeToRefs(useAuthStore())

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


</script>