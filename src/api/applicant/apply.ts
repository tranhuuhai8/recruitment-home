import request from '@/api/config'
import type { ParamsList, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `applicant/applied`,
        method: 'GET',
        params: payload,
    })
