<template>
  <div :class="[cardClasses, showBorderLeft ? 'border-left-' + variant : '']">

    <a v-if="panelCollapsable && panelHeader" class="d-block card-header py-3" :class="{ 'collapsed': !panelOpen }" data-bs-toggle="collapse" :href='id' aria-expanded="false" :aria-controls="panelID">
      <h6 class="m-0 font-weight-bold">
        <slot name="title"></slot>
      </h6>
    </a>

    <div v-else-if="!panelCollapsable && panelHeader" class="d-block card-header py-3">
      <h6 class="m-0 font-weight-bold">
        <slot name="title"></slot>
      </h6>
    </div>

    <div v-if="panelCollapsable" class="collapse" :class="{ 'show': panelOpen }" :id="panelID">
      <div class="card-body" :class="{ 'p-0': noPadding }">
        <slot name="body"></slot>
      </div>
    </div>
    <div v-else class="card-body" :class="{ 'p-0': noPadding }">
      <slot name="body"></slot>
    </div>

    <div class="card-footer" v-if="cardFooter">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  panelID: {
    type: String,
    required: false
  },
  panelOpen: {
    type: Boolean,
    default: true
  },
  panelCollapsable: {
    type: Boolean,
    default: true
  },
  panelHeader: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'primary'
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  addMbClass: {
    type: Boolean,
    default: true,
  },
  cardFooter:{
    type: Boolean,
    default: false
  },
  showBorderLeft: {
    type: Boolean,
    default: true
  }
});

const id = computed(() => {
  return '#' + props.panelID
})

const cardClasses = computed(() => ({
  'card': true,
  'shadow': true,
  'mb-4': props.addMbClass,
}));

</script>