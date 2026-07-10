<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js'
import { doughnutChartOptions } from './chartOptions'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
    title: string
    chartData: { labels: string[]; datasets: Record<string, any>[] }
}>()

const chartData = computed(() => props.chartData as any)
const chartOptions = computed<ChartOptions<'doughnut'>>(
    () => doughnutChartOptions
)
</script>

<template>
    <div class="box-chart-wrapper doughnut-chart">
        <div class="chart-header">
            <div class="chart-title">
                <h3>{{ title }}</h3>
            </div>
        </div>
        <div class="box-chart" style="height: 360px">
            <Doughnut :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
