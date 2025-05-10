<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { columnsCity, INITIAL_QUERY_MST } from '../shared'
import { useCityStore } from '@/stores'
import type { SortProps } from '@/interface'
import { mapSortQuery } from '@/libs'

const loading = ref(false)
const cityStore = useCityStore()
const sortType = ref('ascending')
const query = ref(INITIAL_QUERY_MST)

watchEffect(async () => {
    loading.value = true
    await cityStore.list(query.value)
    loading.value = false
})

const handleChangePage = (page: number) => {
    query.value = {
        ...query.value,
        page,
    }
}

const handleSort = ({ field: key, order: dir }: SortProps) => {
    sortType.value = dir ? `${dir}ing` : 'descending'
    query.value = mapSortQuery(query, key, dir)
}
</script>

<template>
    <table-data
        class="city-list"
        :columns="columnsCity"
        :data="cityStore.getCities"
        :loading="loading"
        :has-create="false"
        :sort-type="sortType"
        :show-pagination="true"
        @sort="handleSort"
        @change-page="handleChangePage"
    />
</template>
