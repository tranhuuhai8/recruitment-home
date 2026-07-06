<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCompanyJobsStore } from '@/stores/admin'
import { mapKeyToData, INITIAL_QUERY } from '@/libs'
import { jobColumns } from '../shared'

const props = defineProps<{ companyId: number }>()
const companyJobsStore = useCompanyJobsStore()
const loading = ref(false)
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })

const getData = async () => {
    loading.value = true
    await companyJobsStore.list(query.value)
    loading.value = false
}

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

watch(
    () => props.companyId,
    (companyId) => {
        if (!companyId) return
        query.value = {
            ...INITIAL_QUERY,
            filters: mapKeyToData({ company_id: companyId }),
        }
    },
    { immediate: true }
)

watch(query, () => getData(), { deep: true })
</script>

<template>
    <table-data
        class="company-detail-jobs"
        :loading="loading"
        :columns="jobColumns"
        :data="companyJobsStore.getJobs"
        :show-pagination="true"
        @change-page="handleChangePage"
    />
</template>
