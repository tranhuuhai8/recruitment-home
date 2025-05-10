import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/jobCategory'
import type { JobCategoryResult, ResponseList } from '@/interface'

export const useJobCategoryStore = defineStore('jobCategory', () => {
    const jobCategory = ref({} as ResponseList)
    const jobCategories = ref({} as JobCategoryResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (jobCategories.value = response.data)
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

    const getJobCategory = computed(() => jobCategory.value)
    const getJobCategories = computed(() => jobCategories.value)

    return {
        getJobCategory,
        getJobCategories,
        list,
        create,
        update,
        remove,
    }
})
