import request from '@/api/config'
import type { FormSearchDashboard, ResponseList } from '@/interface'

export const dashboardApplicant = (params?: FormSearchDashboard) =>
    request<ResponseList, ResponseList>({
        url: `applicant/dashboard`,
        method: 'GET',
        params,
    })
