<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useCompanyStore } from '@/stores/admin'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import ImgDefault from '@/assets/imgs/img-default.png'
import CompanyDetailJobs from './components/CompanyDetailJobs.vue'
import CompanyDetailFollowers from './components/CompanyDetailFollowers.vue'
import {
    ArrowLeftOutlined,
    EditOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    CalendarOutlined,
} from '@ant-design/icons-vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const companyStore = useCompanyStore()

const id = Number(route.params.id)
const company = computed(() => companyStore.getCompany)
const companyId = computed(() => company.value?.id ?? 0)
const status = computed(
    () => (company.value as any)?.user?.status ?? (company.value as any)?.status
)
const loading = ref(false)

const backToList = () => router.push({ name: 'admin-companies' })
const goEdit = () =>
    router.push({ name: 'admin-companies-edit', params: { id } })

onMounted(async () => {
    loading.value = true
    await companyStore.detail(id)
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
                    :src="company?.logo ?? ImgDefault"
                    alt=""
                />
                <div class="cd-sender-info">
                    <div class="cd-sender-name">
                        {{ company?.name ?? '—' }}
                    </div>
                    <div class="cd-sender-email">
                        {{ company?.short_name }}
                    </div>
                </div>
                <div class="cd-sender-badges">
                    <StatusColumn :status="status" />
                </div>
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('company.title_page.view') }}
                </div>
                <div class="cd-info-grid">
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <PhoneOutlined />
                            {{ t('company.labels.telephone') }}
                        </div>
                        <div class="cd-info-value">
                            {{ company?.telephone ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <MailOutlined /> {{ t('auth.labels.mail_address') }}
                        </div>
                        <div class="cd-info-value">
                            {{ (company as any)?.user?.mail_address ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <EnvironmentOutlined />
                            {{ t('company.labels.city') }}
                        </div>
                        <div class="cd-info-value">
                            {{ company?.city?.name ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <GlobalOutlined /> {{ t('company.labels.website') }}
                        </div>
                        <div class="cd-info-value">
                            {{ company?.website ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('company.labels.jobs_count') }}
                        </div>
                        <div class="cd-info-value">
                            {{ (company as any)?.jobs_count ?? 0 }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('company.labels.followers_count') }}
                        </div>
                        <div class="cd-info-value">
                            {{ (company as any)?.followers_count ?? 0 }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <CalendarOutlined />
                            {{ t('company.labels.created_at') }}
                        </div>
                        <div class="cd-info-value">
                            {{ company?.created_at ?? '—' }}
                        </div>
                    </div>
                </div>

                <div class="cd-divider" />

                <div class="cd-content-block">
                    <div class="cd-info-label">
                        {{ t('company.labels.address') }}
                    </div>
                    <div class="cd-content-box cd-content-box--inline">
                        {{ company?.address ?? '—' }}
                    </div>
                </div>

                <div class="cd-content-block">
                    <div class="cd-info-label">
                        {{ t('company.labels.description') }}
                    </div>
                    <div class="cd-content-box" v-html="company?.description" />
                </div>
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('company.detail.jobs_title') }}
                </div>
                <CompanyDetailJobs :company-id="companyId" />
            </div>

            <div class="cd-card">
                <div class="cd-card__header">
                    {{ t('company.detail.followers_title') }}
                </div>
                <CompanyDetailFollowers :company-id="companyId" />
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

.cd-sender-avatar {
    width: 100%;
    max-width: 100px;
    height: auto;
    flex-shrink: 0;
    object-fit: cover;
    padding: 5px;
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
    margin-bottom: 16px;

    .cd-info-label {
        margin-bottom: 10px;
    }

    &:last-child {
        margin-bottom: 0;
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

    &--inline {
        padding: 10px 16px;
    }
}
</style>
