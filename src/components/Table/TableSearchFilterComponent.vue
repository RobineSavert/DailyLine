<template>
    <div class="row align-items-center">
        <div class="mb-3 mb-md-0 col-md-4">
            <form class="form-inline">
                <div class="input-group">
                    <input v-model="filter" @input="inputSearch(filter)" type="text"
                        class="form-control bg-light border-0 small"
                        :placeholder="$t(searchPlaceholder)" :aria-label="$t('searchform.placeholder')"
                        aria-describedby="basic-addon2">
                    <button @click="emptyFilter" v-if="filter.length !== 0" class="btn btn-light"
                        type="button">
                        <BootstrapIcon icon="x" />
                    </button>
                    <div class="input-group-append">
                        <button class="btn btn-primary text-white" type="button">
                            <BootstrapIcon icon="search" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <template v-if="canFilter">
            <div v-for="(filter, index) in filters" :key="index" :class="filterColumnClass">
                <FilterComponent :item="filter" @change-filter="setFilter" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, ref } from "vue"
import FilterComponent from '@/components/Table/FilterComponent.vue'

const props = defineProps({
    items: {
        type: Array
    },
    variant: {
        type: String,
    },
    canFilter: {
        type: Boolean,
        default: false
    },
    searchPlaceholder: {
        type: String
    },
    filters: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['SearchInput', 'SearchFilters'])

const filterColumnClass = computed(() => {
    return props.filters.length >= 3 ? 'col' : 'col-md-3';
});

let filter = ref("")
let appliedFilters = ref({})

function setFilter(value, columnName) {
    appliedFilters.value[columnName] = value
    emit('SearchFilters', appliedFilters.value)
}

function inputSearch(filter) {
    emit('SearchInput', filter)
}

function emptyFilter() {
    filter.value = ''
    emit('SearchInput', filter.value)
}

</script>