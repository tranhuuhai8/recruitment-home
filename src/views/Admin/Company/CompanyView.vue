<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores'
import { useCompanyStore } from '@/stores/admin'
import {  mapSortQuery, TRUE_VALUE } from '@/libs'
import SearchForm from './components/SearchForm.vue'
import type { FormSearchCompany, SortProps } from '@/interface'
import { columns, getQuerySearch, INITIAL_FORM_SEARCH, INITIAL_QUERY_COMPANY } from './shared'

const { t } = useI18n()
const settingStore = useSettingStore()
const companyStore = useCompanyStore()
const formState = ref<FormSearchCompany>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_COMPANY })
const loading = ref(false)
const tableKey = ref(TRUE_VALUE)

const getData = async () => {
    loading.value = true
    await companyStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => {
    query.value = { ...INITIAL_QUERY_COMPANY }
    tableKey.value++
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('sidebar.companies'))
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="box box-search">
        <SearchForm
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleResetQuery"
        />
    </div>
    <div class="box company-view">
        <div class="box-body no_padding">
            <table-data
                class="company-list"
                :loading="loading"
                :columns="columns"
                :data="companyStore.getCompanies"
                :show-pagination="true"
                :table-key="tableKey"
                @sort="handleSort"
                @change-page="handleChangePage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
