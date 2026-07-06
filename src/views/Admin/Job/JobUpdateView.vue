<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { notify, QUERY_GET_TREE, STATUS_CODE_SUCCESS } from '@/libs'
import { INITIAL_FORM_JOB, makeDataUpsert, mapDataForm } from './shared'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import { useJobStore } from '@/stores/admin'
import type { FormDataJob } from '@/interface'
import JobForm from './components/JobForm.vue'

const { t } = useI18n()
const router = useRouter()
const {
    params: { id },
} = useRoute()
const jobId = Number(id)
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()
const jobStore = useJobStore()
const formState = ref<FormDataJob>({ ...INITIAL_FORM_JOB })
const loading = ref(false)
const loadingDelete = ref(false)
const openDelete = ref(false)

const onUpdate = async (values: FormDataJob) => {
    try {
        loading.value = true
        const response = await jobStore.update(makeDataUpsert(values), jobId)

        responseNotify(response)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const onDelete = async () => {
    try {
        loadingDelete.value = true
        const response = await jobStore.remove(jobId)
        responseNotify(response)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const responseNotify = ({ status_code, message }: Record<string, any>) => {
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(message, '', 'success')
        return backToList()
    }
    notify(message, '', 'error')
}

const getData = async () => {
    await jobStore.detail(jobId)
    Object.assign(formState.value, mapDataForm(jobStore.getJob))
}

const backToList = () => router.push({ name: 'admin-jobs' })

onMounted(async () => {
    loading.value = true
    await getData()
    await cityStore.list(QUERY_GET_TREE)
    await jobCategoryStore.list(QUERY_GET_TREE)
    loading.value = false
})
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box">
            <h1 class="title-page">{{ t('job.title_page.edit') }}</h1>
            <JobForm
                :data="formState"
                :id="jobId"
                @submit="onUpdate"
                @delete="openDelete = true"
            />
        </div>
        <modal-delete
            :open="openDelete"
            :loading="loadingDelete"
            :title="t('job.confirm_delete_id', [jobId])"
            @close="openDelete = false"
            @on-delete="onDelete"
        />
    </a-spin>
</template>
