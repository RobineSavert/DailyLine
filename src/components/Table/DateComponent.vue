<template>
  <span>{{ formattedDate }}</span>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  value: {
    type: String
  },
})

const formattedDate = computed(() => {
  if (props.value != null) {
    const dateParts = props.value.split("T")[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}-${month}-${year}`;
  }

  return '';
})
</script>
