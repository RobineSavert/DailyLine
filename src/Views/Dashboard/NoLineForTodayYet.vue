<template>
  {{ $t('lines.no_line_for_today')}}

  <RouterLink :to="{ name: 'add-line', params: {locale: route.params.locale} }">
  {{ $t('lines.no_line_for_today_button') }}
  </RouterLink>
  <hr />
</template>

<script setup>
import {useRoute} from "vue-router";
const route = useRoute()
</script>

