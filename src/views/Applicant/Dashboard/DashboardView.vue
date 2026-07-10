<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { useDashboardStore } from '@/stores/applicant'
import {
    StatCard,
    LineChartCard,
    DoughnutChartCard,
    RangeFilter,
} from '@/components/common'
import {
    IconChart,
    IconData,
    IconJob,
    IconFavorite,
    IconFollow,
} from '@/components/icons'
import RecentApplicationsTable from './components/RecentApplicationsTable.vue'
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
const recentApplications = ref<Record<string, any>[]>([])

const goToApplied = () => router.push({ name: 'applicant-applied' })
const goToSavedJobs = () => router.push({ name: 'applicant-saved-jobs' })
const goToFollowedCompanies = () =>
    router.push({ name: 'applicant-followed-companies' })

const fetchDashboard = async () => {
    loading.value = true
    const {
        totals: totalsData,
        chartApplicationByDay,
        chartApplicationStatus,
        recentApplications: recentApplicationsData,
    } = await dashboardStore.dashboardApplicant({
        range: range.value as FormSearchDashboard['range'],
    })

    Object.assign(totals, totalsData)
    lineChartData.value = makeDataApplicationByDay(
        chartApplicationByDay,
        range.value
    )
    statusChartData.value = makeDataApplicationStatus(chartApplicationStatus)
    recentApplications.value = recentApplicationsData
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
                    :label="t('applicant.dashboard.title.total_applications')"
                    :value="totals.total_applications"
                    clickable
                    @click="goToApplied"
                >
                    <template #icon><IconChart /></template>
                </StatCard>
                <StatCard
                    :label="t('applicant.dashboard.title.pending')"
                    :value="totals.pending"
                    clickable
                    @click="goToApplied"
                >
                    <template #icon><IconData /></template>
                </StatCard>
                <StatCard
                    :label="t('applicant.dashboard.title.accepted')"
                    :value="totals.accepted"
                    clickable
                    @click="goToApplied"
                >
                    <template #icon><IconJob /></template>
                </StatCard>
                <StatCard
                    :label="t('applicant.dashboard.title.favorites')"
                    :value="totals.favorites"
                    clickable
                    @click="goToSavedJobs"
                >
                    <template #icon><IconFavorite /></template>
                </StatCard>
                <StatCard
                    :label="t('applicant.dashboard.title.follows')"
                    :value="totals.follows"
                    clickable
                    @click="goToFollowedCompanies"
                >
                    <template #icon><IconFollow /></template>
                </StatCard>
            </div>

            <div class="dashboard-toolbar">
                <RangeFilter
                    v-model="range"
                    i18n-prefix="applicant.dashboard.title.range"
                />
            </div>

            <div class="box-double-chart">
                <LineChartCard
                    v-if="lineChartData.labels.length"
                    :title="t('applicant.dashboard.title.application_chart')"
                    :chart-data="lineChartData"
                    tooltip-suffix=" đơn ứng tuyển"
                />
                <DoughnutChartCard
                    v-if="statusChartData.labels.length"
                    :title="t('applicant.dashboard.title.status_chart')"
                    :chart-data="statusChartData"
                />
            </div>

            <div class="box-widget-row">
                <RecentApplicationsTable :items="recentApplications as any" />
            </div>
        </div>
    </a-spin>
</template>
