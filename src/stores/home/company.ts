import { defineStore } from 'pinia'
import * as API from '@/api/home/company'
import { computed, ref } from 'vue'
import type { CompanyResult } from '@/interface'

export const useCompanyStore = defineStore('companyHome', () => {
    const companies = ref({} as CompanyResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
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
