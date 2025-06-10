import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/applicant'
import type { Applicant, ApplicantResult } from '@/interface'

export const useApplicantStore = defineStore('applicant', () => {
    const applicant = ref({} as Applicant)
    const applicants = ref({} as ApplicantResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (applicants.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const response = await API.detail(id)
            return (applicant.value = response.data)
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

    const getApplicant = computed(() => applicant.value)
    const getApplicants = computed(() => applicants.value)

    return {
        getApplicant,
        getApplicants,
        list,
        detail,
        update,
    }
})
