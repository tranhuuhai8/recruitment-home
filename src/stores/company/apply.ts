import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/company/apply'
import type {
    FormDataJob,
    JobApplication,
    JobApplicationResult,
} from '@/interface'

export const useJobApplyStore = defineStore('jobApply', () => {
    const jobApplication = ref({} as JobApplication)
    const jobApplications = ref({} as JobApplicationResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (jobApplications.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const update = async (payload: FormDataJob, id: number) => {
        try {
            return await API.update(payload, id)
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

    const getJobApplication = computed(() => jobApplication.value)
    const getJobApplications = computed(() => jobApplications.value)

    return {
        getJobApplication,
        getJobApplications,
        list,
        update,
        remove,
    }
})
