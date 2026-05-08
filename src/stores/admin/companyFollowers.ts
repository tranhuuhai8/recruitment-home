import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/admin/companyFollowers'

export const useCompanyFollowersStore = defineStore('adminCompanyFollowers', () => {
    const companies = ref({} as any)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload as any)
            return (companies.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getCompanies = computed(() => companies.value)

    return {
        list,
        getCompanies,
    }
})

