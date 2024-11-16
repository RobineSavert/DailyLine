<template>
  <template v-if="isLocked && !isEdit">
    <div class="row vh-100 align-items-center">
      <div class="col text-center">
        <div class="d-block">
          <h2>{{ countdown }} until next line..</h2>
          <i class="bi bi-lock-fill" style="font-size: 7em"></i>
        </div>
        <div class="my-4">
          <span>Writing a line is locked, because you can only write a line once a day..</span>
        </div>
      </div>
    </div>
  </template>
  <template v-else>

    <TitleComponent :title="'lines.add_line'" v-if="!isEdit"></TitleComponent>
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
        <div class="text-center my-5" v-if="isEdit">{{ $t("lines.today_edit", { today: currentLineDate, chars: remainingCharacters }) }}</div>
        <div class="text-center my-5" v-else>{{ $t("lines.today", { today: showDateLong, chars: remainingCharacters }) }}</div>
        <hr />

        <slot name="button"></slot>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useLinesStore } from "@/stores/LinesStore";
import TitleComponent from "@/components/TitleComponent.vue";
import {useRoute} from "vue-router";
const route = useRoute();
const { t } = useI18n();
const props = defineProps({
  modelValue: { type: String, required: true },
  bgColor: { type: String, default: 'danger' },
  label: { type: String },
  placeholderTextarea: { type: String, default: 'lines.placeholder' },
  isEdit: { type: Boolean, default: false },
  lineID: {type: String},
  isDisabled: { type: Boolean, required: true },
});

const textareaRef = ref(null);
const focusTextArea = () => textareaRef.value.focus();
defineExpose({ focusTextArea });


const linesStore = useLinesStore();
const { lines } = storeToRefs(linesStore);
var nowDate = new Date();
var showDate = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
const latestLineTime = computed(() => lines.value[0]?.date || null);
let countdown = ref('');
let showCountdown = ref(false);
let isLocked = ref(false);
let currentLineDate = computed(() => {
  // Zoek de lijn met de juiste ID in de store
  const line = linesStore.getLineById(props.lineID);
  if (line && line.date) {
    // Converteer de datum naar het juiste formaat
    return formatDate(new Date(line.date), route.params.locale, dateConfig);
  }
  return null;
});




const remainingCharacters = computed(() => {
  return 300 - props.modelValue.length;
});

const updateCountdown = () => {
  if (!latestLineTime.value) {
    showCountdown.value = false;
    return;
  }

  const lastTime = new Date(latestLineTime.value).getTime();
  const now = Date.now();
  const diff = 24 * 60 * 60 * 1000 - (now - lastTime);

  if (diff > 0) {
    showCountdown.value = true;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdown.value = `${hours} uur, ${minutes} minuten en ${seconds} seconden`;
    isLocked.value = true;
  } else {
    isLocked.value = false;
    showCountdown.value = false;
  }
};



let interval = null;
onMounted(() => {
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

function formatDate(date, locale, formatOptions) {
  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

const longDate = new Date(2024, 10, 15); // 15 november 2024
const dateConfig = { year: 'numeric', month: 'long', day: 'numeric' };


const showDateLong = computed(() => {
  return formatDate(longDate, route.params.locale, dateConfig)
});
</script>

<style>
textarea {
  resize: none !important;
}
</style>
