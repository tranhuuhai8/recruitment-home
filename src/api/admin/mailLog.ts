import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: 'admin/mail-log',
        method: 'GET',
        params: payload,
    })

export const detail = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/mail-log/${id}`,
        method: 'GET',
    })

export const retry = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/mail-log/${id}/retry`,
        method: 'POST',
    })
