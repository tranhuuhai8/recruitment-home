import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/jobApplication'
import type { JobApplicationResult } from '@/interface'

export const useJobApplicationStore = defineStore('jobApplicationAdmin', () => {
    const applications = ref({} as JobApplicationResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (applications.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getApplications = computed(() => applications.value)

    return {
        getApplications,
        list,
    }
})
