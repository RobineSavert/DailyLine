<template>
  <Alert />

  <TitleComponent :title="'account.title'">
  </TitleComponent>

  <div class="row">
    <div class="col-12 col-md-6" v-for="(accountItem, index) in accountItems" :key="index">
      <Card :panel-collapsable="false" :variant="'none'">
        <template v-slot:title>
          <div class="d-flex justify-content-between">
            <span>{{ t(accountItem.title) }}</span>
            <RouterLink
                :to="{ name: accountItem.link, params: { locale: route.params.locale } }"
            >
              <i class="bi-vector-pen"></i>
            </RouterLink>
          </div>
        </template>
        <template v-slot:body>
          {{ accountItem.body }}
        </template>
      </Card>
    </div>
  </div>

  <div class="d-flex justify-content-center my-4">
    <a @click="onLogout" class="text-danger btn btn-link">{{ $t('account.logout') }}</a>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import Alert from "@/components/Alert.vue";
import { useAccountStore } from "@/stores/AccountStore";
import Card from "@/components/Card.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import TitleComponent from "@/components/TitleComponent.vue";

const { getUser } = useAccountStore();
const { t } = useI18n();
const authStore = useAuthStore();
const { user } = useAuthStore();
const route = useRoute();

getUser();

const onLogout = () => {
  authStore.logoutUser();
};

const accountItems = computed(() => [
  {
    key: 'email-card',
    title: 'account.email',
    link: 'editEmail',  // Gebruik de naam van de subroute
    body: user.email
  },
  {
    key: 'displayname-card',
    title: 'account.display_name',
    link: 'editDisplayName',  // Gebruik de naam van de subroute
    body: user.displayName
  },
  {
    key: 'password-card',
    title: 'account.password',
    link: 'editPassword',  // Gebruik de naam van de subroute
    body: '******'
  },
  {
    key: 'stats-card',
    title: 'account.stats',
    link: 'stats',  // Gebruik de naam van de subroute
    body: t('account.view_stats')
  },
]);
</script>



<style>
.img-circle {
  border-radius: 50%;
  position: relative;
  height: 117px;
  width: 117px;
  overflow: hidden;
}

.img-circle img {
  position: absolute;
  left: 50%;
  width: auto;
  height: 117px;
  transform: translateX(-50%);
}

</style>