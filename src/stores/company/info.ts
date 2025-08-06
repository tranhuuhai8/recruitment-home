import { defineStore } from 'pinia'
import * as API from '@/api/company/info'
import type { FormDataCompany } from '@/interface'

export const useInfoStore = defineStore('company', () => {
    const update = async (payload: FormDataCompany) => {
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
