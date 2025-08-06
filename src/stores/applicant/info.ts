import { defineStore } from 'pinia'
import * as API from '@/api/applicant/info'
import type { FormDataApplicant } from '@/interface'

export const useInfoStore = defineStore('applicant', () => {
    const update = async (payload: FormDataApplicant) => {
        try {
            return await API.update(payload)
        } catch (error: any) {
            return error
        }
    }

    return {
        update,
    }
})
