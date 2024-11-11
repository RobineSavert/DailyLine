<template>
  <div class="row mt-2" v-if="canSearch">
    <div class="col">
<!--        <Card :panelID="'cardFilters'" :panelOpen="isSearchPanelOpen" :variant="variant">-->
<!--            <template v-slot:title>-->
<!--                {{ $t('table.search') }}-->
<!--                <span v-if="canFilter">{{ $t('table.filters') }}</span>-->
<!--            </template>-->
<!--            <template v-slot:body>-->
<!--                -->
<!--            </template>-->
<!--        </Card>-->
      <slot name="searchTableComponent"></slot>
    </div>
  </div>
  <div class="row mt-2">
      <div class="col">
        <slot name="mainTable"></slot>
<!--          <Card :panelOpen="isTablePanelOpen" :panelID="panelID" :position="'left'" :variant="variant"-->
<!--              :panel-collapsable="collapsableCard">-->
<!--              <template v-slot:title>-->
<!--                  <template v-if="shouldTranslateTableName">-->
<!--                      {{ t(tableName) }}-->
<!--                  </template>-->
<!--                  <template v-else>-->
<!--                      {{ tableName }}-->
<!--                  </template>-->
<!--              </template>-->
<!--              <template v-slot:body>-->
<!--                  -->
<!--              </template>-->
<!--          </Card>-->
      </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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