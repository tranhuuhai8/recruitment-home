<script setup lang="ts">
import { ref, watch } from 'vue'
import {
    columnsJobCategory,
    INITIAL_QUERY_MST,
    INITIAL_FORM_SEARCH,
    getQuerySearch,
} from '../shared'
import { useJobCategoryStore } from '@/stores'
import type { SortProps } from '@/interface'
import { FALSE_VALUE, mapSortQuery, SORT_TYPE_ASC } from '@/libs'
import SearchForm from './SearchForm.vue'

const loading = ref(false)
const jobCategoryStore = useJobCategoryStore()
const sortType = ref(SORT_TYPE_ASC)
const query = ref<any>({ ...INITIAL_QUERY_MST })
const formState = ref({ ...INITIAL_FORM_SEARCH, type: FALSE_VALUE })
const emit = defineEmits(['cellClick'])

const getData = async () => {
    loading.value = true
    await jobCategoryStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) => {
    sortType.value = dir ? `${dir}ing` : 'descending'
    query.value = mapSortQuery(query, key, sortType.value)
}

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value, true))

const handleReset = () => (query.value = { ...INITIAL_QUERY_MST })

const handleClick = (event: any, record: Record<string, any>) =>
    emit('cellClick', event, record)

watch(query, () => getData(), { immediate: true })
</script>

<template>
    <div class="box no-radius box-search">
        <SearchForm
            :has-type="true"
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleReset"
        />
    </div>

    <table-data
        class="job-category-list"
        :loading="loading"
        :columns="columnsJobCategory"
        :data="jobCategoryStore.getJobCategories"
        :sort-type="sortType"
        :show-pagination="true"
        @sort="handleSort"
        @cell-click="handleClick"
        @change-page="handleChangePage"
    />
</template>
