<template>
    <template v-if="items.length > 0">
        <div class="table-responsive" v-if="pagedItems.length > 0">
          <table :data-cy="cy" class="table align-middle table-sm bg-transparent"
                :class="{ 'table-hover': isTableHover, 'table-striped': isTableStriped }" ref="table">
                <thead>
                    <tr>
                        <th v-if="canMultiSelect || canSingleSelect" class="bg-transparent">
                            <div class="form-check" v-if="canMultiSelectAll">
                                <input v-model="selectAll" @change="emitCheckedItems(true)"
                                    class="form-check-input" type="checkbox">
                            </div>
                        </th>
                        <template v-for="(field, index) in cFields" :key="index">
                            <template v-if="field.key">
                                <template v-if="!field.sortable">
                                    <th class="bg-transparent" :class="{ 'text-center': (index > 0 && alignCenter) || field.centerColumn }"
                                        :key="field.key" scope="row">
                                        <slot :name="'HEAD_' + field.key" :label="field.label">
                                            {{ label(field) }}
                                        </slot>
                                    </th>
                                </template>
                                <template v-else>
                                    <th :class="{ 'text-center': (index > 0 && alignCenter) || field.centerColumn }"
                                        class="cursor-pointer bg-transparent" :key="field.key" scope="row"
                                        @click="sort(field.key)">

                                        <slot :name="'HEAD_' + field.key" :label="field.label">
                                            {{ label(field) }}
                                        </slot>
                                      <i class="bi-chevron-expand ms-2" v-if="field.key !== dSortBy"></i>
                                      <i :class="getSortIcon('ascending')" class="ms-2" v-else-if="field.key === dSortBy && !dSortDesc"></i>
                                      <i :class="getSortIcon('descending')" class="ms-2" v-else-if="field.key === dSortBy && dSortDesc"></i>
                                    </th>
                                </template>
                            </template>
                        </template>
                        <th v-if="isExpandableTable">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in pagedItems" :key="getRowKey(item)">
                        <tr>
                            <td v-if="canMultiSelect" style="width: 1vw">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox"
                                        v-model="item.isChecked" :value="true"
                                        @change="emitCheckedItems(false)" :checked="item.isChecked"
                                        :disabled="isDisabled(item)">
                                </div>
                            </td>
                            <td v-else-if="canSingleSelect" style="width: 1vw">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio"
                                        name="radioButtonsInTable" v-model="item.isChecked"
                                        :value="true" @change="emitCheckedItem(item)"
                                        :checked="item.isChecked" :disabled="isDisabled(item)">
                                </div>
                            </td>
                            <template v-for="(field, index) in cFields" :key="index">
                                <td class="bg-transparent" :class="[item[compareField] === undefined ? '' : item[compareField] == compareValue ? customClass : '',
                                (
                                    (index > 0 && index < cFields.length - skipTextCenterColsFromRight && alignCenter)
                                    ||
                                    field.centerColumn
                                ) ? 'text-center' : '']" 
                                v-if="field.key" :key="field.key">
                                    <slot :name="field.key" :item="item" :value="item[field.key]" />

                                </td>
                            </template>

                            <td v-if="isExpandableTable">
                                <div class="d-flex justify-content-end">
                                    <slot :name="'expandableRowExtraButtons'" :item="item"
                                        :value="item[expandableRowKey]" />

                                    <Button
                                        :disabled="activeRow == 'detailrow-' + item[props.expandableRowKey]"
                                        circle :variant="'info'" :icon="'eye-fill'"
                                        @click="toggleRow(item)" />


                                </div>
                            </td>
                        </tr>
                        <tr v-if="isExpandableTable && ('detailrow-' + item[expandableRowKey]) == activeRow"
                            class="collapsible-row">
                            <td :colspan="Object.keys(cFields).length + 1" 
                            :class="[item[compareField] === undefined ? '' : item[compareField] == compareValue ? customClass : '', (index > 0 && alignCenter) ? 'text-center' : '']">
                                <slot :name="'expandableRow'" :item="item"
                                    :value="item[expandableRowKey]" />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div v-else>
            <EmptyTable :text="emptyTableName" :image="emptyTableImage" />
        </div>
        <Pagination :pagination-name="paginationName" :items="items" :per-page="showItemsPerPage"
            @page-changed="updateList" :totalItemCount="getItemCount" />
    </template>

    <div v-else class="text-center py-5">
        <EmptyTable :text="emptyTableName" :image="emptyTableImage" />
    </div>

