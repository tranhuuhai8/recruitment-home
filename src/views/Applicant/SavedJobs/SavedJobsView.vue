<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useSavedJobsStore } from '@/stores/applicant'
import { useFavoritesStore, useSettingStore } from '@/stores'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_SAVED_JOBS,
} from './shared'
import type { FormSearchSavedJob, SavedJob, SortProps } from '@/interface'
import { mapSortQuery, notify } from '@/libs'
import SearchForm from './components/SearchForm.vue'

const { t } = useI18n()
const savedJobsStore = useSavedJobsStore()
const favoritesStore = useFavoritesStore()
const settingStore = useSettingStore()

const loading = ref(false)
const formState = ref<FormSearchSavedJob>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_SAVED_JOBS })

const openDelete = ref(false)
const loadingDelete = ref(false)
const deleteTarget = ref<SavedJob | null>(null)

const getData = async () => {
    loading.value = true
    await savedJobsStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => (query.value = { ...INITIAL_QUERY_SAVED_JOBS })

const onRequestDelete = (id: number | string) => {
    const target = savedJobsStore.getJobs.data?.find(
        (job: SavedJob) => job.id === +id
    )
    if (!target) return
    deleteTarget.value = target
    openDelete.value = true
}

const handleDelete = async () => {
    if (!deleteTarget.value) return
    loadingDelete.value = true
    try {
        await favoritesStore.toggleJobSaved(
            deleteTarget.value.id,
            deleteTarget.value.slug as string
        )
        notify(t('applicant.saved_jobs.notify.deleted'), '', 'success')
        await getData()
    } catch (e: any) {
        notify(t('notify.error'), e?.message ?? '', 'error')
    } finally {
        loadingDelete.value = false
        openDelete.value = false
        deleteTarget.value = null
    }
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('applicant.saved_jobs.title_page'))
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="box box-search">
        <h1 class="title-page">{{ t('applicant.saved_jobs.title_page') }}</h1>
        <SearchForm
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleResetQuery"
        />
    </div>
    <div class="box job-view">
        <div class="box-body no_padding">
            <table-data
                class="saved-jobs-list"
                :loading="loading"
                :columns="columns"
                :data="savedJobsStore.getJobs"
                :show-pagination="true"
                @sort="handleSort"
                @change-page="handleChangePage"
                @handle-delete="onRequestDelete"
            />
        </div>
    </div>

    <modal-delete
        :open="openDelete"
        :loading="loadingDelete"
        :title="t('applicant.saved_jobs.confirm_delete', [deleteTarget?.title])"
        @close="
            () => {
                openDelete = false
                deleteTarget = null
            }
        "
        @on-delete="handleDelete"
    />
</template>
