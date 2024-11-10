<template>
  <h1>{{ $t('lines.edit_line_title')}}</h1>
  <AddEditLine
    v-model="lineContent"
    ref="addEditLineRef"
    bgColor="link"
    class="mt-4"
    label="Edit line"
    placeholder="Edit line"
  >
    <template #button>
      <div class="d-flex align-items-center justify-content-between mt-4">
        <ButtonCancel :content="'buttons.cancel'" @click="$router.back()" />
        <ButtonPrimary :content="'buttons.save_line'" :disabled="!lineContent" @click="onLineSave" />
      </div>
    </template>
  </AddEditLine>
</template>

<script setup>
  import AddEditLine from '@/components/Lines/AddEditLine.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useLinesStore } from '@/stores/LinesStore';
  import ButtonCancel from "@/components/Buttons/ButtonCancel.vue";
  import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";

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
