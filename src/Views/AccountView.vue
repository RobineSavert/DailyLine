<template>
  <h1>{{ $t('account.title')}}</h1>

  <template v-if="!showEditForm">
    <ul class="list-group my-4">
      <li class="list-group-item">Display name: {{ user.displayName}}</li>
      <li class="list-group-item">Photo: {{ user.photoURL}}</li>
    </ul>

    <Button class="w-auto"
            :icon="'vector-pen'"
            @click="showEdit"
            :content="'buttons.edit_account'" />
  </template>



  <form @submit.prevent="onSubmit" v-if="showEditForm">
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="floatingInput" placeholder="een naam" v-model="newUser.displayName">
      <label for="floatingInput">
        display name
      </label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" placeholder="een url" v-model="newUser.photoURL">
      <label for="floatingPassword">
        photo
      </label>
    </div>

    <Alert :variant="'danger'" />

    <div class="my-3 row justify-content-center">
      <Button class="w-auto"
              :icon="'person-fill'"
              :content="'buttons.account_update'" />
    </div>
  </form>

<div class="d-flex justify-content-center my-4">

  <a @click="onLogout" class="text-danger">{{ $t('account.logout')}}</a>
</div>


</template>
<script setup>
import {useAuthStore} from "@/stores/AuthStore";
import {useAccountStore} from "@/stores/AccountStore";
import Alert from "@/components/Alert.vue";
import Button from "@/components/Buttons/Button.vue";
import {reactive, ref} from "vue";


const authStore = useAuthStore();
const accountStore = useAccountStore();
const { user } = useAuthStore();

let showEditForm = ref(false)
const onLogout = () => {
  authStore.logoutUser();
};

const newUser = reactive({
  displayName: '',
  photoURL: ''
});

function showEdit(){
  showEditForm.value = true
}


const onSubmit = () => {
  if (!newUser.displayName || !newUser.photoURL) {
    alert('Please change something');
    return;
  }

  accountStore.updateAccount(newUser);
  showEditForm.value = false;

};
</script>
