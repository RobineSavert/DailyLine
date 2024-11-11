<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>{{ $t('lines.edit_line_title')}}</h1>
    <RouterLink :to="{ name: 'lines', params: {locale: route.params.locale} }">
      <BootstrapIcon :icon="'x-lg'" />
    </RouterLink>
  </div>

  <AddEditLine
    v-model="lineContent"
    ref="addEditLineRef"
    bgColor="link"
    class="mt-4"
    label="Edit line"
    placeholder="Edit line"
    :is-edit="true"
  >
    <template #button>
      <div class="d-flex align-items-center justify-content-between mt-4">
        <Button :icon="'trash-fill'" :content="'buttons.delete'" @click="onShowDeleteModal" />
        <ButtonSave :content="'buttons.save_line'" :disabled="isDisabled" @click="onLineSave" />
      </div>
    </template>
  </AddEditLine>
</template>

<script setup>
  import AddEditLine from '@/components/Lines/AddEditLine.vue';
  import { useRoute, useRouter } from 'vue-router';
  import {computed, ref} from 'vue';
  import { useLinesStore } from '@/stores/LinesStore';
  import eventBus from "@/eventBus";
  import {useI18n} from "vue-i18n";
  import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";
  import Button from "@/components/Buttons/Button.vue";
  import ButtonSave from "@/components/Buttons/ButtonSave.vue";

  const route = useRoute();
  const router = useRouter();
  const { t } = useI18n()

  const linesStore = useLinesStore();

  const lineContent = ref('');

  lineContent.value = linesStore.getLineContentById(route.params.id);

  let newLine = ref(lineContent.value)

  const onLineSave = () => {
    linesStore.updateLine(route.params.id, lineContent.value);
    router.push({ name: 'lines' });
  };


  const emit = defineEmits(['delete-line'])

  function onShowDeleteModal() {
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
</script>
