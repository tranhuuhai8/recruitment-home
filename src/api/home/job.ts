import request from '@/api/config'
import type { JobApplication, ResponseList } from '@/interface'

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

export const apply = (payload: JobApplication) =>
    request<any, any>({
        url: `home/job/apply`,
        method: 'POST',
        data: payload,
    })

export const getCv = () =>
    request<any, any>({
        url: 'home/job/get-cv',
        method: 'GET',
    })
