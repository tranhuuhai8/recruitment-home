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
import { useI18n } from 'vue3-i18n'
import { barChartOptions } from '../shared'

const { t } = useI18n()
const props = defineProps(['data'])
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
const chartData = computed(() => props.data)
const chartOptions = computed<ChartOptions<'bar'>>(() => barChartOptions)
</script>

<template>
    <div class="box-chart-wrapper bar-chart">
        <div class="chart-header">
            <div class="chart-title">
                <h3>{{ t('dashboard.admin.title.bar_chart') }}</h3>
            </div>
        </div>
        <div class="box-chart" style="height: 360px">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
