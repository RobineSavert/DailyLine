<template>
  <Alert />

  <div class="d-flex justify-content-between align-items-center">
    <h1>{{ $t('lines.title') }}</h1>
    <BootstrapIcon :icon="'search'" @click="showSearch()" size="2x" class="me-2" />
  </div>

  <Spinner v-if="!linesLoaded" />

  <template v-else>
    <TableCard
        :items="lines"
        :panel-i-d="'lineTable'"
        :table-name="'lines.title'"
    >
      <template v-slot:searchTableComponent>
          <TableSearchFilterComponent
              v-if="showSearchBar"
              :items="lines"
              :can-filter="false"
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
            :searchByKeys="['date']"
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
import {ref, onMounted, computed} from 'vue';
import { useLinesStore } from '@/stores/LinesStore';
import { storeToRefs } from 'pinia';
import { useCharactersLimit } from '@/composables/useCharactersLimit';
import Spinner from "@/components/Spinner.vue";
import TableComponent from "@/components/Table/TableComponent.vue";
import TableCard from "@/components/Table/TableCard.vue";
import DateComponent from "@/components/Table/DateComponent.vue";
import { useI18n } from "vue-i18n";
import TableSearchFilterComponent from "@/components/Table/TableSearchFilterComponent.vue";
import eventBus from "@/eventBus";
import { useRoute } from "vue-router";
import Alert from "@/components/Alert.vue";
import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";

  const linesStore = useLinesStore();
  const { lines, linesLoaded } = storeToRefs(linesStore);
  const newLine = ref('');
  const isDisabled = ref(false);
  const countdown = ref('');
  const selectedDate = ref('')
  const lineContent = ref('');
  const { t } = useI18n();
const route = useRoute()
let showSearchBar = ref(false)

  useCharactersLimit(newLine);



const fields = computed(() => [
  {
    key: "date",
    label: t("table.columnHeaders.date"),
    sortable: true
  },
  {
    key: "content",
    label: t("table.columnHeaders.content")
  },
])

let searchInputFilter = ref("");
let appliedFilters = ref({});

function searchInput(filter){
  searchInputFilter.value = filter
}

function searchFilters(filtersForSearch){
  appliedFilters.value = filtersForSearch
}

const emit = defineEmits(['delete-line'])

function showSearch() {
  showSearchBar.value = !showSearchBar.value; // Verander dit naar =
}

</script>