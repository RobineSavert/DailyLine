<template>
  <AddEditLine
      v-model="newLine"
      ref="addEditLineRef"
      :is-disabled="isDisabled"
  >
    <template #button>
      <div class="d-flex justify-content-center">
        <ButtonPrimary
            icon="send-fill"
            :disabled="!newLine"
            @click="addLine"
            class="my-4"
            :content="'buttons.add_new'"
        />
      </div>
    </template>
  </AddEditLine>
</template>

<script setup>
import { computed, ref } from 'vue';
import AddEditLine from '@/components/Lines/AddEditLine.vue';
import { useLinesStore } from '@/stores/LinesStore';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.vue';
import { useRoute, useRouter } from 'vue-router';

const linesStore = useLinesStore();
const addEditLineRef = ref(null);
const newLine = ref('');
const router = useRouter();
const route = useRoute();


const todayUTC = new Date().toISOString().split('T')[0];
const latestLine = computed(() => linesStore.lines[0]?.date || null);

const isDisabled = computed(() => {
  if (!latestLine.value) return false;
  const lastEntryDate = new Date(latestLine.value).toISOString().split('T')[0];
  return lastEntryDate === todayUTC;
});

const addLine = () => {
  linesStore.addLine(newLine.value);
  newLine.value = '';
  addEditLineRef.value.focusTextArea();
  router.push({ name: 'lines', params: { locale: route.params.locale } });
};
</script>
