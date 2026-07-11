import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/applicationFile'
import type { ApplicationFileResult } from '@/interface'

export const useApplicationFileStore = defineStore(
    'applicationFileAdmin',
    () => {
        const files = ref({} as ApplicationFileResult)

        const list = async (payload: Record<string, any>) => {
            try {
                const response = await API.list(payload)
                return (files.value = response.data)
            } catch (error: any) {
                return error
            }
        }

        const getFiles = computed(() => files.value)

        return {
            getFiles,
            list,
        }
    }
)
