<template>
  <TitleComponent :title="'lines.edit_line_title'">
    <template v-slot:buttons>
      <div class="d-flex flex-nowrap justify-content-end">
        <RouterLink :to="{ name: 'lines', params: {locale: route.params.locale} }">
          <i class="bi-x-lg me-2" style="font-size: 1.5rem;"></i>
        </RouterLink>
      </div>
    </template>
  </TitleComponent>

  <AddEditLine
    v-model="lineContent"
    ref="addEditLineRef"
    :placeholderTextarea="'lines.placeholder'"
    :is-edit="true"
    :line-i-d="currentLine"
  >
    <template #button>
      <div class="d-flex align-items-center mt-4 justify-content-between">
        <Button :icon="'trash-fill'" :content="'buttons.delete'" @click="onShowDeleteModal" />
        <ButtonSave :content="'buttons.save_line'" :disabled="isDisabled" @click="onLineSave" />
      </div>
    </template>
  </AddEditLine>
  <Modal v-if="eventBus.state.showModal">
    <template #title>{{ eventBus.state.modalTitle }}</template>
    <template #body>
      <component :is="eventBus.state.modalBody" />
    </template>
    <template #button>
      <component :is="eventBus.state.modalButton" />
    </template>
  </Modal>
</template>

<script setup>
import AddEditLine from '@/components/Lines/AddEditLine.vue';
import { useRoute, useRouter } from 'vue-router';
import {computed, ref} from 'vue';
import { useLinesStore } from '@/stores/LinesStore';
import eventBus from "@/eventBus";
import {useI18n} from "vue-i18n";
import Button from "@/components/Buttons/Button.vue";
import ButtonSave from "@/components/Buttons/ButtonSave.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import Modal from "@/components/Modal.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n()
const linesStore = useLinesStore();
const lineContent = ref('');
let currentLine = ref(route.params.id)
console.log(route.params);
lineContent.value = linesStore.getLineContentById(route.params.id);

let newLine = ref(lineContent.value)

const onLineSave = () => {
  linesStore.updateLine(route.params.id, lineContent.value);
  router.push({name: 'lines', params: {locale: route.params.locale} })
};


const emit = defineEmits(['delete-line'])

function onShowDeleteModal() {
  console.log(eventBus);
  console.log("hier?")
  const title = t("lines.delete_modal.title");
  const body = t("lines.delete_modal.body");
  const buttonText = t("buttons.delete");
  eventBus.showModal(title, body, null, buttonText, '', false, true, true, 'card-list', deleteLine);
}

const deleteLine = (e) => {
  linesStore.deleteLine(route.params.id).then(() => {
    eventBus.hideModal();
    emit('delete-line', {e});
    router.push({name: 'lines', params: {locale: route.params.locale} })
  });
};

const isDisabled = computed(() => {
  return (
      lineContent.value === newLine.value || lineContent.value === ''
  );
});


// onMounted(async () => {
//   await settingsStore.fetchAutoFillLines();
//
//   isAutoFillDaysDisabled.value = !autoFillMissingDays.value;
// });
</script>
