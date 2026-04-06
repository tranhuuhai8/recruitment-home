import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `company/job-apply`,
        method: 'GET',
        params: payload,
    })

export const update = (payload: ParamsList, id: number) =>
    request<ResponseList, ResponseList>({
        url: `company/job-apply/${id}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (id: number) =>
    request<ResponseResult, any>({
        url: `company/job-apply/${id}`,
        method: 'DELETE',
    })
