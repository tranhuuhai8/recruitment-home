<script setup lang="ts">
import { IconChart, IconCompany, IconJob, IconUser } from '@/components/icons'
import { StatCard } from '@/components/common'
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
        <StatCard
            :label="t('dashboard.admin.title.applicant')"
            :value="props.totals.applicant"
            clickable
            @click="redirectPageApplicant"
        >
            <template #icon><IconUser /></template>
        </StatCard>
        <StatCard
            :label="t('dashboard.admin.title.company')"
            :value="props.totals.company"
            clickable
            @click="redirectPageCompany"
        >
            <template #icon><IconCompany /></template>
        </StatCard>
        <StatCard
            :label="t('dashboard.admin.title.job')"
            :value="props.totals.job"
            clickable
            @click="redirectPageJob"
        >
            <template #icon><IconJob /></template>
        </StatCard>
        <StatCard
            :label="t('dashboard.admin.title.total_applications')"
            :value="props.totals.total_applications"
        >
            <template #icon><IconChart /></template>
        </StatCard>
        <StatCard
            :label="t('dashboard.admin.title.rate_application')"
            :value="props.totals.application_acceptance_rate"
            suffix="%"
        >
            <template #icon><IconChart /></template>
        </StatCard>
    </div>
</template>
