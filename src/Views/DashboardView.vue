<template>
  <template v-if="showInBetweenScreen">
    <InBetweenScreen :duration="3000" @finished="handleFinished">
      <template v-slot:image>
        <img class="w-100 img-fluid" :src="img" />
      </template>
    </InBetweenScreen>
  </template>
  <template v-else>
    <TitleComponent :title="'dashboard.title'"></TitleComponent>

    <Spinner v-if="!linesLoaded" />

    <template v-else>
      <LatestLines v-if="lines" />
      <div class="row">
        <div class="col">
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
        </div>
      </div>
      <Quotes />
    </template>
  </template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLinesStore } from "@/stores/LinesStore";
import Spinner from "@/components/Spinner.vue";
import Quotes from "@/Views/Dashboard/Quotes.vue";
import LatestLines from "@/Views/Dashboard/LatestLines.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import InBetweenScreen from "@/Views/InBetweenScreen.vue";
import {computed, ref} from "vue";
import img from '@/assets/img/img.png';

const linesStore = useLinesStore();
const { linesLoaded, lines } = storeToRefs(linesStore);
const totalLines = computed(() => lines.value.length);
const decimal = computed(() => totalLines.value / 7);
let showInBetweenScreen = ref(true)

function handleFinished() {
  showInBetweenScreen.value = false;
}
</script>