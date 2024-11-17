<template>
  <TitleComponent :title="'account.stats'">
    <template v-slot:buttons>
      <RouterLink :to="{ name: 'account', params: {locale: route.params.locale} }">
        <i class="bi-x-lg me-2" style="font-size: 1.5rem;"></i>
      </RouterLink>
    </template>
  </TitleComponent>

  <div class="row">
    <div class="col mt-3">
      <TableCard
          :items="statItems"
          :panel-i-d="'lineTable'"
          :table-name="'lines.title'"
          :can-search="false"
      >
        <template v-slot:searchTableComponent>
          <TableSearchFilterComponent
              :items="statItems"
              :can-filter="false"
          />

        </template>
        <template v-slot:mainTable>
          <TableComponent
              :items="statItems"
              :fields="fields"
              :key="statItems"
              :pagination-name="'table.paginationName'"
              :searchByKeys="['stat', 'value']"
              :sort-by="'stat'"
              :empty-table-name="'table.no_data'"
          >
            <template v-slot:translation="row">
              {{ $t(row.value) }}
            </template>

            <template v-slot:value="row">
              {{ row.value }}
            </template>
          </TableComponent>
        </template>
      </TableCard>
    </div>
  </div>
</template>

<script setup>
  import { useLinesStore } from '@/stores/LinesStore';
  import {computed, ref} from 'vue';
  import {useRoute} from "vue-router";
  import TableComponent from "@/components/Table/TableComponent.vue";
  import TableSearchFilterComponent from "@/components/Table/TableSearchFilterComponent.vue";
  import TableCard from "@/components/Table/TableCard.vue";
  import TitleComponent from "@/components/TitleComponent.vue";
  import {useI18n} from "vue-i18n";

  const route = useRoute()
  const linesStore = useLinesStore();
  const feedback = ref('');
  const { t } = useI18n();
  const linesCount = linesStore.totalLinesCount;
  const totalCharactersCount = linesStore.totalCharactersCount;

  const statItems = computed(() => [
    { translation: 'stats.total_lines', value: linesCount },
    { translation: 'stats.total_chars', value: totalCharactersCount },
  ]);

  const fields = computed(() => [
    {
      key: "translation",
      label: t("stats.stat"),
      sortable: true
    },
    {
      key: "value",
      label: t("stats.value"),
      sortable: true
    },
  ])
</script>
