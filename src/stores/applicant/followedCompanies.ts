import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/applicant/follows'

export const useFollowedCompaniesStore = defineStore(
    'applicantFollowedCompanies',
    () => {
        const companies = ref({} as any)

        const list = async (payload: Record<string, any>) => {
            try {
                const response = await API.list(payload)
                return (companies.value = response.data)
            } catch (error: any) {
                return error
            }
        }

        const toggleNotify = async (companySlug: string) => {
            const response = await API.toggleNotifyNewJob(companySlug)
            return !!response?.data?.notify_new_job
        }

        const getCompanies = computed(() => companies.value)

        return { list, toggleNotify, getCompanies }
    }
)
