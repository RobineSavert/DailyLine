<template>

  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ line.content }}
        <div class="columns has-text-grey-light mt-3">
          <small class="column">{{ formattedDate }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="{ name: 'editLine', params: { id: line.id } }" class="card-footer-item"
        >Edit</RouterLink
      >
      <a href="#" class="card-footer-item" @click.prevent="openModal">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { useDateFormat } from '@vueuse/core';
import { computed, reactive } from 'vue';
import { useLinesStore } from '@/stores/LinesStore';
import eventBus from "@/eventBus";
import { useI18n } from 'vue-i18n';

const props = defineProps({
  line: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete-line']); // Define the event to emit on delete
const { t } = useI18n();
const linesStore = useLinesStore();

const formattedDate = computed(() => {
  const date = new Date(+props.line.date);
  return useDateFormat(date, 'MM-DD-YYYY @ HH:mm').value;
});

const characterLength = computed(() => {
  const lineLength = props.line.content.length;
  const description = lineLength > 1 ? 'characters' : 'character';
  return `${props.line.content.length} ${description}`;
});


function openModal() {
  const title = t("dashboard.versionInfomodal.versionInfomodalTitle");
  const body = t("dashboard.versionInfomodal.versionInfomodalBody");
  const buttonText = t("dashboard.versionInfomodal.versionInfomodalButtonText");
  eventBus.showModal(title, body, null, buttonText, '', false, true, true, 'card-list', deleteLine);
}

const deleteLine = (e) => {
  linesStore.deleteLine(props.line.id).then(() => {
    eventBus.hideModal();
    emit('delete-line', {e});
  });
};



</script>
