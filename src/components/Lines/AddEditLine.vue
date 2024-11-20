<template>
  <template v-if="isDisabled && !isEdit">
    <LockedScreen message="Je hebt al een regel toegevoegd voor vandaag!" />
  </template>
  <template v-else>
    <TitleComponent :title="'lines.add_line'" v-if="!isEdit" />
    <div class="row">
      <div class="col">
        <textarea
            class="form-control"
            :placeholder="t(placeholderTextarea)"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            maxlength="300"
            autofocus
            ref="textareaRef"
            rows="5"
            :disabled="isDisabled"
        ></textarea>
        <hr />
        <div class="text-center my-5">
          {{ isEdit
            ? $t("lines.today_edit", { today: currentLineDate, chars: remainingCharacters })
            : $t("lines.today", { today: showDateLong, chars: remainingCharacters }) }}
        </div>
        <hr />
        <slot name="button"></slot>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLinesStore } from '@/stores/LinesStore';
import TitleComponent from '@/components/TitleComponent.vue';
import LockedScreen from '@/components/Lines/LockedScreen.vue';

const { t } = useI18n();

const props = defineProps({
  modelValue: { type: String, required: true },
  placeholderTextarea: { type: String, default: 'lines.placeholder' },
  isEdit: { type: Boolean, default: false },
  lineID: { type: String },
  isDisabled: { type: Boolean, required: false },
});

const textareaRef = ref(null);
const focusTextArea = () => textareaRef.value.focus();
defineExpose({ focusTextArea });

const longDate = new Date();
const dateConfig = { year: 'numeric', month: 'long', day: 'numeric' };

const linesStore = useLinesStore();

// Controleer of een regel al is toegevoegd voor vandaag
const todayUTC = new Date().toISOString().split('T')[0];
const currentLineDate = computed(() => {
  const line = linesStore.getLineById(props.lineID);
  if (line && line.date) {
    return formatDate(new Date(line.date), dateConfig);
  }
  return null;
});

const remainingCharacters = computed(() => {
  return 300 - props.modelValue.length;
});

const showDateLong = computed(() => {
  return formatDate(longDate, dateConfig);
});

function formatDate(date, formatOptions) {
  return new Intl.DateTimeFormat('nl-NL', formatOptions).format(date);
}
</script>

<style>
textarea {
  resize: none !important;
}
</style>
