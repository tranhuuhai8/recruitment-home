<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { mapSortQuery, TRUE_VALUE } from '@/libs'
import { useSettingStore } from '@/stores'
import { useApplicantStore } from '@/stores/admin'
import SearchForm from './components/SearchForm.vue'
import type { FormSearchApplicant, SortProps } from '@/interface'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_APPLICANT,
} from './shared'

const { t } = useI18n()
const settingStore = useSettingStore()
const applicantStore = useApplicantStore()
const formState = ref<FormSearchApplicant>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_APPLICANT })
const loading = ref(false)
const tableKey = ref(TRUE_VALUE)

const getData = async () => {
    loading.value = true
    await applicantStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => {
    query.value = { ...INITIAL_QUERY_APPLICANT }
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
    <div class="box applicant-view">
        <div class="box-body no_padding">
            <table-data
                class="applicant-list"
                :loading="loading"
                :columns="columns"
                :data="applicantStore.getApplicants"
                :show-pagination="true"
                :table-key="tableKey"
                @sort="handleSort"
                @change-page="handleChangePage"
            />
        </div>
    </div>
</template>
