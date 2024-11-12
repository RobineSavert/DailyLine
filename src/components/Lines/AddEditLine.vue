<template>
  <div class="mb-4">
    <h1 v-if="!isEdit">{{ $t('lines.add_line')}}</h1>
  </div>

    <textarea
        class="form-control"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        maxlength="300"
        v-autofocus
        ref="textareaRef"
        rows="5"
        :disabled="isDisabled"
    ></textarea>

      <p v-if="isDisabled" class="has-text-warning">
        {{ $t('countdown.description')}} {{ countdown }}
      </p>

  <slot name="button"></slot>

</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';
import {useI18n} from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
  modelValue: { type: String, required: true },
  bgColor: { type: String, default: 'danger' },
  label: { type: String },
  placeholder: { type: String, default: 'lines.placeholder' },
  isDisabled: { type: Boolean, default: false },
  countdown: { type: String, default: '' },
  isEdit: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);
const textareaRef = ref(null);
const isDisabled = ref(false);

const focusTextArea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>
