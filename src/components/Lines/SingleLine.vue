<template>
  <Card :panel-collapsable="false" :variant="'none'" :card-footer="true">
    <template v-slot:title>
      <div class="d-flex justify-content-between">
        <small>{{ formattedDate }}</small>
        <small>{{ characterLength }}</small>
      </div>
    </template>
    <template v-slot:body>
      {{ line.content }}
    </template>
    <template v-slot:footer>
      <div class="d-flex justify-content-between">
      <RouterLink :to="{ name: 'editLine', params: { id: line.id } }" class="text-sm">
        {{ $t('lines.edit') }}
      </RouterLink>
      <a href="#" class="text-sm" @click.prevent="openModal">
        {{ $t('lines.delete') }}
      </a>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { useDateFormat } from '@vueuse/core';
import { computed, reactive } from 'vue';
import { useLinesStore } from '@/stores/LinesStore';
import eventBus from "@/eventBus";
import { useI18n } from 'vue-i18n';
import Card from "@/components/Card.vue";
import Tabs from "@/components/Tabs.vue";

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
  const description = lineLength > 1 ? 'chars' : 'char';
  return `${props.line.content.length} ${description}`;
});


function openModal() {
  const title = t("lines.delete_modal.title");
  const body = t("lines.delete_modal.body");
  const buttonText = t("buttons.delete");
  eventBus.showModal(title, body, null, buttonText, '', false, true, true, 'card-list', deleteLine);
}

const deleteLine = (e) => {
  linesStore.deleteLine(props.line.id).then(() => {
    eventBus.hideModal();
    emit('delete-line', {e});
  });
};



</script>
