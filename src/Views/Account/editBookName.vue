<template>

  <TitleComponent :title="'account.edit_bookname_title'">
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
          <input type="text" class="form-control" id="floatingInputbookname" v-model="newBookName">
          <label for="floatingInputdisplayName">
            {{ t('account.bookname') }}
          </label>
        </div>

        <Alert :variant="'danger'" />

        <div class="my-3 row justify-content-center">
          <ButtonPrimary
              class="w-auto"
              :disabled="isDisabled"
              :icon="'person-fill'"
              :content="'buttons.update_bookname'" />
        </div>
      </form>
    </div>
  </div>


</template>

<script setup>
import {computed, reactive, ref} from "vue";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue'
import {useMessageStore} from "@/stores/MessagesStore";
import Alert from "@/components/Alert.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import { useBookStore } from '@/stores/BookStore';
import {storeToRefs} from "pinia";

const { bookName } = storeToRefs(useBookStore())
const route = useRoute()
const router = useRouter()

const bookStore = useBookStore();
const {addMessage} = useMessageStore()
const {t} = useI18n()
const newBookName = ref(bookName.value);

const isDisabled = computed(() => {
  return (
      newBookName.value === bookName.value || !newBookName.value.trim() // Controleer ook op lege strings
  );
});

const onSubmit = () => {
  if (!isDisabled.value) {
    bookStore.updateBookName(newBookName.value)
        .then(() => {
          addMessage(0, { title: 'account.update_book_name_succes' });
          router.push({name: 'account', params: {locale: route.params.locale} })
        })
        .catch(() => {
          addMessage(1, { title: 'account.update_book_name_failed', type: 'danger' });
        });
  } else {
    addMessage(1, { title: 'please_enter_something', type: 'danger' });
  }
};

</script>