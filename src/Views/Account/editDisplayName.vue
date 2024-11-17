<template>

  <TitleComponent :title="'account.edit_display_name_title'">
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
          <input type="text" class="form-control" id="floatingInputdisplayName" v-model="newUser.displayName">
          <label for="floatingInputdisplayName">
            {{ t('account.display_name') }}
          </label>
        </div>

        <Alert :variant="'danger'" />

        <div class="my-3 row justify-content-center">
          <ButtonPrimary
              class="w-auto"
              :disabled="isDisabled"
              :icon="'person-fill'"
              :content="'buttons.update_display_name'" />
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
import TitleComponent from "@/components/TitleComponent.vue";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";

const route = useRoute()

const { user } = useAuthStore();
const accountStore = useAccountStore();
const { addMessage } = useMessageStore()
const { t } = useI18n()

const newUser = reactive({
  displayName: user.displayName
});

const isDisabled = computed(() => {
  return (
      newUser.displayName === user.displayName || !newUser.displayName
  );
});


const onSubmit = () => {
  if (!isDisabled.value) {
    accountStore.updateAccount(newUser);
  } else {
    addMessage(1,{ title: 'Please change something', type: 'danger' });
  }
};


</script>