import { defineStore } from 'pinia'
import * as API from '@/api/company/dashboard'
import type { FormSearchDashboard } from '@/interface'

export const useDashboardStore = defineStore('companyDashboard', () => {
    const dashboardCompany = async (params?: FormSearchDashboard) => {
        try {
            const { data } = await API.dashboardCompany(params)
            return data
        } catch (error: any) {
            return error
        }
    }

    return {
        dashboardCompany,
    }
})
