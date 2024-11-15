<template>
  <TitleComponent :title="'dashboard.title'"></TitleComponent>

  <Spinner v-if="!linesLoaded" />

  <template v-else>
    <LatestLines v-if="lines" />
    <hr v-if="lines" />
    <div class="my-4 fst-italic text-center" v-if="lines">
      <span v-if="totalLines === 0">You haven't wrote any lines yet.. </span>
      <template v-else>
        <span>You have so far written {{ totalLines }} beautiful lines..</span>
        <span v-if="totalLines >= 10"> that's an average of {{ decimal.toFixed(2) }} per week..</span>
        <span> keep it up & soon you will have a beautiful collection of your own thoughts in writing...</span>
      </template>
    </div>
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
import TitleComponent from "@/components/TitleComponent.vue";
import {computed} from "vue";

const linesStore = useLinesStore();
const { linesLoaded, lines } = storeToRefs(linesStore);
const totalLines = computed(() => lines.value.length);
const decimal = computed(() => totalLines.value / 7);

</script>

