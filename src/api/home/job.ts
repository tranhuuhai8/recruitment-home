import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `home/job`,
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<any, any>({
        url: `home/job/${id}`,
        method: 'GET',
    })
