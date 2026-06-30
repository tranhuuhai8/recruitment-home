import request from '@/api/config'
import type {
    ParamsList,
    ResponseResult,
    JobApplication,
    ResponseList,
} from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `home/job`,
        method: 'GET',
        params: payload,
    })

export const detail = (slug: string) =>
    request<ResponseResult, any>({
        url: `home/job/${slug}`,
        method: 'GET',
    })

export const apply = (payload: JobApplication) =>
    request<ResponseResult, any>({
        url: `home/job/apply`,
        method: 'POST',
        data: payload,
    })

export const getCv = () =>
    request<ResponseResult, any>({
        url: 'home/job/get-cv',
        method: 'GET',
    })
