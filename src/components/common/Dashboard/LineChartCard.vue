<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
    Chart,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { computed } from 'vue'
import { lineChartOptions } from './chartOptions'

Chart.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler
)

const props = withDefaults(
    defineProps<{
        title: string
        chartData: { labels: string[]; datasets: Record<string, any>[] }
        tooltipSuffix?: string
        showLegend?: boolean
    }>(),
    {
        tooltipSuffix: '',
        showLegend: false,
    }
)

const chartData = computed(() => props.chartData as any)
const chartOptions = computed(() => {
    const allValues = props.chartData.datasets.flatMap(
        (dataset) => dataset.data || []
    )
    const maxValue = Math.max(...allValues, 0)
    const suggestedMax = Math.max(maxValue, 6)

    return {
        ...lineChartOptions,
        plugins: {
            ...lineChartOptions.plugins,
            legend: { display: props.showLegend },
            tooltip: {
                ...lineChartOptions.plugins.tooltip,
                callbacks: {
                    title: (context: Record<string, any>) => context[0].label,
                    label: (context: Record<string, any>) =>
                        `${context.dataset.label ? context.dataset.label + ': ' : ''}${context.parsed.y}${props.tooltipSuffix}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax,
                ticks: {
                    stepSize: 1,
                    padding: 10,
                    callback: (value: Record<string, any>) =>
                        Number.isInteger(value) ? value : null,
                },
                border: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    autoSkip: true,
                    maxTicksLimit: 8,
                },
                grid: {
                    display: false,
                },
            },
        },
    }
}) as any
</script>

<template>
    <div class="box-chart-wrapper">
        <div class="chart-header">
            <div class="chart-title">
                <h3>{{ title }}</h3>
            </div>
        </div>
        <div class="box-chart">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
