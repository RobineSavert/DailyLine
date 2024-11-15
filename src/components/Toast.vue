<template>
  <div class="toast-container top-0 end-0 p-3 overflow underModal" data-bs-animation="true" data-bs-delay='150'>
    <template v-for="(toast, index) in toasts" :key="index">
      <div class="toast mb-1 show border-0 " role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          <span>
            {{ $t(toast.title) }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/MessagesStore'

const { toasts } = storeToRefs(useMessageStore())
</script>

<style>
.overflow{
  overflow-y: auto;
}
</style>