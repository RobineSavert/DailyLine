<template>
  <AddEditLine v-model="newLine" ref="addEditLineRef">
    <template #button>
      <button :disabled="!newLine" class="button is-link is-danger" @click.prevent="addLine">
        Add New Line
      </button>
    </template>
  </AddEditLine>

  <progress class="progress is-large is-info" max="100" v-if="!linesStore.linesLoaded" />

  <template v-else>
    <SingleLine v-for="line in lines" :key="line.id" :line="line" />
  </template>

  <div
    class="has-text-centered py-6 is-size-4 has-text-grey-light is-family-monospace"
    v-if="!lines.length && linesStore.linesLoaded"
  >
    No Lines Added here yet!!

  </div>

</template>

<script setup>
  import SingleLine from '../components/Lines/SingleLine.vue';
  import AddEditLine from '../components/Lines/AddEditLine.vue';
  import { onMounted, ref } from 'vue';
  import { useLinesStore } from '@/stores/LinesStore';
  import { storeToRefs } from 'pinia';
  import { useCharactersLimit } from '@/composables/useCharactersLimit';

  const linesStore = useLinesStore();
  const addEditLineRef = ref(null);
  const { lines } = storeToRefs(linesStore);
  const newLine = ref('');

  const addLine = () => {
    linesStore.addLine(newLine.value);
    newLine.value = '';
    addEditLineRef.value.focusTextArea();
  };

  useCharactersLimit(newLine);
</script>
