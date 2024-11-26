<template>
    <Spinner v-if="!linesLoaded" />

    <template v-else>
      <Alert />

      <TitleComponent :translation="false" :title="`${$t('lines.title')} ${$t('lines.in')} ${bookName}`">
        <template v-slot:buttons>
          <div class="d-flex flex-nowrap justify-content-end">
            <i class="bi-search me-2" @click="showSearch()"></i>
          </div>
        </template>
      </TitleComponent>

      <TableCard
          :items="lines"
          :panel-i-d="'lineTable'"
          :table-name="'lines.title'"
      >
        <template v-slot:searchTableComponent>
          <TableSearchFilterComponent
              v-if="showSearchBar"
              :items="lines"
              :search-placeholder="'table.placeholder'"
              @SearchInput="searchInput"
              @SearchFilters="searchFilters"
          />
        </template>
        <template v-slot:mainTable>
          <TableComponent
              :items="lines"
              :fields="fields"
              :key="lines"
              :pagination-name="'table.paginationName'"
              :searchByKeys="['date', 'content']"
              :sort-by="'date'"
              :empty-table-name="'table.no_data'"
              :filter="searchInputFilter"
              :appliedFilters="appliedFilters"
          >
            <template v-slot:date="row">
              <RouterLink :to="{ name: 'editLine', params: { id: row.item.id, locale: route.params.locale } }">
                <DateComponent :value="row.value" />
              </RouterLink>
            </template>

            <template v-slot:content="row">
              <RouterLink :to="{ name: 'editLine', params: { id: row.item.id, locale: route.params.locale } }">
                {{ row.value }}
              </RouterLink>
            </template>
          </TableComponent>
        </template>
      </TableCard>
    </template>
  </template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLinesStore } from '@/stores/LinesStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from 'pinia';
import Spinner from "@/components/Spinner.vue";
import TableComponent from "@/components/Table/TableComponent.vue";
import TableCard from "@/components/Table/TableCard.vue";
import DateComponent from "@/components/Table/DateComponent.vue";
import { useI18n } from "vue-i18n";
import TableSearchFilterComponent from "@/components/Table/TableSearchFilterComponent.vue";
import { useRoute } from "vue-router";
import Alert from "@/components/Alert.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import { useBookStore } from "@/stores/BookStore";


const linesStore = useLinesStore();
const { lines, linesLoaded, addLine } = storeToRefs(linesStore);
const settingsStore = useSettingsStore();
const { autoFillMissingDays } = storeToRefs(useSettingsStore())


onMounted(async () => {
  while (!linesLoaded.value) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Wacht 100ms
  }

  await settingsStore.fetchAutoFillLines();

  if (autoFillMissingDays.value) {
    await checkAndAddMissingDays();
  }
});



async function checkAndAddMissingDays() {
  if (!lines.value || lines.value.length === 0) {
    return;
  }

  const existingDates = new Set(linesStore.lines.map(line =>
      new Date(line.date).toISOString().split('T')[0]
  ));

  const firstLineDate = new Date(linesStore.lines[linesStore.lines.length - 1].date);
  firstLineDate.setUTCHours(0, 0, 0, 0);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let currentDate = new Date(firstLineDate);
  while (currentDate <= today) {
    const isoDate = currentDate.toISOString().split('T')[0]; // Alleen de datum zonder tijd

    if (!existingDates.has(isoDate)) {
      try {
        await linesStore.addLine('-', `${isoDate}T00:00:00Z`); // Voeg gemiste dag toe in UTC
        existingDates.add(isoDate);
      } catch (error) {
        console.error("Fout bij het toevoegen van dag:", isoDate, error);
      }
    } else {
      console.log("Dag bestaat al, overslaan:", isoDate);
    }

    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
}






const { bookName } = storeToRefs(useBookStore());
const { t } = useI18n();
const route = useRoute();
let showSearchBar = ref(false);

const fields = computed(() => [
  {
    key: "date",
    label: t("table.columnHeaders.date"),
    sortable: true,
    sortType: 'datetime',
  },
  {
    key: "content",
    label: t("table.columnHeaders.content")
  },
]);

let searchInputFilter = ref("");
let appliedFilters = ref({});

function searchInput(filter) {
  searchInputFilter.value = filter;
}

function searchFilters(filtersForSearch) {
  appliedFilters.value = filtersForSearch;
}

function showSearch() {
  showSearchBar.value = !showSearchBar.value;
}

</script>
