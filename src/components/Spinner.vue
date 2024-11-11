<template>
  <div class="overlay-spinner d-flex align-items-center position-fixed flex-column justify-content-center">
    <BootstrapIcon icon="gear-wide-connected" size="5x" animation="spin" class="mx-auto position-relative" />
  </div>
</template>

<style lang="scss" scoped>
.overlay-spinner {
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999999;
}
.overlay-spinner span {
  margin-top: 1rem;
}
</style>
<script setup lang="ts">
</script>