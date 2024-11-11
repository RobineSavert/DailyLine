<template>
  <div class="row align-items-center" v-show="totalAmountOfPages > 1">
    <div class="col-lg-6 col-12 mb-4 mb-lg-0">
    <span class="font-weight-bold">
       {{ $t('table.pagination.showing_results') }}
       {{ (startVar + 1) }}
       {{ $t('table.pagination.to') }}
       {{ endVar }}
       {{ $t('table.pagination.of') }}
       {{ props.items.length }}
       {{ $t(paginationName) }}
    </span>
    </div>
    <div class="col-lg-6 col-12 justify-content-end">
      <nav aria-label="navigation">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" v-if="page > 1" @click="backPage" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li class="page-item" v-if="page > maximumPagesShownBefore + 1">
            <a class="page-link" @click="() => goToPage(1)" aria-label="First Page">
              1
            </a>
          </li>

          <li class="page-item" v-if="page > maximumPagesShownBefore + 1">
            <span class="page-link no-hover">...</span>
          </li>

          <li
            v-for="item in amountOfPagesToShowBefore"
            :key="page - amountOfPagesToShowBefore + item"
            class="page-item"
          >
            <a class="page-link" @click="() => goToPage(page - amountOfPagesToShowBefore + item - 1)">{{ page - amountOfPagesToShowBefore + item -1 }}</a>
          </li>

          <li class="page-item">
            <a class="page-link active" aria-label="Current Page">
              {{page}}
            </a>
          </li>

          <li
            v-for="item in amountOfPagesToShowAhead"
            :key="item + page"
            class="page-item"
          >
            <a class="page-link" @click="goToPage(item + page)">{{ item + page }}</a>
          </li>

          <li class="page-item" v-if="page < (totalAmountOfPages - amountOfPagesToShowAhead)">
            <span class="page-link no-hover">...</span>
          </li>

          <li class="page-item" v-if="page < (totalAmountOfPages - amountOfPagesToShowAhead)">
            <a class="page-link" @click="goToPage(totalAmountOfPages)" aria-label="Last Page">
              {{totalAmountOfPages}}
            </a>
          </li>

          <li class="page-item">
            <a class="page-link" v-if="page < totalAmountOfPages" @click="nextPage" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  perPage: {
    type: Number,
    default: 1
  },
  paginationName: {
    type: String
  },
  totalItemCount: {
    type: Number,
    default: 0
  },
  maximumPagesShownAhead: {
    type: Number,
    default: 5
  },
  maximumPagesShownBefore: {
    type: Number,
    default: 5
  }
})

let page = ref(1);
let startVar = ref(0)
let endVar = ref(props.perPage)


const goToPage = (numPage) => {
  page.value = numPage;
  calcItemRange()
};

let totalAmountOfPages = computed(() =>  {
  if(props.totalItemCount == 0)
    return 0;

  return Math.ceil(props.totalItemCount / props.perPage);
})

const nextPage = () => {
  if(props.items.length == 0)
    return;
  
  if (page.value !== Math.ceil(props.items.length / props.perPage)) {
    page.value += 1;
  }
  
  calcItemRange()
};

const backPage = () => {
  if (page.value !== 1) {
    page.value -= 1;
  }
  calcItemRange()
};

const emit = defineEmits(['page-changed']);

function calcItemRange() {
  startVar.value = (page.value - 1) * props.perPage
  endVar.value = startVar.value + props.perPage

  if(endVar.value > props.totalItemCount)
    endVar.value = props.totalItemCount

  let updatedItemRange = [startVar.value, endVar.value]
  emit('page-changed', updatedItemRange, page)
}

//calculate the amount of items to display after the current page.
let amountOfPagesToShowAhead = computed(() =>  {
  let amountOfPages = props.maximumPagesShownAhead;
  const amount = totalAmountOfPages.value - page.value;

  if(props.totalItemCount == 0){
    return 0;
  }

  if(amount < props.maximumPagesShownAhead)
  {
    amountOfPages = amount;
  }

  if(page.value == totalAmountOfPages.value || amountOfPages < 0)
  {
    amountOfPages = 0;
  }

  //if the currentpage does not fit in the index
  //of total pages,
  //navigate to the first page
  if(totalAmountOfPages.value < page.value)
  {
    goToPage(1);
  }
  
  return amountOfPages;
});

//Calculate the amount of items to show before the current page.
let amountOfPagesToShowBefore = computed(() =>  {
  let amountOfPages = 0;
  const amountBack = page.value - 1;

  if(props.totalItemCount == 0){
    return 0;
  }

  if(amountBack > props.maximumPagesShownBefore)
  {
    amountOfPages = props.maximumPagesShownBefore;
  }else{
    amountOfPages = amountBack;
  }

  if(amountOfPages < 0)
  {
    amountOfPages = 0;
  }

  return amountOfPages;
});

</script>

<style lang="scss" scoped>
  .pagination {
    margin: 2px 0;
    white-space: nowrap;
    justify-content: flex-end;
    cursor: pointer;
  }
</style>
