import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `home/master-data/job-categories`,
        method: 'GET',
        params: payload,
    })

export const listParent = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `home/master-data/job-categories-parent`,
        method: 'GET',
        params: payload,
    })
