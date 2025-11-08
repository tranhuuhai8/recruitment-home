<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_APPLY,
} from './shared'
import type { FormSearchJobApply, SortProps } from '@/interface'
import { mapSortQuery, notify, STATUS_CODE_SUCCESS, TRUE_VALUE } from '@/libs'
import { useJobApplyStore } from '@/stores/company'
import SearchForm from './components/SearchForm.vue'
import ApplyForm from './components/ApplyForm.vue'

const { t } = useI18n()
const jobApplyStore = useJobApplyStore()
const settingStore = useSettingStore()
const loading = ref(false)
const openDelete = ref(false)
const openUpdate = ref(false)
const loadingModal = ref(false)
const deleteId = ref<number | null>(null)
const updateId = ref<number | null>(null)
const tableKey = ref(TRUE_VALUE)
const formState = ref<FormSearchJobApply>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_APPLY })

const getData = async () => {
    loading.value = true
    await jobApplyStore.list(query.value)
    loading.value = false
}

const onDelete = (id: number) => {
    deleteId.value = id
    openDelete.value = true
}

const onUpdate = (id: number) => {
    updateId.value = id
    openUpdate.value = true
}

const submitDelete = async () => {
    if (deleteId.value) {
        try {
            loadingModal.value = true
            const { status_code, message } = await jobApplyStore.remove(
                +deleteId.value
            )
            if (status_code === STATUS_CODE_SUCCESS) {
                return notify(message, '', 'success')
            }

            notify(message, '', 'error')
        } catch (error) {
            console.error(error)
        } finally {
            loadingModal.value = false
            openDelete.value = false
            deleteId.value = null
            await getData()
        }
    }
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => {
    query.value = { ...INITIAL_QUERY_APPLY }
    tableKey.value++
}

const handleRefreshData = () => {
    getData()
    tableKey.value++
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('sidebar.applications'))
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="box box-search">
        <h1 class="title-page">{{ t('apply.title_page.list') }}</h1>
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
                :data="jobApplyStore.getJobApplications"
                :table-key="tableKey"
                :show-pagination="true"
                @sort="handleSort"
                @change-page="handleChangePage"
                @handle-delete="onDelete"
                @handle-update="onUpdate"
            />
        </div>
    </div>

    <modal-delete
        :open="openDelete"
        :loading="loadingModal"
        :title="t('apply.confirm_delete_id', [deleteId])"
        @close="((openDelete = false), (deleteId = null))"
        @on-delete="submitDelete"
    />

    <modal-vue
        centered
        wrapClassName="modal-apply-form"
        :open="openUpdate"
        :hasFooter="false"
        :closable="false"
        :title="t('apply.confirm_update_id', [updateId])"
        @cancel="openUpdate = false"
    >
        <template #body>
            <ApplyForm
                :id="updateId"
                :query="query"
                :open="openUpdate"
                @cancel="((openUpdate = false), (updateId = null))"
                @submit="openUpdate = false"
                @reset-data="handleRefreshData"
            />
        </template>
    </modal-vue>
</template>
