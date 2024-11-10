<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1>{{ $t('account.stats')}}</h1>
    <RouterLink :to="{ name: 'account', params: {locale: route.params.locale} }">
      <BootstrapIcon :icon="'x-lg'" />
    </RouterLink>
  </div>
  <div class="mt-3">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>{{ $t('stats.stat') }}</th>
          <th>{{ $t('stats.value') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ $t('stats.total_lines') }}</td>
          <td>{{ linesCount }}</td>
        </tr>
        <tr>
          <td>{{ $t('stats.total_chars') }}</td>
          <td>{{ totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
  import { useLinesStore } from '@/stores/LinesStore';
  import { useCharactersLimit } from '@/composables/useCharactersLimit';
  import { ref } from 'vue';
  import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";
  import {useRoute} from "vue-router";
  const route = useRoute()
  const linesStore = useLinesStore();
  const feedback = ref('');

  const linesCount = linesStore.totalLinesCount;
  const totalCharactersCount = linesStore.totalCharactersCount;

  useCharactersLimit(feedback, 50);
</script>
