<template>
  <template v-if="item.type === 'select'">
    <label class="visually-hidden" :for="'dropdownTableFilters-' + randomSelectId">Filter</label>
    <div class="input-group">
      <div class="input-group-text bg-light border-0 text-gray-800">
        <i class="funnel-fill"></i>
      </div>
    <select class="form-select bg-light border-0 small" :id="'dropdownTableFilters-' + randomSelectId" @change="setSelectFilter">
      <option v-for="(option, index) in item.options" :value="option.value" :key="index">
        {{ $t(option.name) }}
      </option>
    </select>
    </div>
  </template>
  <template v-else-if="item.type === 'radio'">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" :id="'checkbox-' + randomRadioId" @change="setRadioFilter">
      <label class="form-check-label" :for="'checkbox-' + randomRadioId">
        {{ $t(item.labelTranslation)}}
      </label>
    </div>
  </template>


</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object
  },
})

const emit = defineEmits(['change-filter'])

const setSelectFilter = (event) => {
  emit('change-filter', event.target.value, props.item.columnName)
}

const setRadioFilter = (event) => {
  emit('change-filter', event.target.checked, props.item.columnName)
}

let randomRadioId = ref()
let randomSelectId = ref()

randomRadioId.value = Math.floor(Math.random() * 100);
randomSelectId.value = Math.floor(Math.random() * 100);
</script>