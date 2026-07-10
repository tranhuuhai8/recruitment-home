import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/admin/followedCompanies'
import type { CompanyFollowerResult } from '@/interface'

export const useFollowedCompaniesStore = defineStore(
    'adminFollowedCompanies',
    () => {
        const followedCompanies = ref({} as CompanyFollowerResult)

        const list = async (payload: Record<string, any>) => {
            try {
                const response = await API.list(payload as any)
                return (followedCompanies.value = response.data)
            } catch (error: any) {
                return error
            }
        }

        const getFollowedCompanies = computed(() => followedCompanies.value)

        return {
            list,
            getFollowedCompanies,
        }
    }
)
