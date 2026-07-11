<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useApplicantStore } from '@/stores/admin'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import ImgDefault from '@/assets/imgs/img-default.png'
import { GENDER_OPTIONS_SEARCH } from '@/libs'
import ApplicantDetailApplications from './components/ApplicantDetailApplications.vue'
import ApplicantDetailFavorites from './components/ApplicantDetailFavorites.vue'
import ApplicantDetailFiles from './components/ApplicantDetailFiles.vue'
import ApplicantDetailCompanies from './components/ApplicantDetailCompanies.vue'
import {
    ArrowLeftOutlined,
    EditOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
} from '@ant-design/icons-vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const applicantStore = useApplicantStore()

const id = route.params.id as string
const applicant = computed(() => applicantStore.getApplicant)
const applicantId = computed(() => (applicant.value as any)?.id ?? 0)
const status = computed(
    () =>
        (applicant.value as any)?.user?.status ??
        (applicant.value as any)?.status
)
const loading = ref(false)

const backToList = () => router.push({ name: 'admin-applicants' })
const goEdit = () =>
    router.push({ name: 'admin-applicants-edit', params: { id } })

onMounted(async () => {
    loading.value = true
    await applicantStore.detail(+id)
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
            </div>
        </div>

        <a-spin :spinning="loading">
            <div class="cd-sender-card">
                <img
                    class="cd-sender-avatar cd-sender-avatar--img"
                    :src="applicant?.avatar ?? ImgDefault"
                    alt=""
                />
                <div class="cd-sender-info">
                    <div class="cd-sender-name">
                        {{ applicant?.name ?? '—' }}
                    </div>
                    <div class="cd-sender-email">
                        {{ (applicant as any)?.user?.mail_address }}
                    </div>
                </div>
                <div class="cd-sender-badges">
                    <StatusColumn :status="status" />
                </div>
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('applicant.title_page.view') }}
                </div>
                <div class="cd-info-grid">
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <PhoneOutlined />
                            {{ t('applicant.labels.telephone') }}
                        </div>
                        <div class="cd-info-value">
                            {{ applicant?.telephone ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <MailOutlined /> {{ t('auth.labels.mail_address') }}
                        </div>
                        <div class="cd-info-value">
                            {{ (applicant as any)?.user?.mail_address ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('applicant.labels.gender') }}
                        </div>
                        <div class="cd-info-value">
                            {{
                                GENDER_OPTIONS_SEARCH[+applicant?.gender] ?? '—'
                            }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <CalendarOutlined />
                            {{ t('applicant.labels.birthday') }}
                        </div>
                        <div class="cd-info-value">
                            {{ applicant?.birthday ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <EnvironmentOutlined />
                            {{ t('applicant.labels.address') }}
                        </div>
                        <div class="cd-info-value">
                            {{ applicant?.address ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('job.labels.created_at') }}
                        </div>
                        <div class="cd-info-value">
                            {{ applicant?.created_at ?? '—' }}
                        </div>
                    </div>
                </div>

                <div class="cd-divider" />

                <div class="cd-content-block">
                    <div class="cd-info-label">
                        {{ t('applicant.labels.description') }}
                    </div>
                    <div class="cd-content-box">
                        {{ applicant?.description ?? '—' }}
                    </div>
                </div>
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('applicant.apply.title_page') }}
                </div>
                <ApplicantDetailApplications :applicant-id="applicantId" />
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('applicant.saved_jobs.title_page') }}
                </div>
                <ApplicantDetailFavorites :applicant-id="applicantId" />
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('applicant.file.title_page') }}
                </div>
                <ApplicantDetailFiles :applicant-id="applicantId" />
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('applicant.followed_companies.title_page') }}
                </div>
                <ApplicantDetailCompanies :applicant-id="applicantId" />
            </div>
        </a-spin>
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

.cd-sender-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.35);
    object-fit: cover;
    background: #fff;
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