</template>

<script setup>
import { computed, ref, watch } from "vue"
import Button from "@/components/Buttons/Button.vue";
import Pagination from '@/components/Table/Pagination.vue'
import EmptyTable from "@/components/Table/EmptyTable.vue"
import { useI18n } from "vue-i18n"
import emptyTableImg from '@/assets/img/undraw_no_data.svg'

const { t } = useI18n()
const props = defineProps({
    items: {
        type: Array
    },
    fields: {
        type: Array,
        default: null
    },
    sortBy: {
        type: String,
        default: null
    },
    sortDesc: {
        type: Boolean,
        default: false
    },
    showItemsPerPage: {
        type: Number,
        default: 15
    },
    updatedItemRange: {
        type: Array
    },
    paginationName: {
        type: String
    },
    searchByKeys: {
        type: Array,
        required: false
    },
    emptyTableName: {
        type: String,
    },
    variant: {
        type: String,
    },
    emptyTableImage: {
        type: String,
        default: emptyTableImg
    },
    canMultiSelectAll: {
        type: Boolean,
        default: false
    },
    canMultiSelect: {
        type: Boolean,
        default: false
    },
    canSingleSelect: {
        type: Boolean,
        default: false
    },
    customClass: {
        type: String,
        default: ""
    },
    compareField: {
        type: String,
        default: ""
    },
    compareValue: {
        type: String,
        default: ""
    },
    useCheckboxDisable: {
        type: Boolean,
        default: false
    },
    checkboxDisableField: {
        type: String,
        default: ""
    },
    alignCenter: {
        type: Boolean,
        default: false
    },
    isSearchTransparentBackground: {
        type: Boolean,
        default: true
    },
    smallSearchBar: {
        type: Boolean,
        default: true
    },
    isExpandableTable: {
        type: Boolean,
        default: false
    },
    expandableRowKey: {
        type: String,
        default: 'id'
    },
    stopRenderLoop: {
        type: Boolean,
        default: false
    },
    skipTextCenterColsFromRight: {
        default: 1,
        type: Number
    },
    isTableHover: {
        default: false
    },
    isTableStriped: {
        default: false,
        type: Boolean
    },
    filter: {
        type: String,
        default: ""
    }, 
    filters: {
        type: Array,
        default: () => []
    },
    appliedFilters: {
        type: Object,
        default: () => {}
    },
    cy: {
      type: String
    },
})

watch(
    () => props.filter, 
    (newFilter, oldFilter) => {
        searchOnTable(newFilter);
    }, 
    {
        deep: true
    }
);

watch(() => props.appliedFilters,
    (newAppliedFilters, oldAppliedFilters) => {
        searchOnTable(props.filter)
    },
    {
        deep: true
    }
);

let activeRow = ref(null)
let startRange = ref(0)
let endRange = ref(props.showItemsPerPage)
let sortByTranslationKey = ref('')
let sortByTranslationKeyWhenStartsWith = ref('')
let sortByTranslationKeyWhenColumnIsTrue = ref('')
let searched = ref(props.items)
let dSortBy = ref(props.sortBy);
let dSortDesc = ref(props.sortDesc);
let selectAll = ref(false)

let sortType;
getSortType(props.sortBy);

const toggleRow = (item) => {
    activeRow.value = 'detailrow-' + item[props.expandableRowKey];
};

const cFields = computed(() => {
    if (props.items.length === 0) {
        return [];
    }

    if (!props.fields) {
        return Object.keys(props.items[0]).map(item => {
            return {
                key: item
            };
        });
    }

    return [...props.fields].sort((a, b) => {
        if (!a.order || !b.order) {
            return 0;
        }

        if (a.order < b.order) {
            return -1;
        }

        if (a.order > b.order) {
            return 1;
        }

        return 0;
    });
});

