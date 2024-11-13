<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1>{{ $t('account.edit_display_name_title')}}</h1>
    <RouterLink :to="{ name: 'account', params: {locale: route.params.locale} }">
      <BootstrapIcon :icon="'x-lg'" />
    </RouterLink>
  </div>

  <form @submit.prevent="onSubmit">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" v-model="newUser.displayName">
        <label for="floatingInput">
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
</template>

<script setup>
import {computed, reactive} from "vue";
import {useAccountStore} from "@/stores/AccountStore";
import {useAuthStore} from "@/stores/AuthStore";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue'
import {useMessageStore} from "@/stores/MessagesStore";
import Alert from "@/components/Alert.vue";
import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";
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
    addMessage({ title: 'Please change something' });
  }
};


</script>