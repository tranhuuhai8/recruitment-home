import request from '@/api/config'
import type {
    ParamsList,
    ResponseResult,
    ResponseList,
    IMailTemplateDto,
} from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: 'admin/mail-template',
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/mail-template/${id}`,
        method: 'GET',
    })

export const create = (payload: IMailTemplateDto) =>
    request<ResponseResult, any>({
        url: 'admin/mail-template',
        method: 'POST',
        data: payload,
    })

export const update = (id: number, payload: Partial<IMailTemplateDto>) =>
    request<ResponseResult, any>({
        url: `admin/mail-template/${id}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/mail-template/${id}`,
        method: 'DELETE',
    })

export const preview = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/mail-template/${id}/preview`,
        method: 'GET',
    })
