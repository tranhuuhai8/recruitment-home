<script setup lang="ts">
import { ref, watch } from 'vue'
import { columnsJobCategory } from '../shared'
import { useJobCategoryStore } from '@/stores/admin'
import type { SortProps } from '@/interface'
import { mapSortQuery } from '@/libs'

const loading = ref(false)
const jobCategoryStore = useJobCategoryStore()
const emits = defineEmits(['sort', 'changePage'])
const props = defineProps(['query', 'tableKey'])

const getData = async () => {
    loading.value = true
    await jobCategoryStore.list(props.query)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    emits(
        'sort',
        mapSortQuery(props.query, key, dir ? `${dir}ing` : 'descending', false)
    )

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
        :table-key="props.tableKey"
        :show-pagination="true"
        @sort="handleSort"
        @change-page="handleChangePage"
    />
</template>
