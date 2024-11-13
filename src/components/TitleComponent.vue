<template>
  <div class="row align-items-center mb-4">
    <div class="col-10">
      <h1 class="mb-0 display-7" v-if="translation">
        {{ $t(title) }}
      </h1>
      <h1 class="mb-0 display-7" v-else>
        {{ title }}
      </h1>
    </div>
    <div class="col text-end" v-if="!fullWidth">
      <slot name="buttons"></slot>
    </div>
  </div>
  <div class="row mb-4" v-if="showDescription">
    <div class="col">
      <p>
        <slot name="description"></slot>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  translation: {
    required: false,
    type: Boolean,
    default: true
  },
  fullWidth: {
    required: false,
    default: false,
    type: Boolean
  },
  cols: {
    type: Number,
    default: 4
  },
  showDescription: {
    type: Boolean,
    required: false
  }
})
</script>
