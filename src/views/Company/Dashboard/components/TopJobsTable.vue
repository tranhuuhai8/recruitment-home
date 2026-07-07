<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { RankedListWidget } from '@/components/common'
import type { TopJobItem } from '@/interface'

const { t } = useI18n()
const router = useRouter()

const props = defineProps<{ items: TopJobItem[] }>()

const listItems = computed(() =>
    props.items.map((item) => ({
        key: item.id,
        label: item.title,
        meta: `${item.applications_count} ${t('company.dashboard.title.applications_unit')} · ${item.accepted_count}/${item.number_of_recruitment} ${t('company.dashboard.title.recruited_unit')}`,
        clickable: true,
    }))
)

const goToJob = (id: string | number) => {
    const job = props.items.find((item) => item.id === id)
    if (job) {
        router.push({ name: 'company-jobs-detail', params: { slug: job.slug } })
    }
}
</script>

<template>
    <RankedListWidget
        :title="t('company.dashboard.title.top_jobs')"
        :items="listItems"
        @item-click="goToJob"
    />
</template>
