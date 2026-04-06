import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `home/company`,
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<ResponseResult, any>({
        url: `home/company/${id}`,
        method: 'GET',
    })
