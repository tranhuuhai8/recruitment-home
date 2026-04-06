import request from '@/api/config'
import type { ParamsList, ResponseResult, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `admin/job`,
        method: 'GET',
        params: payload,
    })

export const remove = (id: number) =>
    request<ResponseResult, any>({
        url: `admin/job/${id}`,
        method: 'DELETE',
    })
