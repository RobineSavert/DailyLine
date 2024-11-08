<template>
  <AddEditLine
    v-model="lineContent"
    ref="addEditLineRef"
    bgColor="link"
    label="Edit line"
    placeholder="Edit line"
  >
    <template #button>
      <button class="button" @click.prevent="$router.back()">Cancel</button>
      <!-- <RouterLink class="button" :to="{ name: 'notes' }">Cancel</RouterLink> -->

      <button :disabled="!lineContent" class="button is-link" @click.prevent="onLineSave">Save line</button>
    </template>
  </AddEditLine>
</template>

<script setup>
  import AddEditLine from '../components/Lines/AddEditLine.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useLinesStore } from '@/stores/LinesStore';

  const route = useRoute();
  const router = useRouter();

  const linesStore = useLinesStore();

  const lineContent = ref('');

  lineContent.value = linesStore.getLineContentById(route.params.id);

  const onLineSave = () => {
    linesStore.updateLine(route.params.id, lineContent.value);
    router.push({ name: 'lines' });
  };
</script>
