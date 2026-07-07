import { defineStore } from 'pinia'
import * as API from '@/api/dashboard'
import type { FormSearchDashboard } from '@/interface'

export const useDashboardStore = defineStore('dashboard', () => {
    const dashboardAdmin = async (params?: FormSearchDashboard) => {
        try {
            const { data } = await API.dashboardAdmin(params)
            return data
        } catch (error: any) {
            return error
        }
    }

    return {
        dashboardAdmin,
    }
})
