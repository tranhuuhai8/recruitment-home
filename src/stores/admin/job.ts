import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/job'
import type { Job, JobResult } from '@/interface'

export const useJobStore = defineStore('jobAdmin', () => {
    const job = ref({} as Job)
    const jobs = ref({} as JobResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (jobs.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const remove = async (id: number) => {
        try {
            return await API.remove(id)
        } catch (error: any) {
            return error
        }
    }

    const getJob = computed(() => job.value)
    const getJobs = computed(() => jobs.value)

    return {
        getJob,
        getJobs,
        list,
        remove,
    }
})
