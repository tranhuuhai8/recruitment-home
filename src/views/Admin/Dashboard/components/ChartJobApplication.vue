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
import { useI18n } from 'vue3-i18n'
import { computed } from 'vue'
import { lineChartOptions } from '../shared'
import dayjs from '@/libs/utils/dayjs'

const { t } = useI18n()
const props = defineProps(['data'])
Chart.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler
)
const chartData = computed(() => props.data)
const chartOptions = computed(() => {
    const dataValues = props.data.datasets[0]?.data || []
    const maxValue = Math.max(...dataValues, 0)
    const suggestedMax = Math.max(maxValue, 6)

    return {
        ...lineChartOptions,
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
const currentMonthNumber = dayjs().month() + 1 || 12
</script>

<template>
    <div class="box-chart-wrapper">
        <div class="chart-header">
            <div class="chart-title">
                <h3>
                    {{
                        t('dashboard.admin.title.line_chart', [
                            currentMonthNumber,
                        ])
                    }}
                </h3>
            </div>
        </div>
        <div class="box-chart">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
