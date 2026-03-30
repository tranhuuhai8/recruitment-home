import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/applicant`,
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/applicant/${id}`,
        method: 'GET',
    })

export const update = (payload: ParamsList, id: number) =>
    request<ResponseList, ResponseList>({
        url: `admin/applicant/${id}`,
        method: 'PUT',
        data: payload,
    })
