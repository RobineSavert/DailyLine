<template>
  <div class="bg-gradient-primary vh-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row align-items-center auth-tabs">
        <div class="text-center vertical-align p-5">
          <h1 class="h4 text-light mb-3">
            {{ t('title') }}
          </h1>
          <p class="text-sm text-light mb-5">
            {{ t('intro') }}
          </p>
          <Tabs :id="'auth-tabs'" :tabs="tabs" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tabs from '@/components/Tabs.vue'
import {computed} from 'vue';
import LoginView from "@/Views/Auth/LoginView.vue";
import RegisterView from "@/Views/Auth/RegisterView.vue";
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const tabs = computed(() => [
  {key: 'login-tab', component: LoginView, icon: 'key-fill', translation: 'auth.login.title'},
  {key: 'register-tab', component: RegisterView, icon: 'person-fill', translation: 'auth.register.title'},
])
</script>

<style lang="scss">
  .auth-tabs .nav-tabs{
    border: 0 !important;

    .nav-link {
      border: 0 !important;
      background: transparent;
      color: #fff;

      &.active {
        background: transparent;
        color: #fff;
        border-bottom: 1px solid #fff !important;
      }
    }
  }
</style>