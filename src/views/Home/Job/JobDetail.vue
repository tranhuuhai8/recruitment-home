<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { onMounted, reactive, ref, watch } from 'vue'
import {
    getCityName,
    getCompanyName,
    getSalaryText,
    INITIAL_JOB_INFO_NULL,
} from '../shared'
import type { Job } from '@/interface'
import { useJobStore } from '@/stores/home'
import { STATUS_CODE_SUCCESS } from '@/libs'
import { BoxContactCompany } from '../components'
import { FieldTimeOutlined } from '@ant-design/icons-vue'
import { IconLocation, IconMoney, IconUser } from '@/components/icons'

const { t } = useI18n()
const {
    params: { id },
} = useRoute()
const router = useRouter()
const currentUrl = window.location.href
const jobStore = useJobStore()
const loading = ref(false)
const job = reactive<Job>(INITIAL_JOB_INFO_NULL)

const detailCompany = (id: number | null) =>
    router.push({ name: 'company-home-detail', params: { id } })

const handleApplyNow = (id: number) => {
    console.log('id :>> ', id)
}

const handleSaveJob = (id: number) => {
    console.log('id :>> ', id)
}

onMounted(async () => {
    loading.value = true
    const data = await jobStore.detail(+id)
    if (!data || (!data.id && data.status_code !== STATUS_CODE_SUCCESS)) {
        return router.push({ name: 'not-found' })
    }
    Object.assign(job, data)
    loading.value = false
})

watch(
    () => job.title,
    (newName) => {
        if (!newName) return
        useHead({
            title: job.title,
            meta: [
                { property: 'og:title', content: job.title },
                { property: 'og:description', content: job.description },
                { property: 'og:image', content: job.banner },
                { property: 'og:url', content: currentUrl },
                { property: 'og:type', content: 'website' },
            ],
        })
    },
    { immediate: false }
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
                <div class="box-header-btn">
                    <a-button class="btn-apply" @click="handleApplyNow(job.id)">
                        {{ t('home.job.detail.btn.apply') }}
                    </a-button>
                    <a-button class="btn-save" @click="handleSaveJob(job.id)">
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
                                    @click="detailCompany(job.company?.id)"
                                >
                                    {{ t('detail') }}
                                </a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-card>
</template>
