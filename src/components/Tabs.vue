<template>
  <ul class="nav nav-tabs nav-icons" :id="id" :class="{ 'nav-fill': isFullWidth }">
    <template v-for="(tab, index) in tabs" :key="index" >
      <li class="nav-item"
          v-if="tab.key"
          :class="{ active: currentTab === index }"
          @click="currentTab = index">
          <RouterLink v-if="isRoute" :to="{ name: tab.key }" class="nav-link justify-content-center" :class="[{ active: currentTab === index }]" >
            <template v-if="tab.hasOwnProperty('isValid')">
              <BootstrapIcon v-if="tab.isValid" :icon="tab.icon" />
              <BootstrapIcon v-else :icon="'exclamation-circle-fill'" :variant="'danger'" />
            </template>
            <BootstrapIcon v-else :icon="tab.icon" />
          <span>{{ $t(tab.translation) }}</span>
        </RouterLink>
        <button
          v-else
          class="nav-link justify-content-center"
          :class="[{ active: currentTab === index }]"
          :id="index"
          data-bs-toggle="tab"
          :data-bs-target="tab.key + '-tab-pane'"
          type="button"
          role="tab"
          :aria-controls="tab.key + '-tab-pane'"
          aria-selected="true"
        >
          <BootstrapIcon :icon="tab.icon" />
          <span>{{ $t(tab.translation) }}</span>
        </button>
      </li>
    </template>
  </ul>
  <div class="tab-content my-4">
    <div class="tab-pane fade show active" role="tabpanel">
      <RouterView v-if="isRoute" />
      <template v-else-if="data == null && !isRoute">
        <component :is="tabs[currentTab].component"></component>
      </template>
      <template v-else>
        <component :is="tabs[currentTab].component" :data="data"></component>
      </template>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import { ref } from "vue"

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  tabs: {
    type: Array,
    required: true,
  },
  isFullWidth: {
    type: Boolean,
    default: true
  },
  isRoute: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  },
});

const route = useRoute();
const currentTab = ref(0)

let index = props.tabs.findIndex(s => s.key == route.name ||
(s.childRoutes != undefined && s.childRoutes.filter(childRoute => childRoute === route.name).length > 0));
if(index > 0)
{
  currentTab.value = index
}

</script>

