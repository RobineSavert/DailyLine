<template>
    <Button :content="'buttons.save'" :disabled="disabled" icon="bookmark-fill" variant="success" @click="$emit('click')" />
</template>

<script setup>
import Button from "@/components/Buttons/Button.vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click']);

</script>