<template>
  <!-- Backdrop -->
  <div v-if="eventBus.state.showModal" class="modal-backdrop fade show"></div>

  <!-- Modal -->
  <div v-if="eventBus.state.showModal" class="modal fade show"
       :class="{['modal-' + eventBus.state.modalSize]: eventBus.state.modalSize}" tabindex="-1" :aria-hidden="eventBus.state.showModal ? 'false' : true">
    <div class="modal-dialog" :class="{'modal-fullscreen': eventBus.state.modalFullScreen}">
      <div class="modal-content">
        <template v-if="eventBus.state.modalBodyComponent">
          <component :is="eventBus.state.modalBodyComponent" v-bind="eventBus.state.modalBodyProps"></component>
        </template>
        <template v-else>
          <div class="modal-header">
            <h5 class="modal-title">{{ eventBus.state.modalTitle }}</h5>
            <button type="button" class="btn-close" @click="eventBus.hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ eventBus.state.modalBodyText }}
          </div>
          <div class="modal-footer">
            <ButtonCancel @click="eventBus.hideModal" />
            <Button v-if="eventBus.state.modalButtonText" class="btn btn-primary" @click="handleButtonClick"
                        :icon="eventBus.state.modalButtonIcon" :content="eventBus.state.modalButtonText"
                        :shouldTranslateButtonText="false" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import eventBus from '@/eventBus';
import Button from "@/components/Buttons/Button.vue";
import ButtonCancel from "@/components/Buttons/ButtonCancel.vue";

function handleButtonClick() {
  if (eventBus.state.modalButtonCallback) {
    eventBus.state.modalButtonCallback();
  } else {
    eventBus.hideModal();
  }
}
</script>

<style>
.modal.show {
  display: block;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
}

.modal-backdrop.show {
  opacity: 0.5;
}

.modal.fade.show {
  display: block;
  opacity: 1;
}
</style>