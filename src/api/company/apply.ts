import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `company/job-apply`,
        method: 'GET',
        params: payload,
    })

export const update = (payload: Record<string, any>, id: number) =>
    request<ResponseList, ResponseList>({
        url: `company/job-apply/${id}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (id: number) =>
    request<any, any>({
        url: `company/job-apply/${id}`,
        method: 'DELETE',
    })
