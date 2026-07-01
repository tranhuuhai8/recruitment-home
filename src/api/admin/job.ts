import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/job`,
        method: 'GET',
        params: payload,
    })

export const detail = (slug: string) =>
    request<ResponseResult, any>({
        url: `admin/job/${slug}`,
        method: 'GET',
    })

export const update = (payload: ParamsList, slug: string) =>
    request<ResponseList, ResponseList>({
        url: `admin/job/${slug}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (slug: string) =>
    request<ResponseResult, any>({
        url: `admin/job/${slug}`,
        method: 'DELETE',
    })
