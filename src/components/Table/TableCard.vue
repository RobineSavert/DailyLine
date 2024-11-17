<template>
  <div class="row mt-2" v-if="canSearch">
    <div class="col">
      <slot name="searchTableComponent"></slot>
    </div>
  </div>
  <div class="row mt-2">
      <div class="col">
        <slot name="mainTable"></slot>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array
  },
  canSearch: {
    type: Boolean,
    default: true
  },
  isSearchPanelOpen:{
    type: Boolean,
    default: false
  },
  panelID: {
    type: String
  },
  tableName: {
    type: String
  },
  shouldTranslateTableName: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
  },
  collapsableCard:{
    type: Boolean,
    default: true
  },
  isTablePanelOpen:{
    type: Boolean,
    default: true
  },
  canFilter:{
    type: Boolean,
    default: false
  }
})

</script>