<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useDashboardStore } from '@/stores/dashboard'
import { LineChartCard, BarChartCard, RangeFilter } from '@/components/common'
import BoxTotal from './components/BoxTotal.vue'
import ChartUserGrowth from './components/ChartUserGrowth.vue'
import ChartJobStatus from './components/ChartJobStatus.vue'
import TopCompaniesTable from './components/TopCompaniesTable.vue'
import TopCitiesList from './components/TopCitiesList.vue'
import NeedsAttentionPanel from './components/NeedsAttentionPanel.vue'
import {
    INITIAL_CHART_DATA,
    INITIAL_TOTALS_DATA,
    INITIAL_NEEDS_ATTENTION,
    DEFAULT_RANGE,
    makeDataTopCategory,
    makeDataJobApplication,
    makeDataUserGrowth,
    makeDataJobStatus,
} from './shared'

const { t } = useI18n()
const dashboardStore = useDashboardStore()
const loading = ref(false)
const range = ref(DEFAULT_RANGE)

type ChartDataShape = { labels: string[]; datasets: Record<string, any>[] }

const totals = reactive({ ...INITIAL_TOTALS_DATA })
const barChartData = ref<ChartDataShape>({ ...INITIAL_CHART_DATA })
const lineChartData = ref<ChartDataShape>({ ...INITIAL_CHART_DATA })
const userGrowthChartData = ref<ChartDataShape>({ ...INITIAL_CHART_DATA })
const jobStatusChartData = ref<ChartDataShape>({ ...INITIAL_CHART_DATA })
const topCompanies = ref<Record<string, any>[]>([])
const topCities = ref<Record<string, any>[]>([])
const needsAttention = reactive({ ...INITIAL_NEEDS_ATTENTION })

const fetchDashboard = async () => {
    loading.value = true
    const {
        totals: totalsData,
        chartTopCategory,
        chartJobApplication,
        chartUserGrowth,
        chartJobStatus,
        topCompanies: topCompaniesData,
        topCities: topCitiesData,
        needsAttention: needsAttentionData,
    } = await dashboardStore.dashboardAdmin({ range: range.value })

    Object.assign(totals, totalsData)
    barChartData.value = makeDataTopCategory(chartTopCategory)
    lineChartData.value = makeDataJobApplication(
        chartJobApplication,
        range.value
    )
    userGrowthChartData.value = makeDataUserGrowth(chartUserGrowth, range.value)
    jobStatusChartData.value = makeDataJobStatus(chartJobStatus)
    topCompanies.value = topCompaniesData
    topCities.value = topCitiesData
    Object.assign(needsAttention, needsAttentionData)
    loading.value = false
}

watch(range, fetchDashboard)
onMounted(fetchDashboard)
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box box-dashboard">
            <BoxTotal :totals="totals" />

            <div class="dashboard-toolbar">
                <RangeFilter v-model="range" />
            </div>

            <div class="box-double-chart">
                <LineChartCard
                    v-if="lineChartData.labels.length"
                    :title="t('dashboard.admin.title.application_chart')"
                    :chart-data="lineChartData"
                    tooltip-suffix=" ứng viên ứng tuyển"
                />
                <BarChartCard
                    v-if="barChartData.labels.length"
                    :title="t('dashboard.admin.title.bar_chart')"
                    :chart-data="barChartData"
                />
            </div>

            <div class="box-double-chart">
                <ChartUserGrowth
                    v-if="userGrowthChartData.labels.length"
                    :data="userGrowthChartData"
                />
                <ChartJobStatus
                    v-if="jobStatusChartData.labels.length"
                    :data="jobStatusChartData"
                />
            </div>

            <div class="box-widget-row">
                <TopCompaniesTable :items="topCompanies as any" />
                <TopCitiesList :items="topCities as any" />
                <NeedsAttentionPanel :data="needsAttention" />
            </div>
        </div>
    </a-spin>
</template>
