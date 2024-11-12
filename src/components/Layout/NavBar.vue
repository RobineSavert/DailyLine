<template>
  <nav class="navbar navbar-light bg-white border navbar-expand fixed-bottom">
    <ul class="navbar-nav nav-justified w-100">
      <li class="nav-item" v-for="(navItem, index) in navItems" :key="index">
          <RouterLink
              class="nav-link position-relative"
              :to="{ name: navItem.name, params: { locale: Tr.currentLocale } }"
              active-class="active"
          >
            <div class="nav-icon">
              <BootstrapIcon :icon="navItem.icon" :variant="'primary'" size="2x" />
            </div>
            <span class="text-xs text-primary">
              {{ t(navItem.translation) }}
            </span>
          </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import Tr from "@/i18n/translation";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navItems = computed(() => [
  { key: 'line-button', icon: 'blockquote-right', name: 'lines', translation: 'navbar.lines' },
  { key: 'add-line-button', icon: 'vector-pen', name: 'add', translation: 'navbar.add' },
  { key: 'dashboard-button', icon: 'clipboard-data-fill', name: 'dashboard', translation: 'navbar.dashboard' },
  { key: 'settings-button', icon: 'gear-fill', name: 'settings', translation: 'navbar.settings' },
  { key: 'person-button', icon: 'person-fill', name: 'account', translation: 'navbar.account' },
]);
</script>


<style lang="scss">


:root {
  --rs-white: #ffffff;
  --rs-primary: #c77986;
  --rs-secondary: #d7a0a9;
}

.navbar {
  &.fixed-bottom {
    .nav-link {
      .nav-icon {
        padding: 0.5rem;
        border-radius: 1.25rem;
      }

      &.active .nav-icon,
      &:hover .nav-icon {
        background: var(--rs-primary);
        background: -moz-linear-gradient(
            150deg,
            var(--rs-primary) 20%,
            var(--rs-secondary) 90%
        );
        background: -webkit-linear-gradient(
            150deg,
            var(--rs-primary) 20%,
            var(--rs-secondary) 90%
        );
        background: linear-gradient(
            150deg,
            var(--rs-primary) 20%,
            var(--rs-secondary) 90%
        );

        svg {
          color: #fff;
        }

      }
    }

  }
}


</style>
