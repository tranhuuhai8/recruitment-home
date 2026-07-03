<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCompanyFollowersStore } from '@/stores/admin'
import { mapKeyToData, INITIAL_QUERY } from '@/libs'
import { followerColumns } from '../shared'

const props = defineProps<{ companyId: number }>()
const companyFollowersStore = useCompanyFollowersStore()
const loading = ref(false)
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })

const getData = async () => {
    loading.value = true
    await companyFollowersStore.list(query.value)
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
        class="company-detail-followers"
        :loading="loading"
        :columns="followerColumns"
        :data="companyFollowersStore.getFollowers"
        :show-pagination="true"
        @change-page="handleChangePage"
    />
</template>
