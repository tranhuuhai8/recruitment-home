import request from '@/api/config'
import type {
    ParamsList,
    ResponseResult,
    ResponseList,
    IUpdateContactDto,
    IReplyContactDto,
} from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: 'admin/contact',
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/contact/${id}`,
        method: 'GET',
    })

export const update = (id: number, payload: IUpdateContactDto) =>
    request<ResponseResult, any>({
        url: `admin/contact/${id}`,
        method: 'PUT',
        data: payload,
    })

export const remove = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/contact/${id}`,
        method: 'DELETE',
    })

export const reply = (id: number, payload: IReplyContactDto) =>
    request<ResponseResult, any>({
        url: `admin/contact/${id}/reply`,
        method: 'POST',
        data: payload,
    })
