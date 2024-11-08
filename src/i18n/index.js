import { createI18n } from "vue-i18n"
import pluralRules from "./pluralization"
import numberFormats from "./numbers.js"
import datetimeFormats from "./datetime.js"
import messages from '@intlify/unplugin-vue-i18n/messages'

export default createI18n({
  locale: import.meta.env.VITE_APP_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_APP_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: messages,
  useScope:"global",
  runtimeOnly: false,
  pluralRules,
  numberFormats,
  datetimeFormats
})