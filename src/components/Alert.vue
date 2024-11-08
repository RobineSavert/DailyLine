<template>
  <div v-for="(alert, index) in alerts" :key="index">
    <Transition name="fade">
      <div class="alert alert-icon fade show" role="alert" :class="alertClass(alert)">
        <button v-if="isDismissible" class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
        <div class="alert-icon-aside">
          <template v-if="hasIcon">
            <BootstrapIcon :icon="icon" />
          </template>
          <template v-else>
            <BootstrapIcon v-if="standardIcon(alert)" icon="check-circle-fill" />
            <BootstrapIcon v-if="alert.type === 'danger'" icon="exclamation-triangle-fill" />
            <BootstrapIcon v-if="alert.type === 'info'" icon="info-circle-fill" />
          </template>

        </div>
        <div class="alert-icon-content">
          <template v-if="customTitle">
            {{ customTitle }}
          </template>
          <template v-else>
            {{ $t(alert.title) }}
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { Transition } from "vue"
import { useMessageStore } from '@/stores/store-messages'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
const { t } = useI18n()
const { alerts } = storeToRefs(useMessageStore())

const props = defineProps({
  title: String,
  dismissible: Boolean,
  variant: String,
  icon: String
})

const isDismissible = props.dismissible
const customTitle = props.title
const hasVariant = props.variant
const hasIcon = props.icon

const alertClass = (alert) => {
  if (!alert.type || alert.type === 'success') {
    return 'alert-success';
  } else if (hasVariant) {
    return 'alert-' + props.variant;
  } else {
    return 'alert-' + alert.type;
  }
}

const standardIcon = (alert) => {
  return !alert.type || alert.type === 'success';
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.alert {
  border: 1px solid transparent;
  border-radius: 0.35rem;

  &.alert-icon {
    position: relative;
    display: flex;
    padding: 0;

    .btn-close {
      position: absolute;
      top: 1.5rem;
      right: 1rem;
    }

    .alert-icon-aside {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
      padding-left: 1rem;

      svg,
      i {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .alert-icon-content {
      padding: 1.5rem 1rem !important;

      .alert-heading {
        font-weight: bold;
      }
    }
  }
}
</style>
