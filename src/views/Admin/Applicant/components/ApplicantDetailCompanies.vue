<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFollowedCompaniesStore } from '@/stores/admin'
import { mapKeyToData, INITIAL_QUERY } from '@/libs'
import { followedCompanyColumns } from '../shared'

const props = defineProps<{ applicantId: number }>()
const followedCompaniesStore = useFollowedCompaniesStore()
const loading = ref(false)
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })

const getData = async () => {
    loading.value = true
    await followedCompaniesStore.list(query.value)
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
        class="applicant-detail-companies"
        :loading="loading"
        :columns="followedCompanyColumns"
        :data="followedCompaniesStore.getFollowedCompanies"
        :show-pagination="true"
        @change-page="handleChangePage"
    />
</template>
