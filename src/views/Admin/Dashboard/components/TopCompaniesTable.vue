<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { RankedListWidget } from '@/components/common'
import type { TopCompanyItem } from '@/interface'

const { t } = useI18n()
const router = useRouter()

const props = defineProps<{ items: TopCompanyItem[] }>()

const listItems = computed(() =>
    props.items.map((item: Record<string, any>) => ({
        key: item.user_id,
        label: item.name,
        meta: `${item.jobs_count} ${t('dashboard.admin.title.jobs_unit')}`,
        clickable: true,
    }))
)

const goToCompany = (id: string | number) =>
    router.push({ name: 'admin-companies-detail', params: { id } })
</script>

<template>
    <RankedListWidget
        :title="t('dashboard.admin.title.top_companies')"
        :items="listItems"
        @item-click="goToCompany"
    />
</template>
