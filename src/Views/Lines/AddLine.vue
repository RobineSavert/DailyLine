<template>
  <AddEditLine
      v-model="newLine"
      ref="addEditLineRef"
      :is-disabled="isDisabled"
      :countdown="countdown"
  >
    <template #button>
      <ButtonPrimary
          icon="send-fill"
          :disabled="!newLine || isDisabled"
          @click="addLine"
          class="my-4"
          :content="'buttons.add_new'" />
    </template>
  </AddEditLine>



</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddEditLine from '@/components/Lines/AddEditLine.vue';
import { useLinesStore } from '@/stores/LinesStore';
import { storeToRefs } from 'pinia';
import { useCharactersLimit } from '@/composables/useCharactersLimit';
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import {useRouter} from "vue-router";

const linesStore = useLinesStore();
const addEditLineRef = ref(null);
const { lines } = storeToRefs(linesStore);
const newLine = ref('');
const isDisabled = ref(false);
const countdown = ref('');
const hasExistingLine = ref(false);

const router = useRouter();

const addLine = () => {
  linesStore.addLine(newLine.value);
  newLine.value = '';
  addEditLineRef.value.focusTextArea();
  hasExistingLine.value = true;
  sendText();
  router.push({name: 'lines'})
};


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

const sendText = () => {
  const now = new Date().getTime();
  localStorage.setItem('textareaTimestamp', now);
  isDisabled.value = true;
  calculateCountdown(now + 24 * 60 * 60 * 1000);
  setInterval(() => calculateCountdown(now + 24 * 60 * 60 * 1000), 1000);
};

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