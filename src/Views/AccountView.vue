<template>
  <Alert />

  <TitleComponent :title="'account.title'" />

  <div class="row">
    <div class="col justify-content-center d-flex">
      <div class="img-circle border" v-if="userPhoto">
        <img :src="userPhoto" alt="Book Cover" />
      </div>
      <span v-else>No cover available</span>
    </div>
  </div>

  <div class="row mb-4">
    <div class="col justify-content-center d-flex">
      <i class="bi-pencil" @click="changePhoto()"></i>
    </div>
  </div>

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
import {useRoute, useRouter} from "vue-router";
import TitleComponent from "@/components/TitleComponent.vue";
import { useBookStore } from '@/stores/BookStore';
import {storeToRefs} from "pinia";
import { onMounted } from 'vue';
import {getAuth} from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Tr from "@/i18n/translation";

const bookStore = useBookStore();
const { bookName } = storeToRefs(useBookStore())
const { getUser } = useAccountStore();
const { t } = useI18n();
const authStore = useAuthStore();
const { user } = useAuthStore();
const route = useRoute();
const router = useRouter();

const auth = getAuth();
const userPhoto = ref(auth.currentUser?.photoURL || null);

onMounted(() => {
  bookStore.fetchBookName();
});

getUser();

const userLocale = Tr.currentLocale || 'en';

const onLogout = async () => {
  console.log("Logout initiated");
  try {
    await authStore.logoutUser();
    console.log("Signout successful");
    // Redirect to the login page or home page
    await router.push('/' + userLocale + '/auth'); // or router.push('/') depending on your route structure
  } catch (error) {
    console.error("Logout failed", error);
  }
  console.log("Logout process completed");
};



const accountItems = computed(() => [
  {
    key: 'email-card',
    title: 'account.email',
    link: 'editEmail',
    body: user.email
  },
  {
    key: 'password-card',
    title: 'account.password',
    link: 'editPassword',
    body: '******'
  },
  // {
  //   key: 'displayname-card',
  //   title: 'account.display_name',
  //   link: 'editDisplayName',
  //   body: user.displayName
  // },
  {
    key: 'bookname-card',
    title: 'account.bookname',
    link: 'editBookName',
    body: bookName.value
  },
]);




onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {

    if (user) {
      userPhoto.value = user.photoURL;
    }
  });
});

function changePhoto() {
  const accountStore = useAccountStore();
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storagePath = `profilePhotos/${Date.now()}_${file.name}`;
    const fileRef = storageRef(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      await accountStore.updatePhotoUrl(downloadURL);

      userPhoto.value = downloadURL;
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  fileInput.click();
}
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