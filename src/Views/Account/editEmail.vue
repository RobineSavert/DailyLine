<template>
  <TitleComponent :title="'account.edit_email_title'">
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
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInputemail" v-model="newMail.email">
        <label for="floatingInputemail">
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
    </div>
  </div>

</template>

<script setup>
import {computed, reactive} from "vue";
import {useAccountStore} from "@/stores/AccountStore";
import {useAuthStore} from "@/stores/AuthStore";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue'
import {useMessageStore} from "@/stores/MessagesStore";
import Alert from "@/components/Alert.vue";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import TitleComponent from "@/components/TitleComponent.vue";

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
    addMessage(1,{ title: 'Please change something', type: 'danger' });
  }
};


</script>