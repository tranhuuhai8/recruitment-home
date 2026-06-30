import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `home/company`,
        method: 'GET',
        params: payload,
    })

export const detail = (slug: string) =>
    request<ResponseResult, any>({
        url: `home/company/${slug}`,
        method: 'GET',
    })
