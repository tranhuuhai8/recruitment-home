import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `admin/job`,
        method: 'GET',
        params: payload,
    })

export const remove = (id: number) =>
    request<any, any>({
        url: `admin/job/${id}`,
        method: 'DELETE',
    })
