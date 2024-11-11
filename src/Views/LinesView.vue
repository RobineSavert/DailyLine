<template>
  <div class="d-flex justify-content-between">
    <h1>{{ $t('lines.title') }}</h1>
    <DatePicker @update-date="handleDateUpdate" :id="'info-Datepicker'" />
  </div>

  <Spinner v-if="!linesLoaded" />

  <template v-else>

    <div v-if="filteredLines.length > 0">
      <div v-for="line in filteredLines" :key="line.id" class="mt-4">
        <SingleLine @deleteLine="checkLinesAndUpdate" :line="line" />
      </div>
    </div>

    <div v-else class="mt-4">
      <span class="fst-italic">{{ $t('lines.no_lines_on_date') }}</span>
    </div>
  </template>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
  import SingleLine from '../components/Lines/SingleLine.vue';
  import { useLinesStore } from '@/stores/LinesStore';
  import { storeToRefs } from 'pinia';
  import { useCharactersLimit } from '@/composables/useCharactersLimit';
  import DatePicker from "@/components/DatePicker.vue";
  import Spinner from "@/components/Spinner.vue";

  const linesStore = useLinesStore();
  const { lines, linesLoaded } = storeToRefs(linesStore);
  const newLine = ref('');
  const isDisabled = ref(false);
  const countdown = ref('');
  const selectedDate = ref('')
  const lineContent = ref('');

  useCharactersLimit(newLine);

  const filteredLines = computed(() => {
    if (!selectedDate.value) return lines.value;

    return lines.value.filter((line) => {
      const lineDate = new Date(parseInt(line.date)).toDateString();
      const selectedDateString = new Date(parseInt(selectedDate.value)).toDateString();
      return lineDate === selectedDateString;
    });
  });

  function checkLinesAndUpdate(){
    linesStore.getLines();
    const storedLines = lines.value;

    if (storedLines.length === 0) {
      resetTimer();
    } else {
      const savedTimestamp = localStorage.getItem('textareaTimestamp');
      if (savedTimestamp) {
        const expiryTime = parseInt(savedTimestamp) + 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (now < expiryTime) {
          isDisabled.value = true;
          calculateCountdown(expiryTime); // Continue the countdown if within 24 hours
        }
      }
    }
  }

  const calculateCountdown = (expiryTime) => {
    const now = new Date().getTime();
    const remaining = expiryTime - now;

    if (remaining > 0) {
      const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      countdown.value = `${hours}u ${minutes}m ${seconds}s`;
    } else {
      resetTimer();
    }
  };

  const resetTimer = () => {
    isDisabled.value = false;
    countdown.value = '';
    localStorage.removeItem('textareaTimestamp');
  };

  onMounted(() => {
    const savedTimestamp = localStorage.getItem('textareaTimestamp');
    const storedLines = lines.value; // Dynamically get lines from store

    if (!storedLines.length) {
      resetTimer(); // Enable the field if there are no lines
      return;
    }

    if (savedTimestamp) {
      const expiryTime = parseInt(savedTimestamp) + 24 * 60 * 60 * 1000;
      const now = new Date().getTime();
      if (now < expiryTime) {
        isDisabled.value = true;
        calculateCountdown(expiryTime);
      }
    }
  });

const handleDateUpdate = (timestamp) => {
  selectedDate.value = timestamp;
  lineContent.value = linesStore.getLineByDate(timestamp);
};
</script>