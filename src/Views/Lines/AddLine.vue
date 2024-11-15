<template>
  <AddEditLine
      v-model="newLine"
      ref="addEditLineRef"
  >
    <template #button>
      <div class="d-flex justify-content-end">
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
import { ref } from 'vue';
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
</script>