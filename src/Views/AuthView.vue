<template>
  <div class="bg-gradient-primary vh-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center pt-4">
        <div class="col-xl-5 col-lg-12">
          <Card :panel-i-d="'loginPanel'" :noPadding="true" :panel-collapsable="false" :panel-header="false" :variant="'none'" class="o-hidden border-0 shadow-lg">
            <template v-slot:body>
              <div class="row align-items-center">

                  <div class="text-center vertical-align p-5">

                    <h1 class="h4 text-gray-900 mb-3">
                      {{ t('title')}}
                    </h1>

                    <p class="text-sm mb-5">
                      {{ t('intro')}}
                    </p>

                    <Tabs :id="'auth-tabs'" :tabs="tabs" />
                  </div>

              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Tabs from '@/components/Tabs.vue'
import { computed } from 'vue';
import LoginView from "@/Views/LoginView.vue";
import RegisterView from "@/Views/RegisterView.vue";
import Card from "@/components/Card.vue";
import Alert from "@/components/Alert.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const tabs = computed(() => [
  { key: 'login-tab', component: LoginView, icon: 'key-fill', translation: 'auth.login.title' },
  { key: 'register-tab', component: RegisterView, icon: 'person-fill', translation: 'auth.register.title' },
])
</script>