function getSortType(key) {
    if (key == '')
        return;
    const fields = props.fields.filter(field => field.key == key);
    if (fields.length > 0) {
        const field = fields[0];
        if (field.sortByTranslationKey != undefined) {
            sortByTranslationKey.value = field.sortByTranslationKey;
        } else {
            sortByTranslationKey.value = '';
        }

        if (field.sortByTranslationKeyWhenStartsWith != undefined) {
            sortByTranslationKeyWhenStartsWith.value = field.sortByTranslationKeyWhenStartsWith;
        } else {
            sortByTranslationKeyWhenStartsWith.value = '';
        }

        if (field.sortByTranslationKeyWhenColumnIsTrue != undefined) {
            sortByTranslationKeyWhenColumnIsTrue.value = field.sortByTranslationKeyWhenColumnIsTrue;
        } else {
            sortByTranslationKeyWhenColumnIsTrue.value = '';
        }

        if (field.sortType != undefined) {
            sortType = field.sortType;
        } else {
            sortType = undefined;
        }
    } else {
        sortType = undefined;
    }
}

let itemKeys = undefined;
let primaryKeyOfItem = 'id'
let secondaryKeyOfItem = undefined
//programatically determine first and secondary item keys
function getRowKey(item) {
    //if itemKeys is undefined, get item keys from item
    if (itemKeys == undefined) {
        itemKeys = Object.keys(item)
    }

    //if assumed key 'id' is undefined, get the first key which contains the word id
    //if this doesnt exist, just get the first key
    if (item[primaryKeyOfItem] == undefined) {
        const idKeys = itemKeys.filter(key => key.toLowerCase().includes('id') || key.toLowerCase().includes('number'));
        if (idKeys.length > 0)
            primaryKeyOfItem = idKeys[0]
        else {
            const nameKeys = itemKeys.filter(key => key.toLowerCase().includes('name'));
            if (nameKeys.length > 0)
                primaryKeyOfItem = nameKeys[0]
            else
                primaryKeyOfItem = itemKeys[0]
        }
    }

    //if the secondary key isnt set yet,and the item has more than 1 key, obtain the secondary key.
    if (secondaryKeyOfItem == undefined && itemKeys.length > 1) {
        itemKeys.forEach((key) => {
            //if key in list of item keys is not equal to primary key
            //set secondary key, to this keys value and return
            if (key != primaryKeyOfItem && item[key] != null && typeof item[key] != 'object') {
                secondaryKeyOfItem = key;
            }
        });
    }

    if (secondaryKeyOfItem == undefined)
        return item[primaryKeyOfItem];

    return `${item[primaryKeyOfItem]}-${item[secondaryKeyOfItem]}`;
}

function label(field) {
    return field.label === undefined ? field.key : field.label;
}

function sort(key) {
    if (dSortBy.value !== key) {
        dSortBy.value = key;
        return;
    }

    dSortDesc.value = !dSortDesc.value;
}

function updateList(updatedItemRange, page) {
    startRange.value = updatedItemRange[0];
    endRange.value = updatedItemRange[1];
    emit('page-changed', page.value)
}

function searchOnTable(filter) {

    searched.value = [...searchTable(props.items, filter)];

    Object.keys(props.appliedFilters).forEach(key => {
        let newValue = props.appliedFilters[key]

        if (newValue != '' && newValue != undefined && newValue != null) {
            searched.value = searched.value.filter((item) => item[key] == newValue)
        }
    });
}

function searchTable(items, term) {
    if (term) {
        let searchedItems = []
        items.forEach(item => {
            props.searchByKeys.forEach(searchKey => {

                let sortByTranslationKey = '';
                let sortByTranslationKeyWhenStartsWith = ''
                let sortByTranslationKeyWhenColumnIsTrue = ''

                const fields = props.fields.filter(field => field.key == searchKey);
                if (fields.length > 0) {
                    const field = fields[0];

                    if (field.sortByTranslationKey != undefined) {
                        sortByTranslationKey = field.sortByTranslationKey;
                    }

                    if (field.sortByTranslationKeyWhenStartsWith != undefined) {
                        sortByTranslationKeyWhenStartsWith = field.sortByTranslationKeyWhenStartsWith;
                    }

                    if (field.sortByTranslationKeyWhenColumnIsTrue != undefined) {
                        sortByTranslationKeyWhenColumnIsTrue = field.sortByTranslationKeyWhenColumnIsTrue;
                    }
                }

                let itemKeyValue = item[searchKey];

                if (sortByTranslationKeyWhenStartsWith != '') {
                    let itemKeyValueStartsWith = itemKeyValue.startsWith(sortByTranslationKeyWhenStartsWith);
                    if (itemKeyValueStartsWith) {
                        itemKeyValue = t(sortByTranslationKey + itemKeyValue)
                    } else if (sortByTranslationKeyWhenColumnIsTrue != '' && item[sortByTranslationKeyWhenColumnIsTrue]) {
                        itemKeyValue = t(sortByTranslationKey + itemKeyValue)
                    }
                } else if (sortByTranslationKey != '') {
                    itemKeyValue = t(sortByTranslationKey + itemKeyValue)
                }

                if (typeof item[searchKey] === "string" && itemKeyValue.toLowerCase().includes(term.toLowerCase())) {
                    if (!searchedItems.includes(item)) {
                        searchedItems.push(item)
                    }
                }

            });
        });

        return searchedItems
    }

    return items;
}

