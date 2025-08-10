import { defineStore } from 'pinia'
import * as API from '@/api/home/jobCategory'
import { computed, ref } from 'vue'
import type { JobCategoryResult } from '@/interface'

export const useJobCategoryStore = defineStore('jobCategoryHome', () => {
    const jobCategories = ref({} as JobCategoryResult)
    const jobCategoriesParent = ref({} as JobCategoryResult)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (jobCategories.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const listParent = async (payload: Record<string, any>) => {
        try {
            const response = await API.listParent(payload)
            return (jobCategoriesParent.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getJobCategories = computed(() => jobCategories.value)
    const getJobCategoriesParent = computed(() => jobCategoriesParent.value)

    return {
        list,
        listParent,
        getJobCategories,
        getJobCategoriesParent,
    }
})
