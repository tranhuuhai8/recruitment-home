import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useQueryStore = defineStore('query', () => {
    const query = ref({} as Record<string, any>)
    const getQuery = computed(() => query.value)

    const setQuery = (queryNew: Record<string, any>) => (query.value = queryNew)

    const clearQuery = () => (query.value = {})

    return {
        getQuery,
        setQuery,
        clearQuery,
    }
})
