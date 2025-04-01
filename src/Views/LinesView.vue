<template>
    <Spinner v-if="!linesLoaded" />

    <template v-else>
      <Alert />

      <TitleComponent :translation="false" :title="`${$t('lines.title')} ${$t('lines.in')} ${bookName}`">
        <template v-slot:buttons>
          <div class="d-flex flex-nowrap justify-content-end">
            <i class="bi-search me-2" @click="showSearch()"></i>
            <i class="bi-stars me-2" @click="fillMissingDays" v-if="autoFillMissingDays"></i>
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
              <RouterLink class="text-decoration-none" :to="{ name: 'editLine', params: { id: row.item.id, locale: route.params.locale } }">
                <DateComponent :value="row.value" />
              </RouterLink>
            </template>

            <template v-slot:content="row">
              <RouterLink class="text-decoration-none" :to="{ name: 'editLine', params: { id: row.item.id, locale: route.params.locale } }">
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
import {useMessageStore} from "@/stores/MessagesStore";


const linesStore = useLinesStore();
const { lines, linesLoaded } = storeToRefs(linesStore);
const settingsStore = useSettingsStore();
const { autoFillMissingDays } = storeToRefs(useSettingsStore())
const {addMessage} = useMessageStore()

onMounted(async () => {
  while (!linesLoaded.value) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Wacht 100ms
  }

  await settingsStore.fetchAutoFillLines();

});


async function fillMissingDays() {
  try {
    await checkAndAddMissingDays();

  } catch (error) {

  }
}


async function checkAndAddMissingDays() {
  if (!lines.value || lines.value.length === 0) return;

  // Haal alle bestaande datums op uit de lines
  const existingDates = new Set(
      linesStore.lines.map(line =>
          new Date(line.date).toISOString().split('T')[0] // Alleen YYYY-MM-DD
      )
  );

  // Eerste datum in de lijst (meest historische datum)
  const firstLineDate = new Date(linesStore.lines[linesStore.lines.length - 1].date);
  firstLineDate.setUTCHours(0, 0, 0, 0); // Zet naar UTC middernacht

  // Bepaal gisteren als UTC-datum
  const yesterday = new Date(Date.now());
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  yesterday.setUTCHours(0, 0, 0, 0);

  // Loop door de datums vanaf de eerste tot en met gisteren
  let currentDate = new Date(firstLineDate);
  while (currentDate <= yesterday) {
    const isoDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD

    // Controleer of de datum al bestaat
    if (!existingDates.has(isoDate)) {
      try {
        await linesStore.addLine('-', `${isoDate}T00:00:00Z`); // Voeg de dag toe
        existingDates.add(isoDate); // Voeg toe aan de set om dubbel werk te voorkomen

      } catch (error) {
        addMessage(1, { title: 'lines.added_day_error: ' + isoDate + error })
      }
    }

    // Ga een dag verder
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
