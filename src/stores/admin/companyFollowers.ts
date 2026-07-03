import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as API from '@/api/admin/companyFollowers'
import type { CompanyFollowerResult } from '@/interface'

export const useCompanyFollowersStore = defineStore(
    'adminCompanyFollowers',
    () => {
        const followers = ref({} as CompanyFollowerResult)

        const list = async (payload: Record<string, any>) => {
            try {
                const response = await API.list(payload as any)
                return (followers.value = response.data)
            } catch (error: any) {
                return error
            }
        }

        const getFollowers = computed(() => followers.value)

        return {
            list,
            getFollowers,
        }
    }
)
