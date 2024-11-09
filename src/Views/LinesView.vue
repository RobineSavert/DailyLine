<template>
    <h1>{{ $t('lines.title') }}</h1>

    <div v-for="line in lines" :key="line.id" class="mt-4">
      <SingleLine @deleteLine="checkLinesAndUpdate" :line="line" />
    </div>

    <div v-if="!lines.length && linesStore.linesLoaded">
      <h4>{{ $t('lines.no_lines') }}</h4>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import SingleLine from '../components/Lines/SingleLine.vue';
  import { useLinesStore } from '@/stores/LinesStore';
  import { storeToRefs } from 'pinia';
  import { useCharactersLimit } from '@/composables/useCharactersLimit';

  const linesStore = useLinesStore();
  const { lines } = storeToRefs(linesStore);
  const newLine = ref('');
  const isDisabled = ref(false);
  const countdown = ref('');

  useCharactersLimit(newLine);


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



  // Function to calculate and display countdown
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

  // Function to reset the timer
  const resetTimer = () => {
    isDisabled.value = false;
    countdown.value = '';
    localStorage.removeItem('textareaTimestamp');
  };

  // Initialize countdown and disable state on mount
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
</script>