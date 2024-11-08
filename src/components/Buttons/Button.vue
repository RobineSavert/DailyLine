<template>
    <button :disabled="disabled" class="btn"
    :class="[
      'btn-' + variant,
      circle ? 'btn-circle text-white mx-1' : 'btn-icon-split',
    ]"
    >
        <span class="icon" :class="[circle ? '' : 'text-white-50', variant === 'btn-light' ? 'text-gray-900' : '']">
            <BootstrapIcon v-if="animation == undefined" :icon="icon" />
            <BootstrapIcon v-else :icon="icon" :animation="animation" />
        </span>
        <span v-if="!circle && shouldTranslateButtonText" class="text" :class="variant === 'btn-light' ? 'text-gray-900' : ''">{{ $t(content) }}</span>
        <span v-else-if="!circle && !shouldTranslateButtonText" class="text" :class="variant === 'btn-light' ? 'text-gray-900' : ''">{{ content }}</span>
    </button>
</template>

<script setup>
const props = defineProps({
  content: String,
  variant: {
      type: String,
      default: "primary"
  },
  icon: String,
  circle: Boolean,
  animation: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  shouldTranslateButtonText: {
    type: Boolean,
    default: true,
  },
})
</script>