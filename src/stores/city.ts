import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/city'
import type { CityResult, ResponseList } from '@/interface'

export const useCityStore = defineStore('city', () => {
    const city = ref({} as ResponseList)
    const cities = ref({} as CityResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (cities.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const create = async (payload: Record<string, any>) => {
        try {
            return await API.create(payload)
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

    const remove = async (id: number) => {
        try {
            return await API.remove(id)
        } catch (error: any) {
            return error
        }
    }

    const getCity = computed(() => city.value)
    const getCities = computed(() => cities.value)

    return {
        getCity,
        getCities,
        list,
        create,
        update,
        remove,
    }
})
