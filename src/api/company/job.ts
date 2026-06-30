import request from '@/api/config'
import type {
    ParamsList,
    ResponseResult,
    FormDataJob,
    ResponseList,
} from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `company/job`,
        method: 'GET',
        params: payload,
    })

export const detail = (slug: string) =>
    request<ResponseResult, any>({
        url: `company/job/${slug}`,
        method: 'GET',
    })

export const update = (payload: ParamsList, slug: string) =>
    request<ResponseList, ResponseList>({
        url: `company/job/${slug}`,
        method: 'PUT',
        data: payload,
    })

export const create = (payload: FormDataJob) =>
    request<ResponseList, ResponseList>({
        url: `company/job`,
        method: 'POST',
        data: payload,
    })

export const remove = (slug: string) =>
    request<ResponseResult, any>({
        url: `company/job/${slug}`,
        method: 'DELETE',
    })
