<script setup lang="ts">
import { ref, watch } from 'vue'
import { useJobApplicationStore } from '@/stores/admin'
import { mapKeyToData, INITIAL_QUERY } from '@/libs'
import { applicationColumns } from '../shared'

const props = defineProps<{ jobId: number }>()
const jobApplicationStore = useJobApplicationStore()
const loading = ref(false)
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })

const getData = async () => {
    loading.value = true
    await jobApplicationStore.list(query.value)
    loading.value = false
}

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

watch(
    () => props.jobId,
    (jobId) => {
        if (!jobId) return
        query.value = {
            ...INITIAL_QUERY,
            filters: mapKeyToData({ job_id: jobId }),
        }
    },
    { immediate: true }
)

watch(query, () => getData(), { deep: true })
</script>

<template>
    <table-data
        class="job-detail-applications"
        :loading="loading"
        :columns="applicationColumns"
        :data="jobApplicationStore.getApplications"
        :show-pagination="true"
        @change-page="handleChangePage"
    />
</template>
