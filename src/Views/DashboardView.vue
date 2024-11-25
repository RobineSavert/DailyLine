<template>
    <TitleComponent :title="'dashboard.title'"></TitleComponent>

    <Spinner v-if="!linesLoaded" />

    <template v-else>
      <div v-if="noLineWrittenForToday">
        You haven't written a line yet for today. <RouterLink :to="{ name: 'add-line', params: {locale: route.params.locale} }">
        {{ $t('lines.recent_lines.button') }}
      </RouterLink>
      </div>
      <LatestLines v-if="lines" />
      <Stats v-if="lines" />
      <Quotes />
    </template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLinesStore } from "@/stores/LinesStore";
import Spinner from "@/components/Spinner.vue";
import Quotes from "@/Views/Dashboard/Quotes.vue";
import LatestLines from "@/Views/Dashboard/LatestLines.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import Stats from "@/Views/Dashboard/Stats.vue";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

const linesStore = useLinesStore();
const { linesLoaded, lines } = storeToRefs(linesStore);
const route = useRoute()
const today = new Date().toISOString().split("T")[0];

const noLineWrittenForToday = computed(() => {
  return !lines.value.some(line => line.date.startsWith(today));
});
</script>