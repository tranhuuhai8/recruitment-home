<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { DoughnutChartCard } from '@/components/common'

const { t } = useI18n()

defineProps<{
    data: { labels: string[]; datasets: Record<string, any>[] }
}>()
</script>

<template>
    <DoughnutChartCard
        :title="t('dashboard.admin.title.job_status_chart')"
        :chart-data="data"
    />
</template>
