<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue3-i18n'
import { RankedListWidget } from '@/components/common'
import type { TopCityItem } from '@/interface'

const { t } = useI18n()

const props = defineProps<{ items: TopCityItem[] }>()

const listItems = computed(() =>
    props.items.map((item) => ({
        key: item.name,
        label: item.name,
        meta: `${item.total_jobs} ${t('dashboard.admin.title.jobs_unit')}`,
        clickable: false,
    }))
)
</script>

<template>
    <RankedListWidget
        :title="t('dashboard.admin.title.top_cities')"
        :items="listItems"
    />
</template>
