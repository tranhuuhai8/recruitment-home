<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores'
import { columns, getQuerySearch, INITIAL_FORM_SEARCH } from './shared'
import type { FormSearchApplicant, SortProps } from '@/interface'
import { INITIAL_QUERY, mapSortQuery, SORT_TYPE_DESC } from '@/libs'
import { watch } from 'vue'
import SearchForm from './components/SearchForm.vue'
import { useApplicantStore } from '@/stores/admin'

const { t } = useI18n()
const settingStore = useSettingStore()
const applicantStore = useApplicantStore()
const formState = ref<FormSearchApplicant>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })
const loading = ref(false)
const sortType = ref(SORT_TYPE_DESC)

const getData = async () => {
    loading.value = true
    await applicantStore.list(query.value)
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
                :sort-type="sortType"
                :show-pagination="true"
                @sort="handleSort"
                @change-page="handleChangePage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
