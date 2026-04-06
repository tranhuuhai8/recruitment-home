import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/mailLog'
import type { IMailLogItem } from '@/interface'

export const useMailLogStore = defineStore('admin-mail-log', () => {
    const logs = ref({} as any)
    const log = ref({} as IMailLogItem)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (logs.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const response = await API.detail(id)
            return (log.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const retry = async (id: number) => {
        try {
            return await API.retry(id)
        } catch (error: any) {
            return error
        }
    }

    const getLogs = computed(() => logs.value)
    const getLog = computed(() => log.value)

    return {
        getLogs,
        getLog,
        list,
        detail,
        retry,
    }
})
