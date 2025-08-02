<script setup lang="ts">
import { ref, watch } from 'vue'
import { columnsJobCategory } from '../shared'
import { useJobCategoryStore } from '@/stores'
import type { SortProps } from '@/interface'
import { mapSortQuery, SORT_TYPE_ASC } from '@/libs'

const loading = ref(false)
const jobCategoryStore = useJobCategoryStore()
const sortType = ref(SORT_TYPE_ASC)
const emits = defineEmits(['sort', 'changePage'])
const props = defineProps(['query'])

const getData = async () => {
    loading.value = true
    await jobCategoryStore.list(props.query)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) => {
    sortType.value = dir ? `${dir}ing` : 'descending'
    emits('sort', mapSortQuery(props.query, key, sortType.value, false))
}

const handleChangePage = (page: number) => emits('changePage', page)

watch(
    () => props.query,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <table-data
        class="job-category-list"
        :loading="loading"
        :columns="columnsJobCategory"
        :data="jobCategoryStore.getJobCategories"
        :sort-type="sortType"
        :show-pagination="true"
        @sort="handleSort"
        @change-page="handleChangePage"
    />
</template>
