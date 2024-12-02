<template>
    <Alert />

    <TitleComponent :title="'account.title'" />

    <div class="row" v-if="accountItems">
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
            <span v-if="accountItem.key !== 'bookcover-card'">{{ accountItem.body }}</span>
            <!-- Render the book cover image if it's the bookcover-card -->
            <img v-else-if="accountItem.key === 'bookcover-card'" :src="bookCover" class="img-fluid" alt="Book Cover" />
            <span v-else>-</span>
          </template>
        </Card>
      </div>
    </div>

    <div class="row">
      <div class="col d-flex justify-content-center my-4">
          <a @click="onLogout" class="text-danger btn btn-link">{{ $t('account.logout') }}</a>
      </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import Alert from "@/components/Alert.vue";
import { useAccountStore } from "@/stores/AccountStore";
import Card from "@/components/Card.vue";
import {computed, ref} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import TitleComponent from "@/components/TitleComponent.vue";
import { useBookStore } from '@/stores/BookStore';
import {storeToRefs} from "pinia";

const { bookName, bookCover } = storeToRefs(useBookStore())


import { onMounted } from 'vue';

const bookStore = useBookStore();

onMounted(() => {
  bookStore.fetchBookName();
  bookStore.fetchBookCover();
});

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
    link: 'editEmail',
    body: user.email
  },
  {
    key: 'displayname-card',
    title: 'account.display_name',
    link: 'editDisplayName',
    body: user.displayName
  },
  {
    key: 'bookname-card',
    title: 'account.bookname',
    link: 'editBookName',
    body: bookName.value
  },
  {
    key: 'password-card',
    title: 'account.password',
    link: 'editPassword',
    body: '******'
  },
  {
    key: 'bookcover-card',
    title: 'account.bookcover',
    link: 'editBookCover',
    body: bookCover.value ? `<img src="${bookCover.value}" class="img-fluid" alt="Book Cover">` : 'No cover available'

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