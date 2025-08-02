<script setup lang="ts">
import { ref, watch } from 'vue'
import { columnsCity } from '../shared'
import { useCityStore } from '@/stores'
import { mapSortQuery, SORT_TYPE_ASC } from '@/libs'
import type { SortProps } from '@/interface'

const loading = ref(false)
const cityStore = useCityStore()
const sortType = ref(SORT_TYPE_ASC)
const emits = defineEmits(['sort', 'changePage'])
const props = defineProps(['query'])

const getData = async () => {
    loading.value = true
    await cityStore.list(props.query)
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
        class="city-list"
        :loading="loading"
        :columns="columnsCity"
        :data="cityStore.getCities"
        :sort-type="sortType"
        :show-pagination="true"
        @sort="handleSort"
        @change-page="handleChangePage"
    />
</template>
