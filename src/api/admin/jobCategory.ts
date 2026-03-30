import request from '@/api/config'
import type { ParamsList, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/master-data/job-categories`,
        method: 'GET',
        params: payload,
    })

export const create = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/master-data/job-categories/`,
        method: 'POST',
        data: payload,
    })

export const update = (payload: ParamsList, id: number) =>
    request<ResponseList, ResponseList>({
        url: `admin/master-data/job-categories/${id}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (id: number) =>
    request<ResponseList, ResponseList>({
        url: `admin/master-data/job-categories/${id}`,
        method: 'DELETE',
    })
