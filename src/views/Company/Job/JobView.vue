<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores'
import { columns, getQuerySearch, INITIAL_FORM_SEARCH } from './shared'
import type { FormSearchJob, SortProps } from '@/interface'
import {
    INITIAL_QUERY,
    mapSortQuery,
    notify,
    SORT_TYPE_DESC,
    STATUS_CODE_SUCCESS,
} from '@/libs'
import { watch } from 'vue'
import SearchForm from './components/SearchForm.vue'
import { useJobStore } from '@/stores/company'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const jobStore = useJobStore()
const settingStore = useSettingStore()
const formState = ref<FormSearchJob>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })
const loading = ref(false)
const openDelete = ref(false)
const loadingDelete = ref(false)
const deleteId = ref<number | null>(null)
const sortType = ref(SORT_TYPE_DESC)

const getData = async () => {
    loading.value = true
    await jobStore.list(query.value)
    loading.value = false
}

const onDelete = (id: number) => {
    deleteId.value = id
    openDelete.value = true
}

const handleDelete = async () => {
    if (deleteId.value) {
        try {
            loadingDelete.value = true
            const { status_code, message } = await jobStore.remove(
                +deleteId.value
            )
            if (status_code === STATUS_CODE_SUCCESS) {
                return notify(message, '', 'success')
            }

            notify(message, '', 'error')
        } catch (error) {
            console.error(error)
        } finally {
            loadingDelete.value = false
            openDelete.value = false
            deleteId.value = null
            await getData()
        }
    }
}

const handleCreate = () => router.push({ name: 'company-jobs-create' })

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
    settingStore.setTitle(t('sidebar.jobs'))
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="box box-search">
        <h1 class="title-page">{{ t('job.title_page.list') }}</h1>
        <SearchForm
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleResetQuery"
        />
        <a-button type="primary" class="btn-create" @click="handleCreate">
            {{ t('create') }}
        </a-button>
    </div>
    <div class="box job-view">
        <div class="box-body no_padding">
            <table-data
                class="job-list"
                :loading="loading"
                :columns="columns"
                :data="jobStore.getJobs"
                :sort-type="sortType"
                :show-pagination="true"
                @sort="handleSort"
                @change-page="handleChangePage"
                @handle-delete="onDelete"
            />
        </div>
    </div>

    <modal-delete
        :open="openDelete"
        :loading="loadingDelete"
        :title="t('job.confirm_delete_id', [deleteId])"
        @close="
            () => {
                openDelete = false
                deleteId = null
            }
        "
        @on-delete="handleDelete"
    />
</template>
