import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/applicant/favorites'

export const useSavedJobsStore = defineStore('applicantSavedJobs', () => {
    const jobs = ref({} as any)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (jobs.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getJobs = computed(() => jobs.value)

    return { list, getJobs }
})
