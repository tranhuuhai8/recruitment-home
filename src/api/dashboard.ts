import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const dashboardAdmin = () =>
    request<ResponseList, ResponseList>({
        url: `admin/dashboard`,
        method: 'GET',
    })
