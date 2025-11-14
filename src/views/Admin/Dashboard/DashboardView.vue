<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import BoxTotal from './components/BoxTotal.vue'
import ChartJobApplication from './components/ChartJobApplication.vue'
import ChartTopCategory from './components/ChartTopCategory.vue'
import {
    INITIAL_CHART_DATA,
    INITIAL_TOTALS_DATA,
    makeDataTopCategory,
    makeDataJobApplication,
} from './shared'

const dashboardStore = useDashboardStore()
const loading = ref(false)
const totals = reactive(INITIAL_TOTALS_DATA)
const barChartData = reactive({ ...INITIAL_CHART_DATA })
const lineChartData = reactive({ ...INITIAL_CHART_DATA })

onMounted(async () => {
    loading.value = true
    const {
        totals: totalsData,
        chartTopCategory,
        chartJobApplication,
    } = await dashboardStore.dashboardAdmin()
    Object.assign(totals, totalsData)
    Object.assign(barChartData, makeDataTopCategory(chartTopCategory))
    Object.assign(lineChartData, makeDataJobApplication(chartJobApplication))
    loading.value = false
})
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box box-dashboard">
            <BoxTotal :totals="totals" />
            <div class="box-double-chart">
                <ChartJobApplication
                    v-if="lineChartData.labels.length"
                    :data="lineChartData"
                />
                <ChartTopCategory
                    v-if="lineChartData.labels.length"
                    :data="barChartData"
                />
            </div>
        </div>
    </a-spin>
</template>
