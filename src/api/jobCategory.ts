import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `master-data/job-categories`,
        method: 'GET',
        params: payload,
    })

export const create = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `master-data/job-categories/`,
        method: 'POST',
        data: payload,
    })

export const update = (payload: Record<string, any>, id: number) =>
    request<ResponseList, ResponseList>({
        url: `master-data/job-categories/${id}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (id: number) =>
    request<ResponseList, ResponseList>({
        url: `master-data/job-categories/${id}`,
        method: 'DELETE',
    })
