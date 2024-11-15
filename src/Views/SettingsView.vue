<template>
  <TitleComponent :title="'settings.title'"></TitleComponent>

  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>{{ $t('settings.app_version')}}</span>
      {{ appversion }}
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>{{ $t('settings.latest_change')}}</span>
      {{ latestChange }}
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>{{ $t('settings.language')}}</span>
      <LanguageSwitcher />
    </li>
  </ul>
</template>
<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import {versions} from "@/composables/version";
import TitleComponent from "@/components/TitleComponent.vue";

let appversion = versions.appversion
let latestChange = "11-10-2024"
</script>