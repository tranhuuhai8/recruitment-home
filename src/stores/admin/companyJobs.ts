import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/admin/job'
import type { JobResult } from '@/interface'

export const useCompanyJobsStore = defineStore('adminCompanyJobs', () => {
    const jobs = ref({} as JobResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (jobs.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getJobs = computed(() => jobs.value)

    return {
        list,
        getJobs,
    }
})
