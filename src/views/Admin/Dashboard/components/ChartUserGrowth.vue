<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { LineChartCard } from '@/components/common'

const { t } = useI18n()

defineProps<{
    data: { labels: string[]; datasets: Record<string, any>[] }
}>()
</script>

<template>
    <LineChartCard
        :title="t('dashboard.admin.title.user_growth_chart')"
        :chart-data="data"
        :show-legend="true"
        tooltip-suffix=" người"
    />
</template>
