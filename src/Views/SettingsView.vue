<template>
  <TitleComponent :title="'settings.title'" />
  <Toast />
  <div class="row">
    <div class="col">
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ $t('settings.app_version')}}</span>
          {{ appversion }}
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ $t('settings.language')}}</span>
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import {versions} from "@/composables/version";
import TitleComponent from "@/components/TitleComponent.vue";
import { useBookStore } from '@/stores/BookStore';
import {ref} from "vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import {storeToRefs} from "pinia";

let appversion = versions.appversion


</script>