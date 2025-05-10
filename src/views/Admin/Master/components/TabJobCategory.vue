<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { columnsJobCategory, INITIAL_QUERY_MST } from '../shared'
import { useJobCategoryStore } from '@/stores'
import type { SortProps } from '@/interface'
import { mapSortQuery } from '@/libs'

const loading = ref(false)
const jobCategoryStore = useJobCategoryStore()
const sortType = ref('ascending')
const query = ref(INITIAL_QUERY_MST)

watchEffect(async () => {
    loading.value = true
    await jobCategoryStore.list(query.value)
    loading.value = false
})

const handleChangePage = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

const sort = ({ field: key, order: dir }: SortProps) => {
    sortType.value = dir ? `${dir}ing` : 'descending'
    query.value = mapSortQuery(query, key, dir)
}
</script>

<template>
    <table-data
        class="job-category-list"
        :columns="columnsJobCategory"
        :show-pagination="true"
        :show-selection="false"
        :data="jobCategoryStore.getJobCategories"
        :loading="loading"
        :hasCreate="false"
        @change-page="handleChangePage"
        :sort-type="sortType"
        @sort="sort"
    />
</template>
