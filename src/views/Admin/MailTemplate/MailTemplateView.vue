<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, nextTick, provide } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useSettingStore } from '@/stores'
import { useMailTemplateStore } from '@/stores/admin'
import { TRUE_VALUE, notify, mapSortQuery } from '@/libs'
import type { IMailTemplateDto, SortProps } from '@/interface'
import SearchForm from './components/SearchForm.vue'
import FormModal from './components/FormModal.vue'
import PreviewModal from './components/PreviewModal.vue'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_FORM_MAIL_TEMPLATE,
    INITIAL_QUERY_MAIL_TEMPLATE,
} from './shared'

const settingStore = useSettingStore()
const mailTemplateStore = useMailTemplateStore()
const { t } = useI18n()

const formState = ref({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_MAIL_TEMPLATE })
const loading = ref(false)
const tableKey = ref(TRUE_VALUE)
const listData = shallowRef<any>({})

// Modal states
const showFormModal = ref(false)
const showPreviewModal = ref(false)
const isSubmitting = ref(false)
const editingId = ref<number | null>(null)
const formModalState = ref<IMailTemplateDto>({ ...INITIAL_FORM_MAIL_TEMPLATE })
const previewData = ref<any>(null)
const previewLoading = ref(false)

// Delete modal states
const openDelete = ref(false)
const loadingDelete = ref(false)
const deleteId = ref<number | null>(null)

const getData = async () => {
    loading.value = true
    listData.value = await mailTemplateStore.list(query.value)
    loading.value = false
}

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => {
    formState.value = { ...INITIAL_FORM_SEARCH }
    query.value = { ...INITIAL_QUERY_MAIL_TEMPLATE }
    tableKey.value++
}

const openCreateModal = () => {
    editingId.value = null
    formModalState.value = { ...INITIAL_FORM_MAIL_TEMPLATE }
    showFormModal.value = true
}

const handleEdit = (record: any) => {
    editingId.value = record.id
    formModalState.value = {
        name: record.name,
        code: record.code,
        subject: record.subject,
        body: record.body,
        variables: record.variables ?? [],
        type: record.type,
        is_active: record.is_active,
    }
    showFormModal.value = true
}

const handlePreview = async (record: any) => {
    showPreviewModal.value = true
    previewLoading.value = true
    try {
        previewData.value = await mailTemplateStore.fetchPreview(record.id)
    } finally {
        previewLoading.value = false
    }
}

const handleSubmit = async () => {
    isSubmitting.value = true
    try {
        if (editingId.value) {
            await mailTemplateStore.update(
                editingId.value,
                formModalState.value
            )
            notify('Thành công', 'Đã cập nhật template!', 'success')
        } else {
            await mailTemplateStore.create(formModalState.value)
            notify('Thành công', 'Đã tạo template mới!', 'success')
        }
        showFormModal.value = false
        await getData()
    } catch (e: any) {
        notify('Lỗi', e?.message ?? 'Thao tác thất bại!', 'error')
    } finally {
        isSubmitting.value = false
    }
}

const handleDelete = async () => {
    if (!deleteId.value) return
    loadingDelete.value = true
    try {
        await mailTemplateStore.remove(deleteId.value)
        notify('Thành công', 'Đã xóa mẫu email!', 'success')
        openDelete.value = false
        deleteId.value = null
        await getData()
    } catch (e: any) {
        notify('Lỗi', e?.message ?? 'Xóa thất bại!', 'error')
    } finally {
        loadingDelete.value = false
    }
}

// Provide cho ActionColumn inject
provide('handlePreview', handlePreview)
provide('handleEdit', handleEdit)
provide('onDeleteTemplate', (id: number) => {
    deleteId.value = id
    openDelete.value = true
})

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('contact.mail_template.title'))
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
            @create="openCreateModal"
        />
    </div>
    <div class="box mail-template-view">
        <div class="box-body no_padding">
            <table-data
                class="mail-template-list"
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

    <FormModal
        v-model:open="showFormModal"
        v-model:formState="formModalState"
        :is-submitting="isSubmitting"
        :editing-id="editingId"
        @submit="handleSubmit"
    />

    <PreviewModal
        v-model:open="showPreviewModal"
        :data="previewData"
        :loading="previewLoading"
    />

    <modal-delete
        :open="openDelete"
        :loading="loadingDelete"
        :title="t('contact.mail_template.delete_confirm')"
        @close="((openDelete = false), (deleteId = null))"
        @on-delete="handleDelete"
    />
</template>

<style lang="scss" scoped></style>
