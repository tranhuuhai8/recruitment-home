import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/company`,
        method: 'GET',
        params: payload,
    })

export const getSelect = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/company/get-select`,
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/company/${id}`,
        method: 'GET',
    })

export const update = (payload: ParamsList, id: number) =>
    request<ResponseList, ResponseList>({
        url: `admin/company/${id}`,
        method: 'PUT',
        data: payload,
    })
