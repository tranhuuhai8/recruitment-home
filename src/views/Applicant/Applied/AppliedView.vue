<script setup lang="ts">
import { useApplyStore } from '@/stores/applicant'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_APPLY,
} from './shared'
import type { FormSearchJobApply, SortProps } from '@/interface'
import { mapSortQuery } from '@/libs'
import SearchForm from './components/SearchForm.vue'
import { useSettingStore } from '@/stores'

const { t } = useI18n()
const applyStore = useApplyStore()
const settingStore = useSettingStore()
const loading = ref(false)
const formState = ref<FormSearchJobApply>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_APPLY })

const getData = async () => {
    loading.value = true
    await applyStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => (query.value = { ...INITIAL_QUERY_APPLY })

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('sidebar.applied'))
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <a-spin :spinning="loading" class="spin-full">
        <div class="box box-search">
            <h1 class="title-page">{{ t('applicant.apply.title_page') }}</h1>
            <SearchForm
                :form-state="formState"
                @submit="handleSearch"
                @reset="handleResetQuery"
            />
        </div>
        <div class="box job-view">
            <div class="box-body no_padding">
                <table-data
                    class="job-apply-list"
                    :loading="loading"
                    :columns="columns"
                    :data="applyStore.getApplies"
                    :show-pagination="true"
                    @sort="handleSort"
                    @change-page="handleChangePage"
                />
            </div>
        </div>
    </a-spin>
</template>
