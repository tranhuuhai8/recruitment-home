import request from '@/api/config'
import type { ParamsList, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: 'admin/company-followers',
        method: 'GET',
        params: payload,
    })

