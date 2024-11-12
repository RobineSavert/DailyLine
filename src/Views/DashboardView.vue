<template>
  <h1>Dashboard</h1>

  <Spinner v-if="!linesLoaded" />

  <template v-else>
    <h3>Latest 5 lines</h3>
    <ul class="list-group list-group-flush">
      <li v-for="line in computedObj" :key="line.id">
        {{ line.content }}
      </li>
    </ul>
    <RouterLink :to="{ name: 'lines', params: {locale: route.params.locale} }">
      See more
    </RouterLink>

    <hr/>

    <template v-if="quotes.length">
      <div class="quote-fade">
        <figure class="text-center" :key="currentQuote.key">
          <blockquote class="blockquote">
            <p>{{ currentQuote.quote }}</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            {{ currentQuote.author }} in <cite title="Source Title">{{ currentQuote.media }}</cite>
          </figcaption>
        </figure>
      </div>
    </template>
  </template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLinesStore } from "@/stores/LinesStore";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {BootstrapIcon} from "@dvuckovic/vue3-bootstrap-icons";
import Spinner from "@/components/Spinner.vue";
import {useRoute} from "vue-router";

const linesStore = useLinesStore();
const { lines, linesLoaded } = storeToRefs(linesStore);
const limit = 5;
const route = useRoute()

const quotes = ref([
  { key: "1", author: "Author 1", quote: "A well-known quote, contained in a blockquote element.", media: "a book" },
  { key: "2", author: "Author 2", quote: "Another inspiring quote, wrapped in a blockquote element.", media: "a movie" },
  { key: "3", author: "Author 3", quote: "Another inspiring quote, wrapped in a blockquote element.", media: "a movie" },
  { key: "4", author: "Author 4", quote: "Another inspiring quote, wrapped in a blockquote element.", media: "a movie" },
  { key: "5", author: "Author 5", quote: "Another inspiring quote, wrapped in a blockquote element.", media: "a movie" },
  { key: "6", author: "Author 6", quote: "Another inspiring quote, wrapped in a blockquote element.", media: "a movie" },
]);


const currentQuoteIndex = ref(0);
const currentQuote = computed(() => quotes.value[currentQuoteIndex.value]);


const computedObj = computed(() => {
  return lines.value.slice(-limit);
});


const switchQuote = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.value.length);
  } while (newIndex === currentQuoteIndex.value);

  currentQuoteIndex.value = newIndex;
};


onMounted(() => {
  const interval = setInterval(switchQuote, 5000);
  onUnmounted(() => clearInterval(interval));
});
</script>

<style lang="css">


.quote-fade {
  animation: myAnim 10s ease 10s infinite normal forwards;
}

@-webkit-keyframes  myAnim {
  0%,
  50%,
  100% {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}

@keyframes myAnim {
  0%,
  50%,
  100% {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}


</style>
