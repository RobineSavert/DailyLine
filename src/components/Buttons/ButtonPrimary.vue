<template>
    <Button :content="content" variant="primary" :icon="icon" @click="$emit('click')" />
</template>

<script setup>
import Button from "@/components/Buttons/Button.vue";

const props = defineProps({
  content: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: "plus-lg"
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click']);

</script>