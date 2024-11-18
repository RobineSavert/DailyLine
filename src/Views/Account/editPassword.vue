<template>
  <TitleComponent :title="'account.edit_password_title'">
    <template v-slot:buttons>
      <div class="d-flex flex-nowrap justify-content-end">
        <RouterLink :to="{ name: 'account', params: {locale: route.params.locale} }">
          <i class="bi-x-lg me-2" style="font-size: 1.5rem;"></i>
        </RouterLink>
      </div>
    </template>
  </TitleComponent>

  <div class="row">
    <div class="col">
      <form @submit.prevent="onSubmit">
      <input type="email" hidden v-model="user.email" autocomplete="email" />
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingInputpassword" v-model="newPassword.password" autocomplete="new-password">
        <label for="floatingInputpassword">
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
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {useAccountStore} from "@/stores/AccountStore";
import {useAuthStore} from "@/stores/AuthStore";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue'
import Alert from "@/components/Alert.vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import TitleComponent from "@/components/TitleComponent.vue";

const { t } = useI18n()
const { user } = useAuthStore();
const accountStore = useAccountStore();
const route = useRoute()
const router = useRouter()

const newPassword = reactive({
  password: user.password
});

const onSubmit = () => {
    accountStore.updateUserPassword(newPassword.password);
  router.push({name: 'lines', params: {locale: route.params.locale} })
};
</script>