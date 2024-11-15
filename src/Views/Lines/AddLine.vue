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
            :content="'buttons.add_new'" />
      </div>
    </template>
  </AddEditLine>
</template>

<script setup>
import {computed, ref} from 'vue';
import AddEditLine from '@/components/Lines/AddEditLine.vue';
import { useLinesStore } from '@/stores/LinesStore';
import { useCharactersLimit } from '@/composables/useCharactersLimit';
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import {useRoute, useRouter} from "vue-router";

const linesStore = useLinesStore();
const addEditLineRef = ref(null);
const newLine = ref('');
const router = useRouter();
const route = useRoute();

const addLine = () => {
  linesStore.addLine(newLine.value);
  newLine.value = '';
  addEditLineRef.value.focusTextArea();
  router.push({name: 'lines', params: {locale: route.params.locale} })
};

useCharactersLimit(newLine);

const latestLine = computed(() => linesStore.lines[0]?.date || null);
const isDisabled = computed(() => {
  if (!latestLine.value) return false;
  const lastTime = new Date(latestLine.value).getTime();
  const now = Date.now();
  return now - lastTime < 24 * 60 * 60 * 1000;
});

</script>