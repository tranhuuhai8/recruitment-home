import { defineStore } from 'pinia'
import * as API from '@/api/home/job'
import { computed, ref } from 'vue'
import type { JobResult } from '@/interface'

export const useJobStore = defineStore('jobHome', () => {
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
