import { defineStore } from 'pinia'
import * as API from '@/api/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
    const dashboardAdmin = async () => {
        try {
            const { data } = await API.dashboardAdmin()
            return data
        } catch (error: any) {
            return error
        }
    }

    return {
        dashboardAdmin,
    }
})
