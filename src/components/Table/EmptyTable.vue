<template>
      <div class="d-flex text-center flex-column align-items-center flex-wrap justify-content-center py-5">
        <img
          class="mb-4 w-25 img-fluid"
          :src="image"
          :alt="$t(text)" />
        <h4 class="text-gray-800"> {{ $t(text)}} </h4>
      </div>
</template>

<script setup>
import noData from '@/assets/img/undraw_no_data.svg';

const props = defineProps({
  text: {
    type: String,
    default: 'table.no_search_results'
  },
  image: {
    type: String,
    default: noData
  }
});
</script>