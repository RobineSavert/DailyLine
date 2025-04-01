<template v-if="quotes.length">
  <div class="row">
    <div class="col">
      <figure class="text-center" :key="currentQuote.key">
        <blockquote class="blockquote">
          <p>{{ currentQuote.quote }}</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          {{ currentQuote.author }} in <cite title="Source Title">{{ currentQuote.media }}</cite>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";

const quotes = ref([
  {
    key: "1",
    author: "Milan Kundera",
    quote: "Old men are recognizable by their habit of bragging about past sufferings and making a museum of them. Ah, those sad museums have such few visitors.",
    media: "Farewell Waltz"
  },
  {
    key: "2",
    author: "Warsan Shire",
    quote: "Mother says there are locked rooms inside all women; kitchen of lust, bedroom of grief, bathroom of apathy. Sometimes the men - they come with keys, and sometimes, the men - they come with hammers.",
    media: "The House"
  },
  {
    key: "3",
    author: "F. Scott Fitzgerald",
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past",
    media: "The Great Gatsby"
  },
  {
    key: "4",
    author: "Norman Maclean",
    quote: "One of life's quiet excitements is to stand somewhat apart from yourself and watch yourself softly becoming the author of something beautiful even if it is only a floating ash.",
    media: "A River Runs Through It"
  },
  {
    key: "5",
    author: "John Green",
    quote: "So I walked back to my room and collapsed on the bottom bunk, thinking that if people were rain, I was drizzle and she was hurricane.",
    media: "Looking for Alaska"
  },
  {
    key: "6",
    author: "Margaret Mitchell",
    quote: "After all, tomorrow is another day.",
    media: "Gone with the Wind"
  },
]);

const currentQuoteIndex = ref(0);
const currentQuote = computed(() => quotes.value[currentQuoteIndex.value]);

const switchQuote = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.value.length);
  } while (newIndex === currentQuoteIndex.value);

  currentQuoteIndex.value = newIndex;
};


onMounted(() => {
  const interval = setInterval(switchQuote, 10000);
  onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
.blockquote-footer {
  color: var(--bs-blockquote-color)
}
</style>