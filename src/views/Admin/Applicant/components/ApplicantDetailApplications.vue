<script setup lang="ts">
import { ref, watch } from 'vue'
import { useJobApplicationStore } from '@/stores/admin'
import { mapKeyToData, INITIAL_QUERY } from '@/libs'
import { appliedJobColumns } from '../shared'

const props = defineProps<{ applicantId: number }>()
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
    () => props.applicantId,
    (applicantId) => {
        if (!applicantId) return
        query.value = {
            ...INITIAL_QUERY,
            filters: mapKeyToData({ applicant_id: applicantId }),
        }
    },
    { immediate: true }
)

watch(query, () => getData(), { deep: true })
</script>

<template>
    <table-data
        class="applicant-detail-applications"
        :loading="loading"
        :columns="appliedJobColumns"
        :data="jobApplicationStore.getApplications"
        :show-pagination="true"
        @change-page="handleChangePage"
    />
</template>
