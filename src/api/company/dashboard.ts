import request from '@/api/config'
import type { FormSearchDashboard, ResponseList } from '@/interface'

export const dashboardCompany = (params?: FormSearchDashboard) =>
    request<ResponseList, ResponseList>({
        url: `company/dashboard`,
        method: 'GET',
        params,
    })
