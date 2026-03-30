<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, nextTick, provide } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useSettingStore } from '@/stores'
import { useMailLogStore } from '@/stores/admin'
import { TRUE_VALUE, notify, mapSortQuery } from '@/libs'
import type { SortProps } from '@/interface'
import SearchForm from './components/SearchForm.vue'
import DetailModal from './components/DetailModal.vue'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_MAIL_LOG,
} from './shared'

const settingStore = useSettingStore()
const mailLogStore = useMailLogStore()
const { t } = useI18n()

const formState = ref({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_MAIL_LOG })
const loading = ref(false)
const tableKey = ref(TRUE_VALUE)
const listData = shallowRef<any>({})
const showDetailModal = ref(false)
const selectedLog = ref<any>(null)

const getData = async () => {
    loading.value = true
    listData.value = await mailLogStore.list(query.value)
    loading.value = false
}

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => {
    formState.value = { ...INITIAL_FORM_SEARCH }
    query.value = { ...INITIAL_QUERY_MAIL_LOG }
    tableKey.value++
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleDetail = async (record: any) => {
    selectedLog.value = await mailLogStore.detail(record.id)
    showDetailModal.value = true
}

const handleRetry = async (record: any) => {
    try {
        await mailLogStore.retry(record.id)
        notify('Thành công', t('contact.reply.info_async'), 'success')
        await getData()
    } catch (e: any) {
        notify('Lỗi', e?.message ?? 'Retry thất bại!', 'error')
    }
}

// Provide cho ActionColumn inject
provide('handleDetail', handleDetail)
provide('handleRetry', handleRetry)

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('contact.mail_log.title'))
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
    <div class="box mail-log-view">
        <div class="box-body no_padding">
            <table-data
                class="mail-log-list"
                :loading="loading"
                :columns="columns"
                :data="listData"
                :show-pagination="true"
                :table-key="tableKey"
                @sort="handleSort"
                @change-page="handleChangePage"
            />
        </div>
    </div>

    <DetailModal v-model:open="showDetailModal" :log="selectedLog" />
</template>

<style lang="scss" scoped></style>
