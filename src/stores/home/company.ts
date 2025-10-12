import { defineStore } from 'pinia'
import * as API from '@/api/home/company'
import { computed, ref } from 'vue'
import type { Company, CompanyResult } from '@/interface'

export const useCompanyStore = defineStore('companyHome', () => {
    const companies = ref({} as CompanyResult)
    const company = ref({} as Company)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (companies.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const response = await API.detail(id)
            return (company.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getCompanies = computed(() => companies.value)
    const getCompany = computed(() => company.value)

    return {
        list,
        detail,
        getCompany,
        getCompanies,
    }
})
