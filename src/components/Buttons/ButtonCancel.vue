<template>
    <Button :content="'buttons.cancel'" variant="danger" icon="x-lg" class="me-2"  @click="$emit('click')" />
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