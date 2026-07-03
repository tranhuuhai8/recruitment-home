import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/jobFavorite'
import type { JobFavoriteResult } from '@/interface'

export const useJobFavoriteStore = defineStore('jobFavoriteAdmin', () => {
    const favorites = ref({} as JobFavoriteResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (favorites.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getFavorites = computed(() => favorites.value)

    return {
        getFavorites,
        list,
    }
})
