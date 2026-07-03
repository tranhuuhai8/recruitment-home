<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/admin'
import { notify, STATUS_CODE_SUCCESS } from '@/libs'
import {
    getCityName,
    getNotifyFrequencyText,
    getSalaryText,
} from '@/views/Home/shared'
import { StatusColumnJob, TypeColumnJob } from '@/components/common'
import JobDetailApplications from './components/JobDetailApplications.vue'
import JobDetailFavorites from './components/JobDetailFavorites.vue'
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    EnvironmentOutlined,
    DollarOutlined,
    UserOutlined,
    CalendarOutlined,
} from '@ant-design/icons-vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()

const id = Number(route.params.id)
const job = computed(() => jobStore.getJob)
const jobId = computed(() => job.value?.id ?? 0)
const loading = ref(false)
const loadingDelete = ref(false)
const openDelete = ref(false)

const backToList = () => router.push({ name: 'admin-jobs' })
const goEdit = () => router.push({ name: 'admin-jobs-edit', params: { id } })
const goCompanyDetail = () =>
    router.push({
        name: 'admin-companies-detail',
        params: { id: job.value?.company?.user_id },
    })

const onDelete = async () => {
    try {
        loadingDelete.value = true
        const { status_code, message } = await jobStore.remove(id)
        if (status_code === STATUS_CODE_SUCCESS) {
            notify(message, '', 'success')
            return backToList()
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loadingDelete.value = false
        openDelete.value = false
    }
}

onMounted(async () => {
    loading.value = true
    await jobStore.detail(id)
    loading.value = false
})
</script>

<template>
    <div class="cd-page">
        <div class="cd-action-bar">
            <a-button @click="backToList">
                <template #icon><ArrowLeftOutlined /></template>
                {{ t('back') }}
            </a-button>
            <div class="cd-action-bar__right">
                <a-button type="primary" @click="goEdit">
                    <template #icon><EditOutlined /></template>
                    {{ t('update') }}
                </a-button>
                <a-button danger @click="openDelete = true">
                    <template #icon><DeleteOutlined /></template>
                    {{ t('delete') }}
                </a-button>
            </div>
        </div>

        <a-spin :spinning="loading">
            <div class="cd-sender-card">
                <div class="cd-sender-info">
                    <div class="cd-sender-name">
                        {{ job?.title ?? '—' }}
                    </div>
                    <div
                        class="cd-sender-email cd-sender-company"
                        @click="goCompanyDetail"
                    >
                        {{ job?.company?.name }}
                    </div>
                </div>
                <div class="cd-sender-badges">
                    <TypeColumnJob :type="job?.type" />
                    <StatusColumnJob :status="job?.status" />
                </div>
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('job.title_page.detail') }}
                </div>
                <div class="cd-info-grid">
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <EnvironmentOutlined /> {{ t('job.labels.city') }}
                        </div>
                        <div class="cd-info-value">
                            {{ job?.city ? getCityName(job.city) : '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('job.labels.category') }}
                        </div>
                        <div class="cd-info-value">
                            {{ job?.job_category?.name ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <DollarOutlined /> {{ t('home.job.detail.salary') }}
                        </div>
                        <div class="cd-info-value">
                            {{ getSalaryText(job) }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <UserOutlined />
                            {{ t('job.labels.number_of_recruitment') }}
                        </div>
                        <div class="cd-info-value">
                            {{ job?.number_of_recruitment ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <CalendarOutlined />
                            {{ t('job.labels.start_date') }}
                        </div>
                        <div class="cd-info-value">
                            {{ job?.start_date ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <CalendarOutlined /> {{ t('job.labels.end_date') }}
                        </div>
                        <div class="cd-info-value">
                            {{ job?.end_date ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('job.labels.notify_frequency') }}
                        </div>
                        <div class="cd-info-value">
                            {{ getNotifyFrequencyText(+job?.notify_frequency) }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('job.labels.created_at') }}
                        </div>
                        <div class="cd-info-value">
                            {{ job?.created_at ?? '—' }}
                        </div>
                    </div>
                </div>

                <div class="cd-divider" />

                <div class="cd-content-block">
                    <div class="cd-info-label">
                        {{ t('job.labels.description') }}
                    </div>
                    <div
                        v-if="job?.description"
                        class="cd-content-box"
                        v-html="job?.description"
                    />
                    <div v-else class="cd-content-box">—</div>
                </div>
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('job.detail.applications_title') }}
                </div>
                <JobDetailApplications :job-id="jobId" />
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('job.detail.favorites_title') }}
                </div>
                <JobDetailFavorites :job-id="jobId" />
            </div>
        </a-spin>

        <modal-delete
            :open="openDelete"
            :loading="loadingDelete"
            :title="t('job.confirm_delete_title', [job?.title])"
            @close="openDelete = false"
            @on-delete="onDelete"
        />
    </div>
</template>

<style lang="scss" scoped>
.cd-page {
    padding: 0;
}

.cd-action-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;

    &__right {
        display: flex;
        gap: 10px;
        align-items: center;
    }
}

.cd-sender-card {
    display: flex;
    align-items: center;
    gap: 16px;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 16px;

    :deep(.type-status) {
        margin: 0;
        padding: 4px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        color: #fff;
        background: rgba(255, 255, 255, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.4);
        cursor: default;
        max-width: 120px;

        &:hover {
            opacity: 1;
        }
    }
}

.cd-sender-badges {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
}

.cd-sender-info {
    flex: 1;
    min-width: 0;
}

.cd-sender-name {
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
}

.cd-sender-email {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.82);
    word-break: break-all;
}

.cd-sender-company {
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}

.cd-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);

    &__header {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 18px;
        padding-bottom: 12px;
        border-bottom: 1px solid #f0f0f0;
    }
}

.cd-info-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 18px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
}

.cd-info-item {
    background: #f8fafc;
    border-radius: 8px;
    padding: 12px 14px;
    border: 1px solid #f0f0f0;
}

.cd-info-label {
    font-size: 0.72rem;
    color: #6b7280;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.cd-info-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1f2937;
}

.cd-divider {
    height: 1px;
    background: #f0f0f0;
    margin: 16px 0;
}

.cd-content-block {
    .cd-info-label {
        margin-bottom: 10px;
    }
}

.cd-content-box {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 0.92rem;
    color: #374151;
    line-height: 1.7;
}
</style>
