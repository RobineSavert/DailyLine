<template>
  <Alert />

  <TitleComponent :title="'lines.title'">
    <template v-slot:buttons>
      <div class="d-flex flex-nowrap justify-content-end">
        <i class="bi-search me-2" @click="showSearch()"></i>
      </div>
    </template>
  </TitleComponent>

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
import { useRoute } from "vue-router";
import Alert from "@/components/Alert.vue";
import TitleComponent from "@/components/TitleComponent.vue";

  const linesStore = useLinesStore();
  const { lines, linesLoaded } = storeToRefs(linesStore);
  const newLine = ref('');
  const { t } = useI18n();
const route = useRoute()
let showSearchBar = ref(false)

  useCharactersLimit(newLine);



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
])

let searchInputFilter = ref("");
let appliedFilters = ref({});

function searchInput(filter){
  searchInputFilter.value = filter
}

function searchFilters(filtersForSearch){
  appliedFilters.value = filtersForSearch
}


function showSearch() {
  showSearchBar.value = !showSearchBar.value;
}

</script>