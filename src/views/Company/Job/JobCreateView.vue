<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { notify, QUERY_GET_TREE, STATUS_CODE_SUCCESS } from '@/libs'
import { INITIAL_FORM_JOB, makeDataUpsert } from './shared'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import { useJobStore } from '@/stores/company'
import type { FormDataJob } from '@/interface'
import JobForm from './components/JobForm.vue'

const { t } = useI18n()
const router = useRouter()
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()
const jobStore = useJobStore()
const formState = ref<FormDataJob>({ ...INITIAL_FORM_JOB })
const loading = ref(false)

const onSubmit = async (values: FormDataJob) => {
    try {
        loading.value = true
        const { status_code, message } = await jobStore.create(
            makeDataUpsert(values)
        )

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(message, '', 'success')
            return backToList()
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const backToList = () => router.push({ name: 'company-jobs' })

onMounted(async () => {
    loading.value = true
    await cityStore.list(QUERY_GET_TREE)
    await jobCategoryStore.list(QUERY_GET_TREE)
    loading.value = false
})
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box">
            <h1 class="title-page">{{ t('job.title_page.create') }}</h1>
            <JobForm :data="formState" @submit="onSubmit" />
        </div>
    </a-spin>
</template>
