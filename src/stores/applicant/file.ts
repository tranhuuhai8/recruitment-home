import { defineStore } from 'pinia'
import * as API from '@/api/applicant/file'
import { computed, ref } from 'vue'

export const useFileUploadStore = defineStore('fileUpload', () => {
    const files = ref({} as any)

    const list = async () => {
        try {
            const response = await API.list()
            return (files.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const upsert = async (payload: Record<string, any>[]) => {
        try {
            return await API.upsert(payload)
        } catch (error: any) {
            return error
        }
    }

    const getFiles = computed(() => files.value)

    return {
        files,
        getFiles,
        list,
        upsert,
    }
})
