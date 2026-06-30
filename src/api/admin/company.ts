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

export const detail = (slug: string) =>
    request<ResponseResult, any>({
        url: `admin/company/${slug}`,
        method: 'GET',
    })

export const update = (payload: ParamsList, slug: string) =>
    request<ResponseList, ResponseList>({
        url: `admin/company/${slug}`,
        method: 'PUT',
        data: payload,
    })
