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
            {{ t("lines.you_have_written_average", { average: averageLinesPerWeek }) }}
          </span>
          <span>
             {{ t("lines.the_last_line_date", { date_line: lastLineDate }) }}..
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
import Tr from "@/i18n/translation";
import { parseISO, differenceInWeeks } from "date-fns";


const { t } = useI18n()
const linesStore = useLinesStore();
const { lines } = storeToRefs(linesStore);
const totalLines = computed(() => lines.value.length);

const weeksSinceFirstEntry = computed(() => {
  if (lines.value.length === 0) return 1;
  const firstDate = parseISO(lines.value[lines.value.length - 1].date);
  const lastDate = parseISO(lines.value[0].date);
  return Math.max(1, differenceInWeeks(lastDate, firstDate) + 1);
});

const averageLinesPerWeek = computed(() => (totalLines.value / weeksSinceFirstEntry.value).toFixed(2));

const userLocale = Tr.currentLocale || 'en';

const lastLineDate = computed(() => {
  if (lines.value.length === 0) return null;

  const sortedLines = [...lines.value].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestLineDate = new Date(sortedLines[0].date);

  return new Intl.DateTimeFormat(userLocale, { year: 'numeric', month: 'long', day: 'numeric' }).format(latestLineDate);
});


</script>