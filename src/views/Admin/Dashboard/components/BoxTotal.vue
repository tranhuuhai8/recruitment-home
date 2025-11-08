<script setup lang="ts">
import { IconChart, IconCompany, IconJob, IconUser } from '@/components/icons'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const router = useRouter()
const props = defineProps(['totals'])

const redirectPageCompany = () => router.push({ name: 'admin-companies' })

const redirectPageApplicant = () => router.push({ name: 'admin-applicants' })

const redirectPageJob = () => router.push({ name: 'admin-jobs' })
</script>

<template>
    <div class="box-total">
        <div class="total-item" @click="redirectPageApplicant">
            <div class="total-label">
                {{ t('dashboard.admin.title.applicant') }}
            </div>
            <div class="total-value">
                {{ props.totals.applicant }}
                <IconUser />
            </div>
        </div>
        <div class="total-item" @click="redirectPageCompany">
            <div class="total-label">
                {{ t('dashboard.admin.title.company') }}
            </div>
            <div class="total-value">
                {{ props.totals.company }}
                <IconCompany />
            </div>
        </div>
        <div class="total-item" @click="redirectPageJob">
            <div class="total-label">{{ t('dashboard.admin.title.job') }}</div>
            <div class="total-value">
                {{ props.totals.job }}
                <IconJob />
            </div>
        </div>
        <div class="total-item">
            <div class="total-label">
                {{ t('dashboard.admin.title.rate_application') }}
            </div>
            <div class="total-value">
                <p>
                    {{ props.totals.application_acceptance_rate
                    }}<span class="fz-20">%</span>
                </p>
                <IconChart />
            </div>
        </div>
    </div>
</template>
