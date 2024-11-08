<template>
  <div class="mt-3">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Total lines Count</td>
          <td>{{ linesCount }}</td>
        </tr>
        <tr>
          <td>Total Characters Count</td>
          <td>{{ totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
  import { useLinesStore } from '../stores/LinesStore';
  import { useCharactersLimit } from '../composables/useCharactersLimit';
  import { ref } from 'vue';

  const linesStore = useLinesStore();
  const feedback = ref('');

  const linesCount = linesStore.totalLinesCount;
  const totalCharactersCount = linesStore.totalCharactersCount;

  useCharactersLimit(feedback, 50);
</script>
