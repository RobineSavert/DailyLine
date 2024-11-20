<template>
  <div class="row">
    <div class="col">
      <hr />
      <div class="my-4 fst-italic text-center">
        <span v-if="totalLines === 0">{{ $t('lines.no_lines') }}</span>
        <template v-else>
              <span>
                {{ t("lines.you_have_written", { lines: totalLines }) }}
              </span>
          <span v-if="totalLines >= 10">
                 {{ t("lines.you_have_written_average", { average: decimal.toFixed(2) }) }}
              </span>
          <span>
                {{ $t('lines.keep_it_up') }}
              </span>
        </template>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useLinesStore} from "@/stores/LinesStore";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const linesStore = useLinesStore();
const { lines } = storeToRefs(linesStore);
const totalLines = computed(() => lines.value.length);
const decimal = computed(() => totalLines.value / 7);
const {t} = useI18n()
</script>