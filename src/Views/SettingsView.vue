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
        <li>
          <span>{{ $t('settings.theme') }}</span>
          <div class="theme-selector">
            <div
                v-for="theme in themes"
                :key="theme.value"
                class="theme-preview"
                :class="theme.value"
                @click="applyTheme(theme.value)"
                :style="{ backgroundImage: 'url(' + theme.previewImage + ')' }"
            >
              <span>{{ theme.name }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import { versions } from "@/composables/version";
import TitleComponent from "@/components/TitleComponent.vue";
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from "pinia";
import {useMessageStore} from "@/stores/MessagesStore";
import Alert from "@/components/Alert.vue";
import {useThemeStore} from "@/stores/ThemeStore";

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
  }).catch(() => {
    addMessage(1, { title: 'settings.update_setting_failed', type: 'danger' });
  });
}

const themeStore = useThemeStore();

// Change this to trigger both the theme update and the UI change
const applyTheme = async (theme) => {
  document.body.setAttribute("data-theme", theme); // Update the UI theme
  await themeStore.updateUserTheme(theme); // Update the theme in Firestore
};

const selectedTheme = computed({
  get: () => themeStore.themeName,
  set: async (value) => {
    await themeStore.updateUserTheme(value); // Trigger theme update in Firestore
  },
});

// List of themes and their preview images
const themes = [
  {
    value: 'wildflowers',
    name: 'Wildflowers',
    previewImage: 'src/assets/img/wildflowers-preview.jpg', // Use appropriate image path
  },
  {
    value: 'dark',
    name: 'Dark',
    previewImage: 'src/assets/img/dark-preview.jpg', // Use appropriate image path
  },
  {
    value: 'stars',
    name: 'Stars',
    previewImage: 'src/assets/img/stars-preview.jpg', // Use appropriate image path
  },
];
</script>

<style scoped>
.theme-selector {
  display: flex;
  gap: 15px;
}

.theme-preview {
  width: 100px;
  height: 100px;
  background-size: cover;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.theme-preview:hover {
  transform: scale(1.1);
}

.theme-preview span {
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.wildflowers {
  background-color: #d6e0d1; /* Replace with a color or gradient for wildflowers theme */
}

.dark {
  background-color: #333; /* Replace with a color or gradient for dark theme */
}

.stars {
  background-color: yellow; /* Replace with a color or gradient for stars theme */
}
</style>
