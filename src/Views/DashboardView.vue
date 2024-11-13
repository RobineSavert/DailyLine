<template>
  <h1>Dashboard</h1>

  <Spinner v-if="!linesLoaded" />

  <template v-else>
    <LatestLines v-if="lines" />
    <hr/>
    <DashboardStats />
    <hr/>
    <Quotes />
  </template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLinesStore } from "@/stores/LinesStore";
import Spinner from "@/components/Spinner.vue";
import Quotes from "@/Views/Dashboard/Quotes.vue";
import LatestLines from "@/Views/Dashboard/LatestLines.vue";
import DashboardStats from "@/Views/Dashboard/DashboardStats.vue";
const linesStore = useLinesStore();
const { linesLoaded, lines } = storeToRefs(linesStore);
</script>

