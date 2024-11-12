<template>
  <Alert />

  <div class="d-flex justify-content-between align-items-center">
    <h1>{{ $t('lines.title') }}</h1>
    <BootstrapIcon :icon="'search'" @click="showSearch()" size="2x" class="me-2" />
  </div>

  <Spinner v-if="!linesLoaded" />

  <template v-else>
    <TableCard
        :items="filteredLines"
        :panel-i-d="'lineTable'"
        :table-name="'lines.title'"
    >
      <template v-slot:searchTableComponent>
          <TableSearchFilterComponent
              v-if="showSearchBar"
              :items="filteredLines"
              :can-filter="false"
              :search-placeholder="'table.placeholder'"
              @SearchInput="searchInput"
              @SearchFilters="searchFilters"
          />
      </template>
      <template v-slot:mainTable>
        <TableComponent
            :items="filteredLines"
            :fields="fields"
            :key="filteredLines"
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

const filteredLines = computed(() => {
  if (!selectedDate.value) return lines.value.map(line => ({
    ...line,
    date: new Date(parseInt(line.date)).toISOString()
  }));

  return lines.value.filter((line) => {
    const lineDate = new Date(parseInt(line.date)).toDateString();
    const selectedDateString = new Date(parseInt(selectedDate.value)).toDateString();
    return lineDate === selectedDateString;
  }).map(line => ({
    ...line,
    date: new Date(parseInt(line.date)).toISOString()
  }));
});

  function checkLinesAndUpdate(){
    linesStore.getLines();
    const storedLines = lines.value;

    if (storedLines.length === 0) {
      resetTimer();
    } else {
      const savedTimestamp = localStorage.getItem('textareaTimestamp');
      if (savedTimestamp) {
        const expiryTime = parseInt(savedTimestamp) + 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (now < expiryTime) {
          isDisabled.value = true;
          calculateCountdown(expiryTime); // Continue the countdown if within 24 hours
        }
      }
    }
  }

  const calculateCountdown = (expiryTime) => {
    const now = new Date().getTime();
    const remaining = expiryTime - now;

    if (remaining > 0) {
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      countdown.value = `${hours}u ${minutes}m ${seconds}s`;
    } else {
      resetTimer();
    }
  };

  const resetTimer = () => {
    isDisabled.value = false;
    countdown.value = '';
    localStorage.removeItem('textareaTimestamp');
  };

  onMounted(() => {
    const savedTimestamp = localStorage.getItem('textareaTimestamp');
    const storedLines = lines.value; // Dynamically get lines from store

    if (!storedLines.length) {
      resetTimer(); // Enable the field if there are no lines
      return;
    }

    if (savedTimestamp) {
      const expiryTime = parseInt(savedTimestamp) + 24 * 60 * 60 * 1000;
      const now = new Date().getTime();
      if (now < expiryTime) {
        isDisabled.value = true;
        calculateCountdown(expiryTime);
      }
    }
  });

const handleDateUpdate = (timestamp) => {
  selectedDate.value = timestamp;
  lineContent.value = linesStore.getLineByDate(timestamp);
};

const fields = computed(() => [
  {
    key: "date",
    label: t("table.columnHeaders.date"),
    sortable: true
  },
  {
    key: "content",
    label: t("table.columnHeaders.content"),
    sortable: true
  },
  {
    key: "button",
    label: ""
  }
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