const pagedItems = computed(() => {
    if (endRange.value == 0)
        endRange.value = props.showItemsPerPage

    return sortedItems.value.slice(startRange.value, endRange.value)
});

const sortedItems = computed(() => {
    getSortType(dSortBy.value);
    if (!dSortBy.value) {
        return searched.value;
    }

    if (sortType == undefined) {
        return defaultSort();
    } else if (sortType.toLowerCase() == "number") {
        return numberSort();
    } else if (sortType.toLowerCase() == "datetime") {
        return datetimeSort();
    } else if (sortType.toLowerCase() == "boolean") {
        return booleanSort();
    }

    return "";

});

//for boolean sort
//all we need to do is invert the default sort
//so that 'true' comes before 'false'
//because alphabetically, t would come after f
function booleanSort() {
    return searched.value.slice().sort((a, b) => {

        let aElement = a[dSortBy.value];
        let bElement = b[dSortBy.value];

        if (typeof aElement == 'string')
            aElement = aElement.toString().toLowerCase();
        if (typeof bElement == 'string')
            bElement = bElement.toString().toLowerCase();

        if (aElement === null) {
            return 1;
        }

        if (bElement === null) {
            return -1;
        }

        if (aElement === bElement) {
            return 0;
        }

        if (!dSortDesc.value) {
            return aElement > bElement ? 1 : -1;
        }

        if (dSortDesc.value) {
            return aElement > bElement ? -1 : 1;
        }

        return 0;
    });
}

function datetimeSort() {
    return searched.value.slice().sort((a, b) => {

        const aElement = a[dSortBy.value];
        const bElement = b[dSortBy.value];

        if (aElement === null) {
            return 1;
        }

        if (bElement === null) {
            return -1;
        }

        if (aElement === bElement) {
            return 0;
        }

        //date.parse returns the amount of ms that has passed since 01-01-1970
        //by using date.parse, we can just use the number sort as the result is an integer
        if (!dSortDesc.value) {
            return checkForSortByNumber(Date.parse(aElement), Date.parse(bElement)) ? -1 : 1;
        }

        if (dSortDesc.value) {
            return checkForSortByNumber(Date.parse(aElement), Date.parse(bElement)) ? 1 : -1;
        }

        return 0;
    });
}

function numberSort() {
    return searched.value.slice().sort((a, b) => {
        const aElement = a[dSortBy.value];
        const bElement = b[dSortBy.value];

        if (aElement === null) {
            return 1;
        }

        if (bElement === null) {
            return -1;
        }

        if (aElement === bElement) {
            return 0;
        }

        if (!dSortDesc.value) {
            return checkForSortByNumber(a, b) ? -1 : 1;
        }

        if (dSortDesc.value) {
            return checkForSortByNumber(a, b) ? 1 : -1;
        }

        return 0;
    });
}

function getSortIcon(direction) {
    if (sortType == undefined) {
        if (direction == 'descending') {
            return 'bi-sort-alpha-up'
        } else {
            return 'bi-sort-alpha-down';
        }
    } else if (sortType == 'number' || sortType == 'datetime') {
        if (direction == 'descending') {
            return 'bi-sort-numeric-up'
        } else {
            return 'bi-sort-numeric-down';
        }
    } else {
        if (direction == 'descending') {
            return 'bi-sort-up'
        } else {
            return 'bi-sort-down';
        }
    }
}

//used to convert the element to a number
function convertToNumberForSort(element) {

    let number = element
    if (typeof element == 'string')
        number = element.match(/(\d)+(\-|\,|\.)*(\d)*/g)[0];
    else
        number = number.toString()

    //replace all , and - with a . to parse as a float.
    return number.replace('-', '.').replace(',', '.');
}

//Indien een tekst begint met een getal met één van de volgende notaties:
//0
//0.0
//0,0
//0-0

