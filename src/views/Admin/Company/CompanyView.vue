<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useCompanyStore, useSettingStore } from '@/stores'
import { columns, getQuerySearch, INITIAL_FORM_SEARCH } from './shared'
import type { FormSearchCompany, SortProps } from '@/interface'
import { INITIAL_QUERY, mapSortQuery, SORT_TYPE_DESC } from '@/libs'
import { watch } from 'vue'
import SearchForm from './components/SearchForm.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const settingStore = useSettingStore()
const companyStore = useCompanyStore()
const formState = ref<FormSearchCompany>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })
const loading = ref(false)
const sortType = ref(SORT_TYPE_DESC)

const getData = async () => {
    loading.value = true
    await companyStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) => {
    sortType.value = dir ? `${dir}ing` : 'descending'
    query.value = mapSortQuery(query, key, sortType.value)
}

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => (query.value = { ...INITIAL_QUERY })

const handleClick = (event: any, record: Record<string, any>) => {
    router.push({ name: 'admin-companies-edit', params: { id: record.id } })
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
                :sort-type="sortType"
                :show-pagination="true"
                @sort="handleSort"
                @cell-click="handleClick"
                @change-page="handleChangePage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
