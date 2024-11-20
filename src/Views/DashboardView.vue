<template>
    <TitleComponent :title="'dashboard.title'"></TitleComponent>

    <Spinner v-if="!linesLoaded" />

    <template v-else>
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

const linesStore = useLinesStore();
const { linesLoaded, lines } = storeToRefs(linesStore);
</script>