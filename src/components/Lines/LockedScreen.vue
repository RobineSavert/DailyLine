<template>
  <div class="row vh-100 align-items-center">
    <div class="col text-center">
      <div class="d-block">
        <h2>{{ countdown }} {{ $t('lines.locked_until') }}</h2>
        <i class="bi bi-lock-fill" style="font-size: 7em"></i>
      </div>
      <div class="my-4">
          <span>
            {{ $t('lines.locked_because') }}
          </span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  countdown: {
    type: String
  },
})
</script>