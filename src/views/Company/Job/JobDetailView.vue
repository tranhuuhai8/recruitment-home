<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/company'
import { notify, STATUS_CODE_SUCCESS } from '@/libs'
import BoxDetail from './components/BoxDetail.vue'

const { t } = useI18n()
const {
    params: { slug },
} = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const loading = ref(false)
const loadingDelete = ref(false)
const openDelete = ref(false)
const job = computed(() => jobStore.getJob)

const onDelete = async () => {
    try {
        loadingDelete.value = true
        const { status_code, message } = await jobStore.remove(slug as string)
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

const handleUpdate = () =>
    router.push({ name: 'company-jobs-edit', params: { slug } })

onMounted(async () => {
    loading.value = true
    await jobStore.detail(slug as string)
    loading.value = false
})
</script>

<template>
    <a-card :loading="loading">
        <div class="page-detail job-detail management">
            <BoxDetail :job="job" />
            <div class="box-footer">
                <a-space class="space-group-btn">
                    <a-button type="primary" @click="handleUpdate">
                        {{ t('update') }}
                    </a-button>
                    <a-button class="btn-delete" @click="openDelete = true">
                        {{ t('delete') }}
                    </a-button>
                    <a-button type="link" @click="backToList">
                        {{ t('back') }}
                    </a-button>
                </a-space>
            </div>
        </div>
    </a-card>
    <modal-delete
        :open="openDelete"
        class-name="delete-job"
        :loading="loadingDelete"
        :title="t('job.confirm_delete_title', [job?.title])"
        @close="openDelete = false"
        @on-delete="onDelete"
    />
</template>
