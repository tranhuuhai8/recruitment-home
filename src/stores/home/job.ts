import { defineStore } from 'pinia'
import * as API from '@/api/home/job'
import { computed, ref } from 'vue'
import type { Job, JobApplication, JobResult } from '@/interface'

export const useJobStore = defineStore('jobHome', () => {
    const jobs = ref({} as JobResult)
    const job = ref({} as Job)

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

    const apply = async (payload: JobApplication) => {
        try {
            return await API.apply(payload)
        } catch (error: any) {
            return error
        }
    }

    const getCv = () => API.getCv()

    const getJob = computed(() => job.value)
    const getJobs = computed(() => jobs.value)

    return {
        list,
        detail,
        apply,
        getCv,
        getJob,
        getJobs,
    }
})
