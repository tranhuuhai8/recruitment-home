<script setup lang="ts">
import { ref, watch } from 'vue'
import { columnsCity } from '../shared'
import { useCityStore } from '@/stores/admin'
import { mapSortQuery } from '@/libs'
import type { SortProps } from '@/interface'

const loading = ref(false)
const cityStore = useCityStore()
const emits = defineEmits(['sort', 'changePage'])
const props = defineProps(['query', 'tableKey'])

const getData = async () => {
    loading.value = true
    await cityStore.list(props.query)
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
        class="city-list"
        :loading="loading"
        :columns="columnsCity"
        :data="cityStore.getCities"
        :table-key="props.tableKey"
        :show-pagination="true"
        @sort="handleSort"
        @change-page="handleChangePage"
    />
</template>
