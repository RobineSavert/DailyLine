<template>
  <div
      v-if="isVisible"
      class="fade"
      :class="{ show: show }"
      v-bind="$attrs"
  >
    <slot name="image"></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  duration: {
    type: Number,
    default: 5000, // Default visible duration in milliseconds
  },
});

defineOptions({
  inheritAttrs: false, // Ignore extraneous attributes completely
});

const emit = defineEmits(['finished']); // Emit event when fade-out is complete

const show = ref(false); // Controls fade-in/fade-out visibility
const isVisible = ref(true); // Ensures the component stays rendered

onMounted(() => {
  // Trigger fade-in
  setTimeout(() => {
    show.value = true; // Start fade-in
  }, 200); // Small delay to ensure CSS transition works

  // Trigger fade-out after the duration
  setTimeout(() => {
    show.value = false; // Start fade-out
    setTimeout(() => {
      isVisible.value = false; // Remove component after fade-out
      emit('finished'); // Notify parent
    }, 200); // Matches the CSS transition duration
  }, props.duration);
});
</script>

<style scoped>
.fade {
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
}

.fade.show {
  opacity: 1;
}
</style>