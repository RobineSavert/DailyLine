<template>
    <TitleComponent :title="'dashboard.title'"></TitleComponent>

    <Spinner v-if="!linesLoaded" />

    <template v-else>
      <NoLineForTodayYet v-if="noLineWrittenForToday" />
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
import {computed} from "vue";
import NoLineForTodayYet from "@/Views/Dashboard/NoLineForTodayYet.vue";
import {useAuthStore} from "@/stores/AuthStore";

const linesStore = useLinesStore();
const { linesLoaded, lines } = storeToRefs(linesStore);

const today = new Date().toISOString().split("T")[0];

const noLineWrittenForToday = computed(() => {
  return !lines.value.some(line => line.date.startsWith(today));
});

const {isLoggedIn} = storeToRefs(useAuthStore());

console.log(isLoggedIn.value)
</script>