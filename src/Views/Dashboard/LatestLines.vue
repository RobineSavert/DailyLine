<template>
  <h2>Latest 5 lines</h2>
  <ul class="list-group list-group-flush">
    <li v-for="line in computedObj" :key="line.id">
      {{ line.content }}
    </li>
  </ul>
  <RouterLink :to="{ name: 'lines', params: {locale: route.params.locale} }">
    See more
  </RouterLink>
</template>
<script setup>
import {useLinesStore} from "@/stores/LinesStore";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import {computed} from "vue";

const linesStore = useLinesStore();
const { lines } = storeToRefs(linesStore);
const limit = 5;

const route = useRoute()



const computedObj = computed(() => {
  return lines.value.slice(-limit);
});
</script>
