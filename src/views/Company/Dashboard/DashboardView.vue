<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { useDashboardStore } from '@/stores/company'
import {
    StatCard,
    LineChartCard,
    DoughnutChartCard,
    RangeFilter,
} from '@/components/common'
import { IconJob, IconChart, IconUser, IconFollow } from '@/components/icons'
import TopJobsTable from './components/TopJobsTable.vue'
import {
    INITIAL_TOTALS_DATA,
    INITIAL_CHART_DATA,
    DEFAULT_RANGE,
    makeDataApplicationByDay,
    makeDataApplicationStatus,
} from './shared'
import type { FormSearchDashboard } from '@/interface'

const { t } = useI18n()
const router = useRouter()
const dashboardStore = useDashboardStore()
const loading = ref(false)
const range = ref(DEFAULT_RANGE)

type ChartDataShape = { labels: string[]; datasets: Record<string, any>[] }

const totals = reactive({ ...INITIAL_TOTALS_DATA })
const lineChartData = ref<ChartDataShape>({ ...INITIAL_CHART_DATA })
const statusChartData = ref<ChartDataShape>({ ...INITIAL_CHART_DATA })
const topJobs = ref<Record<string, any>[]>([])

const goToJobs = () => router.push({ name: 'company-jobs' })
const goToApplications = () => router.push({ name: 'company-applications' })

const fetchDashboard = async () => {
    loading.value = true
    const {
        totals: totalsData,
        chartApplicationByDay,
        chartApplicationStatus,
        topJobs: topJobsData,
    } = await dashboardStore.dashboardCompany({
        range: range.value as FormSearchDashboard['range'],
    })

    Object.assign(totals, totalsData)
    lineChartData.value = makeDataApplicationByDay(
        chartApplicationByDay,
        range.value
    )
    statusChartData.value = makeDataApplicationStatus(chartApplicationStatus)
    topJobs.value = topJobsData
    loading.value = false
}

watch(range, fetchDashboard)
onMounted(fetchDashboard)
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box box-dashboard">
            <div class="box-total">
                <StatCard
                    :label="t('company.dashboard.title.open_jobs')"
                    :value="totals.open_jobs"
                    clickable
                    @click="goToJobs"
                >
                    <template #icon><IconJob /></template>
                </StatCard>
                <StatCard
                    :label="t('company.dashboard.title.total_applications')"
                    :value="totals.total_applications"
                    clickable
                    @click="goToApplications"
                >
                    <template #icon><IconChart /></template>
                </StatCard>
                <StatCard
                    :label="t('company.dashboard.title.pending_applications')"
                    :value="totals.pending_applications"
                    clickable
                    @click="goToApplications"
                >
                    <template #icon><IconUser /></template>
                </StatCard>
                <StatCard
                    :label="t('company.dashboard.title.followers')"
                    :value="totals.followers"
                >
                    <template #icon><IconFollow /></template>
                </StatCard>
            </div>

            <div class="dashboard-toolbar">
                <RangeFilter
                    v-model="range"
                    i18n-prefix="company.dashboard.title.range"
                />
            </div>

            <div class="box-double-chart">
                <LineChartCard
                    v-if="lineChartData.labels.length"
                    :title="t('company.dashboard.title.application_chart')"
                    :chart-data="lineChartData"
                    tooltip-suffix=" hồ sơ"
                />
                <DoughnutChartCard
                    v-if="statusChartData.labels.length"
                    :title="t('company.dashboard.title.status_chart')"
                    :chart-data="statusChartData"
                />
            </div>

            <div class="box-widget-row">
                <TopJobsTable :items="topJobs as any" />
            </div>
        </div>
    </a-spin>
</template>
