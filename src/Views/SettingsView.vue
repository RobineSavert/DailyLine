<template>
  <h1>{{ $t('settings.title')}}</h1>


  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>{{ $t('settings.language')}}</span>
      <LanguageSwitcher />
    </li>
  </ul>
</template>
<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>