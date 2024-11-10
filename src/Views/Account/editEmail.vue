<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1>{{ $t('account.edit_email_title')}}</h1>
    <RouterLink :to="{ name: 'account', params: {locale: route.params.locale} }">
      <BootstrapIcon :icon="'x-lg'" />
    </RouterLink>
  </div>



    <form @submit.prevent="onSubmit">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" v-model="newMail.email">
        <label for="floatingInput">
          {{ t('account.email') }}
        </label>
      </div>

      <Alert :variant="'danger'" />

      <div class="my-3 row justify-content-center">
        <ButtonPrimary
            class="w-auto"
            :disabled="isDisabled"
            :icon="'person-fill'"
            :content="'buttons.update_email'" />
      </div>
    </form>
</template>

<script setup>
import {computed, reactive} from "vue";
import {useAccountStore} from "@/stores/AccountStore";
import {useAuthStore} from "@/stores/AuthStore";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue'
import {useMessageStore} from "@/stores/store-messages";
import Alert from "@/components/Alert.vue";
import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
const route = useRoute()

const { user } = useAuthStore();
const accountStore = useAccountStore();
const { addMessage } = useMessageStore()
const { t } = useI18n()
const newMail = reactive({
  email: user.email
});

const isDisabled = computed(() => {
  return (
      newMail.email === user.email || !newMail.email
  );
});


const onSubmit = () => {
  if (!isDisabled.value) {
    accountStore.updateUserEmail(newMail.email);
  } else {
    addMessage({ title: 'Please change something' });
  }
};


</script>