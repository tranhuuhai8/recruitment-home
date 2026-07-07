<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js'
import { barChartOptions } from './chartOptions'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps<{
    title: string
    chartData: { labels: string[]; datasets: Record<string, any>[] }
}>()

const chartData = computed(() => props.chartData as any)
const chartOptions = computed<ChartOptions<'bar'>>(() => barChartOptions)
</script>

<template>
    <div class="box-chart-wrapper bar-chart">
        <div class="chart-header">
            <div class="chart-title">
                <h3>{{ title }}</h3>
            </div>
        </div>
        <div class="box-chart" style="height: 360px">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
