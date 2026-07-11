<script setup lang="ts">
import { ref, watch } from 'vue'
import { useApplicationFileStore } from '@/stores/admin'
import { mapKeyToData, INITIAL_QUERY } from '@/libs'
import { fileColumns } from '../shared'

const props = defineProps<{ applicantId: number }>()
const applicationFileStore = useApplicationFileStore()
const loading = ref(false)
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })

const getData = async () => {
    loading.value = true
    await applicationFileStore.list(query.value)
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
        class="applicant-detail-files"
        :loading="loading"
        :columns="fileColumns"
        :data="applicationFileStore.getFiles"
        :show-pagination="true"
        @change-page="handleChangePage"
    />
</template>
