import request from '@/api/config'
import type { FormDataJob, ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `company/job`,
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<any, any>({
        url: `company/job/${id}`,
        method: 'GET',
    })

export const update = (payload: Record<string, any>, id: number) =>
    request<ResponseList, ResponseList>({
        url: `company/job/${id}`,
        method: 'PUT',
        data: payload,
    })

export const create = (payload: FormDataJob) =>
    request<ResponseList, ResponseList>({
        url: `company/job`,
        method: 'POST',
        data: payload,
    })

export const remove = (id: number) =>
    request<any, any>({
        url: `company/job/${id}`,
        method: 'DELETE',
    })
