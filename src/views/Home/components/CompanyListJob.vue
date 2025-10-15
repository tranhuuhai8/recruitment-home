<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useJobStore } from '@/stores/home'
import type { FormSearchJob } from '@/interface'
import { INITIAL_QUERY, mapKeyToData } from '@/libs'
import { getQuerySearchJob, INITIAL_FORM_SEARCH_JOB } from '../shared'
import JobList from '../Job/JobList.vue'
import CompanySearchJob from './CompanySearchJob.vue'
import { PaginationHome } from '@/components/common'

const jobStore = useJobStore()
const loading = ref(false)
const props = defineProps<{ id: number }>()
const query = ref<Record<string, any>>({
    ...INITIAL_QUERY,
    filters: mapKeyToData({ company_id: props.id }),
})
const formState = ref<FormSearchJob>({ ...INITIAL_FORM_SEARCH_JOB })

const getData = async () => {
    loading.value = true
    await jobStore.list(query.value)
    loading.value = false
}

const handleSearch = () =>
    (query.value = getQuerySearchJob(query.value, formState.value, props.id))

const handleReset = () =>
    (query.value = {
        ...INITIAL_QUERY,
        filters: mapKeyToData({ company_id: props.id }),
    })

const onChangePage = async (page: number) =>
    (query.value = { ...query.value, page })

watch(query, getData)
onMounted(getData)
</script>

<template>
    <a-spin :spinning="loading">
        <CompanySearchJob
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleReset"
        />

        <div class="job-list">
            <JobList />
        </div>

        <PaginationHome
            :data="jobStore.getJobs"
            @changePage="onChangePage"
            v-if="
                jobStore.getJobs?.total &&
                jobStore.getJobs.total > jobStore.getJobs.per_page
            "
        />
    </a-spin>
</template>
