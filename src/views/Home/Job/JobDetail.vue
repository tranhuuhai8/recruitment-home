<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useHead } from '@vueuse/head'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, computed } from 'vue'
import {
    FieldTimeOutlined,
    FilePdfOutlined,
    EyeOutlined,
} from '@ant-design/icons-vue'
import {
    applyJobRules,
    getCityName,
    getCompanyName,
    getInitValueFormApply,
    getSalaryText,
    INITIAL_JOB_INFO_NULL,
} from '../shared'
import { useJobStore } from '@/stores/home'
import { useAuthStore } from '@/stores'
import { BoxContactCompany } from '../components'
import { IconLocation, IconMoney, IconUser } from '@/components/icons'
import type { ApplicationFile, Job, JobApplication } from '@/interface'
import {
    getUserInformation,
    notify,
    ROLE_APPLICANT,
    ROLE_COMPANY,
    STATUS_CODE_SUCCESS,
    trim,
} from '@/libs'

const { t } = useI18n()
const {
    params: { id },
} = useRoute()
const router = useRouter()
const currentUrl = window.location.href
const jobStore = useJobStore()
const authStore = useAuthStore()
const formRef = ref()
const loading = ref(false)
const openModal = ref(false)
const loadingModal = ref(false)
const applicationFiles = ref<ApplicationFile[]>([])
const job = reactive<Job>(INITIAL_JOB_INFO_NULL)
const formState = reactive<JobApplication>(getInitValueFormApply(+id))

