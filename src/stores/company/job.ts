import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/company/job'
import type { Job, JobResult } from '@/interface'

export const useJobStore = defineStore('job', () => {
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

    const detail = async (id: number) => {
        try {
            const response = await API.detail(id)
            return (job.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const update = async (payload: Record<string, any>, id: number) => {
        try {
            return await API.update(payload, id)
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
        detail,
        update,
    }
})
