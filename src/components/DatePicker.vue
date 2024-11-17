<template>
  <div class="row">
    <div class="col">
      <div class="input-group position-relative">
        <label class="control-label" :for="id"></label>
        <input type="text"
               class="form-control"
               :id="id"
               :aria-label="$t('datepicker.placeholder')"
               :aria-describedby="id"
               v-model="keyDate">

        <i class="bi-calendar-fill position-absolute input-icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import datepicker from 'js-datepicker'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['update-date'])
const { t } = useI18n()

const props = defineProps({
  id: {
    type: String
  },
})

let picker;

function getCorrectDate(chosenDate){
  let day = chosenDate.getDate()
  let month = chosenDate.getMonth() + 1 // Month is zero-indexed, so we need to add 1

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return day + '-' + month + '-' + chosenDate.getFullYear()
}

function getReverseDate(chosenDate){
  let day = chosenDate.getDate()
  let month = chosenDate.getMonth() + 1 // Month is zero-indexed, so we need to add 1

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return chosenDate.getFullYear() + '-' + month + '-' + day
}

function getFormattedToday() {
  const today = new Date();
  return getCorrectDate(today);
}

let keyDate = ref('')

function emitUnixDate(chosenDate) {
  const timestamp = chosenDate.getTime();
  return timestamp
}

onMounted(() => {
  const maxDaysAgo = new Date();
  maxDaysAgo.setDate(maxDaysAgo.getDate() - 29);

  keyDate.value = getFormattedToday();

  picker = datepicker('#' + props.id, {
    formatter: (input, date, instance) => {
      let formattedDate = getCorrectDate(new Date(date));
      document.getElementById(props.id).value = formattedDate
      emit('update-date', emitUnixDate(date))
    },
    maxDate: new Date(),
    minDate: maxDaysAgo,
    customDays: [
      t('weekdays.sun'),
      t('weekdays.mon'),
      t('weekdays.tue'),
      t('weekdays.wed'),
      t('weekdays.thur'),
      t('weekdays.fri'),
      t('weekdays.sat')
    ],
    customMonths: [
      t('months.jan'),
      t('months.feb'),
      t('months.march'),
      t('months.april'),
      t('months.may'),
      t('months.june'),
      t('months.july'),
      t('months.aug'),
      t('months.sept'),
      t('months.oct'),
      t('months.nov'),
      t('months.dec')],
    overlayPlaceholder: t('pick_a_year'),
    overlayButton: t('pick'),
  })
})



</script>

<style lang="scss">
@import "/node_modules/js-datepicker/dist/datepicker.min.css";

.qs-datepicker-container {
  width: auto !important;
  border: 1px solid #e3e6f0;
  font-family: "segoe",serif;
  color: #3a3b45;
}

.qs-controls {
  background: transparent !important;
  padding: 20px 5px;
}

.qs-square {
  height: 3em;
}

.qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover,
.qs-active, .qs-range-end, .qs-range-start {
  color: #fff;
  background: #ed751f;
}

.qs-current {
  text-decoration: none;
}

.qs-overlay {
  padding: 20px 10px
}

.qs-overlay .qs-overlay-year {
  padding: 15px
}

.qs-overlay-month-container {
  margin: 10px 10px 15px 10px;
}

.qs-overlay .qs-close {
  right: 6px;
}

.input-icon {
  top: 10px;
  right: 10px;
}
</style>
