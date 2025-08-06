import { defineStore } from 'pinia'
import * as API from '@/api/home/city'
import { computed, ref } from 'vue'
import type { CityResult } from '@/interface'

export const useCityStore = defineStore('city', () => {
    const cities = ref({} as CityResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (cities.value = response.data)
        } catch (error: any) {
            return error
        }
    }
    const getCities = computed(() => cities.value)

    return {
        list,
        getCities,
    }
})