const onApply = async () => {
    try {
        loadingModal.value = true
        const { status_code, message } = await jobStore.apply(formState)
        if (status_code === STATUS_CODE_SUCCESS) {
            notify(message, '', 'success')
            return handleCancel()
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loadingModal.value = false
    }
}

const handleSaveJob = () => {
    console.log('id :>> ', id)
}

const handleManagement = () =>
    router.push({ name: 'company-jobs-detail', params: { id } })

const handlePreview = (url: string) => url && window.open(url, '_blank')

const handleApply = async () => {
    openModal.value = true
    if (
        authStore.isAuthenticated &&
        getUserInformation()?.role === ROLE_APPLICANT
    ) {
        const { data } = await jobStore.getCv()
        Object.assign(applicationFiles.value, data)
    }
}

const handleCancel = () => {
    Object.assign(formState, getInitValueFormApply(+id))
    formRef.value.resetFields()
    openModal.value = false
}

const redirectToDetailCompany = (id: number | null) =>
    router.push({ name: 'company-home-detail', params: { id } })

const redirectToManagementFile = () =>
    router.push({ name: 'applicant-file-upload' })

onMounted(async () => {
    loading.value = true
    const data = await jobStore.detail(+id)
    if (!data || (!data.id && data.status_code !== STATUS_CODE_SUCCESS)) {
        return router.push({ name: 'not-found' })
    }
    Object.assign(job, data)
    loading.value = false
})

useHead(
    computed(() => ({
        title: job.title,
        meta: [
            { property: 'og:title', content: job.title },
            { property: 'og:description', content: job.description },
            { property: 'og:image', content: job.banner },
            { property: 'og:url', content: currentUrl },
            { property: 'og:type', content: 'website' },
        ],
    }))
)
</script>

<template>
    <a-card :loading="loading" class="card-loading-page">
        <div class="container page-detail job-detail" v-if="job.id">
            <div class="box-header">
                <div class="box-header-info">
                    <h2 class="box-header-title">
                        {{ job.title }}
                    </h2>
                    <div class="box-header-content">
                        <div class="info-meta" v-if="job.city">
                            <IconLocation />
                            <p>
                                <b>{{ t('home.job.detail.address') }}</b>
                                <br />{{ getCityName(job?.city) }}
                            </p>
                        </div>
                        <div class="info-meta">
                            <IconUser />
                            <p>
                                <b>{{
                                    t('home.job.detail.number_of_recruitment')
                                }}</b>
                                <br />{{ job.number_of_recruitment }}
                            </p>
                        </div>
                        <div class="info-meta">
                            <IconMoney />
                            <p>
                                <b>{{ t('home.job.detail.salary') }}</b>
                                <br />{{ getSalaryText(job) }}
                            </p>
                        </div>
                        <div class="info-meta">
                            <FieldTimeOutlined />
                            <p>
                                <b>{{ t('home.job.detail.deadline') }}</b>
                                <br />{{ job.end_date }}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="box-header-btn"
                    v-if="
                        getUserInformation()?.role === ROLE_COMPANY &&
                        job.company_id === getUserInformation()?.company?.id
                    "
                >
                    <a-button class="btn-apply" @click="handleManagement">
                        {{ t('management') }}
                    </a-button>
                </div>
                <div
                    class="box-header-btn"
                    v-if="
                        getUserInformation()?.role === ROLE_APPLICANT ||
                        !authStore.isAuthenticated
                    "
                >
                    <a-button class="btn-apply" @click="handleApply">
                        {{ t('home.job.detail.btn.apply') }}
                    </a-button>
                    <a-button class="btn-save" @click="handleSaveJob">
                        {{ t('save') }}
                    </a-button>
                </div>
            </div>
            <div class="box-body">
                <div class="left">
                    <div class="box-body-item">
                        <h2 class="title">
                            {{ t('home.job.detail.title.description') }}
                        </h2>
                        <div class="content" v-html="job.description" />
                    </div>
                </div>
                <div class="right">
                    <div class="box-body-item contact-company">
                        <h2 class="title">
                            {{ t('home.job.detail.title.company') }}
                        </h2>
                        <div v-if="job.company" class="content info-company">
                            <div class="contact-item">
                                <h3>
                                    {{ getCompanyName(job.company) }}
                                </h3>
                            </div>
                            <BoxContactCompany
                                v-if="job.company"
                                :company="job.company"
                            />
                            <div class="contact-item flex-center">
                                <a-button
                                    @click="
                                        redirectToDetailCompany(job.company?.id)
                                    "
                                >
                                    {{ t('detail') }}
                                </a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal-vue
            centered
            wrapClassName="modal-apply-job"
            :open="openModal"
            :title="t('home.job.modal.title') + job.title"
            :hasFooter="false"
            :closable="false"
        >
            <template #body>
                <a-form
                    ref="formRef"
                    class="form-city"
                    layout="vertical"
                    :model="formState"
                    :rules="applyJobRules"
                    @finish="onApply"
                >
                    <a-form-item
                        v-if="
                            authStore.isAuthenticated && applicationFiles.length
                        "
                        name="source_cv"
                    >
                        <a-radio-group v-model:value="formState.source_cv">
                            <a-radio value="library">
                                {{ t('home.job.modal.upload.radio.library') }}
                                <span
                                    class="text-link"
                                    @click="redirectToManagementFile"
                                >
                                    (Quản lý CV)
                                </span>
                            </a-radio>
                            <a-radio value="upload">
                                {{ t('home.job.modal.upload.radio.upload') }}
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <div v-if="formState.source_cv == 'upload'">
                        <a-form-item name="file_name">
                            <UploadPdf
                                v-model:name="formState.file_name"
                                v-model:url="formState.file_path"
                                v-model:size="formState.file_size"
                            />
                        </a-form-item>
                    </div>

                    <a-form-item
                        v-else
                        class="list-file-uploaded"
                        name="application_file_id"
                    >
                        <a-radio-group
                            v-model:value="formState.application_file_id"
                        >
                            <a-radio
                                v-for="file in applicationFiles"
                                :key="file.id"
                                :value="file.id"
                                :class="`uploaded-box uploaded-item ${formState.application_file_id === file.id ? 'active' : ''}`"
                            >
                                <div class="uploaded-info">
                                    <FilePdfOutlined />
                                    <span class="file-name">
                                        {{ file.file_name }}
                                    </span>
                                </div>
                                <div
                                    class="uploaded-actions"
                                    @click="handlePreview(file.file_path)"
                                >
                                    <EyeOutlined />
                                </div>
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <div
                        v-if="
                            !authStore.isAuthenticated ||
                            getUserInformation()?.role !== ROLE_APPLICANT
                        "
                    >
                        <a-form-item
                            name="guest_name"
                            :label="t('home.job.modal.labels.guest_name')"
                        >
                            <a-input
                                v-model:value="formState.guest_name"
                                :placeholder="
                                    t('home.job.modal.labels.guest_name')
                                "
                                @blur="trim('guest_name', formState)"
                            />
                        </a-form-item>

                        <a-row class="row-guest-info">
                            <a-col>
                                <a-form-item
                                    name="guest_email"
                                    :label="
                                        t('home.job.modal.labels.guest_email')
                                    "
                                >
                                    <a-input
                                        v-model:value="formState.guest_email"
                                        :placeholder="
                                            t(
                                                'home.job.modal.labels.guest_email'
                                            )
                                        "
                                        @blur="trim('guest_email', formState)"
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col>
                                <a-form-item
                                    name="guest_telephone"
                                    :label="
                                        t(
                                            'home.job.modal.labels.guest_telephone'
                                        )
                                    "
                                >
                                    <a-input
                                        v-model:value="
                                            formState.guest_telephone
                                        "
                                        :placeholder="
                                            t(
                                                'home.job.modal.labels.guest_telephone'
                                            )
                                        "
                                        @blur="
                                            trim('guest_telephone', formState)
                                        "
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </div>

                    <a-form-item
                        name="cover_letter"
                        :label="t('home.job.modal.labels.cover_letter')"
                    >
                        <a-textarea
                            v-model:value="formState.cover_letter"
                            :placeholder="
                                t('home.job.modal.labels.cover_letter')
                            "
                            :autoSize="{ minRows: 4, maxRows: 8 }"
                            @blur="trim('cover_letter', formState)"
                        />
                    </a-form-item>

                    <a-space class="space-group-btn justify-end">
                        <a-col>
                            <a-button
                                type="primary"
                                html-type="submit"
                                class="mr-10"
                                :loading="loadingModal"
                            >
                                {{ t('home.job.detail.btn.apply') }}
                            </a-button>
                            <a-button type="link" @click="handleCancel">
                                {{ t('cancel') }}
                            </a-button>
                        </a-col>
                    </a-space>
                </a-form>
            </template>
        </modal-vue>
    </a-card>
</template>
