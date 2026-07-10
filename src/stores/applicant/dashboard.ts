import { defineStore } from 'pinia'
import * as API from '@/api/applicant/dashboard'
import type { FormSearchDashboard } from '@/interface'

export const useDashboardStore = defineStore('applicantDashboard', () => {
    const dashboardApplicant = async (params?: FormSearchDashboard) => {
        try {
            const { data } = await API.dashboardApplicant(params)
            return data
        } catch (error: any) {
            return error
        }
    }

    return {
        dashboardApplicant,
    }
})
