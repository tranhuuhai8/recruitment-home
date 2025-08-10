import { defineStore } from 'pinia'
import * as API from '@/api/home/city'
import { computed, ref } from 'vue'
import type { CityResult } from '@/interface'

export const useCityStore = defineStore('cityHome', () => {
    const cities = ref({} as CityResult)
    const citiesParent = ref({} as CityResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (cities.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const listParent = async (payload: Record<string, any>) => {
        try {
            const response = await API.listParent(payload)
            return (citiesParent.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getCities = computed(() => cities.value)
    const getCitiesParent = computed(() => citiesParent.value)

    return {
        list,
        listParent,
        getCities,
        getCitiesParent,
    }
})
