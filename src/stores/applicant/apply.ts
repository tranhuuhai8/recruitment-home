import { defineStore } from 'pinia'
import * as API from '@/api/applicant/apply'
import { computed, ref } from 'vue'

export const useApplyStore = defineStore('apply', () => {
    const applies = ref({} as any)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (applies.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getApplies = computed(() => applies.value)

    return {
        applies,
        getApplies,
        list,
    }
})
