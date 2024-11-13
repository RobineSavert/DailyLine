<template>
    <div>
      <TitleComponent :title="'lines.add_line'" v-if="!isEdit"></TitleComponent>

      <textarea
          class="form-control"
          :placeholder="t(placeholderTextarea)"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          maxlength="300"
          v-autofocus
          ref="textareaRef"
          rows="5"
      ></textarea>


      <slot name="button"></slot>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';
import {useI18n} from "vue-i18n";
import TitleComponent from "@/components/TitleComponent.vue";

const { t } = useI18n()
const props = defineProps({
  modelValue: { type: String, required: true },
  bgColor: { type: String, default: 'danger' },
  label: { type: String },
  placeholderTextarea: { type: String, default: 'lines.placeholder' },
  countdown: { type: String, default: '' },
  isEdit: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);
const textareaRef = ref(null);

const focusTextArea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>
