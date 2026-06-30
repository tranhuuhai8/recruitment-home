import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/company'
import type { Company, CompanyResult } from '@/interface'

export const useCompanyStore = defineStore('company', () => {
    const company = ref({} as Company)
    const companies = ref({} as CompanyResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (companies.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getSelect = async (payload: Record<string, any>) => {
        try {
            const { data } = await API.getSelect(payload)
            return (companies.value = data)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (slug: string) => {
        try {
            const response = await API.detail(slug)
            return (company.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const update = async (payload: Record<string, any>, slug: string) => {
        try {
            return await API.update(payload, slug)
        } catch (error: any) {
            return error
        }
    }

    const getCompany = computed(() => company.value)
    const getCompanies = computed(() => companies.value)

    return {
        getCompany,
        getCompanies,
        list,
        getSelect,
        detail,
        update,
    }
})
