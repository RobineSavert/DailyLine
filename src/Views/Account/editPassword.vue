<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1>{{ $t('account.edit_password_title')}}</h1>
    <RouterLink :to="{ name: 'account', params: {locale: route.params.locale} }">
      <BootstrapIcon :icon="'x-lg'" />
    </RouterLink>
  </div>

  <form @submit.prevent="onSubmit">
    <div class="form-floating mb-3">
      <input type="password" class="form-control" id="floatingInput" v-model="newPassword.password">
      <label for="floatingInput">
        {{ t('account.password') }}
      </label>
    </div>

    <Alert :variant="'danger'" />

    <div class="my-3 row justify-content-center">
      <ButtonPrimary
          class="w-auto"
          :icon="'person-fill'"
          :content="'buttons.update_password'" />
    </div>
  </form>
</template>

<script setup>
import {reactive} from "vue";
import {useAccountStore} from "@/stores/AccountStore";
import {useAuthStore} from "@/stores/AuthStore";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue'
import Alert from "@/components/Alert.vue";
import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
const { t } = useI18n()
const { user } = useAuthStore();
const accountStore = useAccountStore();
const route = useRoute()

const newPassword = reactive({
  password: user.password
});




const onSubmit = () => {
    accountStore.updateUserPassword(newPassword.password);
};


</script>