//Het aantal getallen, voor of na de splitsing maakt niet uit dus:
//0
//0000.00000
//0000,00000
//0000-00000

//mag ook,
//Indien het getal aan het einde staat van de tekst, dan wordt er een default string sortering gedaan,
//Dit houdt in dat lees-tekens een volgorde krijgen, en het er bijvoorbeeld zo uit komt te zien, sortering die dan wordt toegepast is NIET hoofdletter gevoelig:

//defining the regex in a variable,
//messes up the sort order, compares return the incorrect state
//not sure why
function checkForSortByNumber(a, b) {

    let aElement = a[dSortBy.value];
    let bElement = b[dSortBy.value];

    ///^(\d)+(\-|\,|\.)*(\d)*/g tests to see if the string contains a number.
    if (/^(\d)+(\-|\,|\.)*(\d)*/g.test(aElement) && /^(\d)+(\-|\,|\.)*(\d)*/g.test(bElement)) {
        const numberA = convertToNumberForSort(aElement);
        const numberB = convertToNumberForSort(bElement);

        //replace all , and - with a . to parse as a float.
        return parseFloat(numberA) < parseFloat(numberB);
    } else {

        const aStringElem = getSortValueForElement(a);
        const bStringElem = getSortValueForElement(b);

        if (typeof aElement == 'string')
            aElement = aStringElem.toLowerCase();
        if (typeof bElement == 'string')
            bElement = bStringElem.toLowerCase();

        return aElement < bElement;
    }
}

function getSortValueForElement(elementsObject) {

    const element = elementsObject[dSortBy.value];

    if (sortByTranslationKeyWhenStartsWith.value != '') {
        let itemKeyValueStartsWith = element.startsWith(sortByTranslationKeyWhenStartsWith.value);
        if (itemKeyValueStartsWith) {
            return t(sortByTranslationKey.value + element)
        } else if (sortByTranslationKeyWhenColumnIsTrue.value != '' && elementsObject[sortByTranslationKeyWhenColumnIsTrue.value]) {
            return t(sortByTranslationKey.value + element)
        }
    } else if (sortByTranslationKey.value != '' && sortByTranslationKeyWhenColumnIsTrue.value != '' && elementsObject[sortByTranslationKeyWhenColumnIsTrue.value]) {
        return t(sortByTranslationKey.value + element)
    } else if (sortByTranslationKey.value != '') {
        return t(sortByTranslationKey.value + element)
    }

    return element;
}

function defaultSort() {
    return searched.value.slice().sort((a, b) => {

        let aElement = getSortValueForElement(a);
        let bElement = getSortValueForElement(b);

        if (typeof aElement == 'string')
            aElement = aElement.toString().toLowerCase();
        if (typeof bElement == 'string')
            bElement = bElement.toString().toLowerCase();

        if (aElement === null) {
            return 1;
        }

        if (bElement === null) {
            return -1;
        }

        if (aElement === bElement) {
            return 0;
        }

        if (!dSortDesc.value) {
            return aElement < bElement ? -1 : 1;
        }

        if (dSortDesc.value) {
            return aElement < bElement ? 1 : -1;
        }

        return 0;
    });
}

const getItemCount = computed(() => {
    return searched.value.length;
})

const emit = defineEmits(['itemsSelected', 'itemSelected', 'page-changed'])

function emitCheckedItems(shouldSelectAll, item) {
    if (shouldSelectAll) {
        let selectedValues = searched.value.filter((object) => object.isChecked);
        if (selectedValues.length === searched.value.length) {
            selectAll.value = false;
            searched.value.forEach(element => {
                element.isChecked = false;
            });
        } else {
            searched.value.forEach(element => {
                element.isChecked = true;
            });
        }
    }

    let allValuesSelected = searched.value.filter((object) => object.isChecked);
    selectAll.value = allValuesSelected.length === searched.value.length;
    emit("itemsSelected", props.items.filter((object) => object.isChecked));
}


function emitCheckedItem(item) {
    searched.value.forEach(element => {
        if (item != element) {
            element.isChecked = false;
        }
    });
    emit("itemSelected", item);
}

const isDisabled = (item) => {
    if (props.useCheckboxDisable) {

        if (item[props.checkboxDisableField] == null) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}
</script>

<style lang="scss" scoped>
.table {
  td {
    max-width: 20vw;
    height: 57px;
    line-break: auto;
  }
}

</style>