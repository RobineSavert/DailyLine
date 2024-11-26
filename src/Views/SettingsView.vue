<template>
  <TitleComponent :title="'settings.title'" />
  <Toast />
  <Alert :variant="'danger'" />
  <div class="row">
    <div class="col">
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <label class="form-check-label" for="autoFillSwitch">{{ $t('settings.auto_lines')}}</label>
          <div class="form-check form-switch">
            <input
                class="form-check-input"
                type="checkbox"
                id="autoFillSwitch"
                v-model="autoFillMissingDays"
                @change="toggleAutoFillSetting"
            />
          </div>
        </li>
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

<script setup>
import { onMounted } from 'vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import { versions } from "@/composables/version";
import TitleComponent from "@/components/TitleComponent.vue";
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from "pinia";
import {useMessageStore} from "@/stores/MessagesStore";
import Alert from "@/components/Alert.vue";

const settingsStore = useSettingsStore();
const { autoFillMissingDays } = storeToRefs(useSettingsStore())
const {addMessage} = useMessageStore()

let appversion = versions.appversion;

onMounted(async () => {
  await settingsStore.fetchAutoFillLines();
});

async function toggleAutoFillSetting() {
  const newValue = autoFillMissingDays.value;
  await settingsStore.updateAutoFillDaysSetting(newValue).then(() => {
    addMessage(0, { title: 'settings.update_setting_success' });

  })
  .catch(() => {
    addMessage(1, { title: 'settings.update_setting_failed', type: 'danger' });
  });
}
</script>
